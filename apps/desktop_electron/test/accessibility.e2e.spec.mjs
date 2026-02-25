import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { _electron as electron, test, expect } from "@playwright/test";
import electronBinaryPath from "electron";
import axeCore from "axe-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ELECTRON_MAIN_PATH = path.resolve(__dirname, "../src/main/main.cjs");
const RENDERER_INDEX_PATH = path.resolve(__dirname, "../renderer-dist/index.html");
const APP_ROOT = path.resolve(__dirname, "..");

async function scanForA11yViolations(page, testInfo, screenName, contextSelector = null) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(300);
  await page.waitForFunction(() => document.body.classList.contains("warm"));
  const results = await page.evaluate(async ({ axeSource, contextSelector: selector }) => {
    const axe = new Function(`${axeSource}; return axe;`)();
    const contextNode = selector ? document.querySelector(selector) : document;
    if (!contextNode) {
      throw new Error(`A11y context not found for selector: ${selector}`);
    }
    return await axe.run(contextNode, { resultTypes: ["violations"] });
  }, { axeSource: axeCore.source, contextSelector });
  const violationsSummary = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodeCount: violation.nodes.length,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      html: node.html,
      summary: node.failureSummary,
    })),
  }));

  await testInfo.attach(`${screenName}-axe-results`, {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });

  await page.screenshot({
    path: testInfo.outputPath(`${screenName}.png`),
    fullPage: true,
  });

  expect(
    violationsSummary,
    `${screenName} has accessibility violations:\n${JSON.stringify(violationsSummary, null, 2)}`,
  ).toEqual([]);
}

test.describe("Electron accessibility (axe)", () => {
  test.setTimeout(120000);

  test("should have zero axe violations across key user screens", async ({}, testInfo) => {
    if (!fs.existsSync(RENDERER_INDEX_PATH)) {
      throw new Error(
        "renderer-dist/index.html not found. Run `npm run build:renderer` in apps/desktop_electron first.",
      );
    }

    const launchEnv = { ...process.env };
    delete launchEnv.ELECTRON_RUN_AS_NODE;

    const app = await electron.launch({
      executablePath: electronBinaryPath,
      args: [ELECTRON_MAIN_PATH],
      cwd: APP_ROOT,
      env: {
        ...launchEnv,
        PLAYWRIGHT_TEST: "1",
      },
    });

    try {
      const page = await app.firstWindow();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForLoadState("domcontentloaded");
      await page.waitForFunction(() => {
        const text = document.body?.innerText ?? "";
        return (
          /let's get started/i.test(text) ||
          /welcome back/i.test(text) ||
          /welcome to careconnect/i.test(text) ||
          /good morning,/i.test(text)
        );
      }, null, { timeout: 15000 });

      const getStartedButton = page.getByRole("button", { name: /get started/i });
      const loginHeading = page.getByRole("heading", { name: "Welcome Back" });
      const roleHeading = page.getByRole("heading", { name: "Welcome to CareConnect" });
      const dashboardHeading = page.getByRole("heading", { name: /Good morning,/i });

      // Depending on prior app state, startup can land on multiple valid screens.
      if (await getStartedButton.isVisible()) {
        await scanForA11yViolations(page, testInfo, "01-welcome", ".max-w-2xl");
        await getStartedButton.click();
      } else if (await loginHeading.isVisible()) {
        // Already at login.
      } else if (await roleHeading.isVisible()) {
        // Already past login.
      } else if (await dashboardHeading.isVisible()) {
        // Already on dashboard.
      } else {
        await page.screenshot({
          path: testInfo.outputPath("startup-unexpected-screen.png"),
          fullPage: true,
        });
        throw new Error("Unexpected startup screen after waiting for known app markers.");
      }

      if (!(await roleHeading.isVisible()) && !(await dashboardHeading.isVisible())) {
        await expect(loginHeading).toBeVisible();
      }
      await scanForA11yViolations(
        page,
        testInfo,
        "02-login",
        ".max-w-md.w-full.rounded-lg.shadow-xl",
      );

      if (await loginHeading.isVisible()) {
        await page.getByRole("button", { name: "Register" }).click();
        await expect(page.getByRole("heading", { name: "Create Account" })).toBeVisible();
        await scanForA11yViolations(
          page,
          testInfo,
          "03-register",
          ".max-w-md.w-full.rounded-lg.shadow-xl",
        );
        await page.reload();
        await page.waitForFunction(() => {
          const text = document.body?.innerText ?? "";
          return /let's get started/i.test(text) || /welcome back/i.test(text);
        });
        if (await getStartedButton.isVisible().catch(() => false)) {
          await getStartedButton.click();
        }
        await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();

        await page.locator("#email").fill("a11y.test@careconnect.example");
        await page.locator("#password").fill("TestOnlyPassword!123");
        await page.getByRole("button", { name: "Sign In" }).click();
      }

      if (await roleHeading.isVisible()) {
        await scanForA11yViolations(page, testInfo, "04-role-selection", ".w-full.max-w-4xl");

        await page.getByRole("button", { name: "Sign in as Caregiver" }).click();
        await expect(page.getByRole("heading", { name: "What's your name?" })).toBeVisible();
        await page.getByLabel("Enter your name").fill("A11y Tester");
        await page.getByRole("button", { name: "Continue to dashboard" }).click();
      }

      await expect(page.getByRole("heading", { name: /Good morning,/i })).toBeVisible();
      await scanForA11yViolations(page, testInfo, "05-dashboard", "#main-content");

      await page.keyboard.press("Control+,");
      await expect(page.getByRole("heading", { name: /Settings & Preferences/i })).toBeVisible();
      await scanForA11yViolations(page, testInfo, "06-settings", "#main-content");

      await page.keyboard.press("Control+/");
      await expect(page.getByRole("heading", { name: /Keyboard Shortcuts/i })).toBeVisible();
      await scanForA11yViolations(page, testInfo, "07-shortcuts", "#main-content");
    } finally {
      await app.close();
    }
  });
});
