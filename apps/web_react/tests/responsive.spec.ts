import { expect, test, type Locator, type Page } from "@playwright/test";

const authenticatedUser = {
  id: "demo_user_1",
  email: "demo@careconnect.com",
  name: "Demo User",
  role: "patient",
  createdAt: "2026-03-17T00:00:00.000Z",
};

const viewportMatrix = [
  { label: "mobile", width: 375, height: 667 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1440, height: 1200 },
];

async function seedAuthenticatedState(page: Page) {
  await page.addInitScript((user) => {
    localStorage.setItem("careconnect_user", JSON.stringify(user));
    localStorage.setItem(
      "careconnect_users",
      JSON.stringify([
        {
          ...user,
          password: "demo123",
        },
      ]),
    );
  }, authenticatedUser);
}

async function waitForUiReady(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("body");
  await page.waitForFunction(() => document.readyState === "interactive" || document.readyState === "complete");
  await page.waitForFunction(() => document.fonts?.status !== "loading");
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    return Math.max(root.scrollWidth, body.scrollWidth) - root.clientWidth;
  });

  expect(overflow).toBeLessThanOrEqual(1);
}

async function expectWithinViewport(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (!box || !viewport) {
    return;
  }

  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
}

async function expectMinimumTouchTarget(locator: Locator, minSize = 40) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();

  expect(box).not.toBeNull();

  if (!box) {
    return;
  }

  expect(box.width).toBeGreaterThanOrEqual(minSize);
  expect(box.height).toBeGreaterThanOrEqual(minSize);
}

for (const viewport of viewportMatrix) {
  test.describe(`${viewport.label} viewport`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("public routes stay within the viewport", async ({ page }) => {
      for (const route of ["", "login", "signup"]) {
        await page.goto(route);
        await waitForUiReady(page);
        await expectNoHorizontalOverflow(page);
      }
    });

    test("authenticated routes stay within the viewport", async ({ page }) => {
      await seedAuthenticatedState(page);

      for (const route of ["role-selection", "dashboard", "settings", "cart"]) {
        await page.goto(route);
        await waitForUiReady(page);
        await expectNoHorizontalOverflow(page);
      }
    });

    test("dashboard navigation adapts at each breakpoint", async ({ page }) => {
      await seedAuthenticatedState(page);
      await page.goto("dashboard");
      await waitForUiReady(page);

      if (viewport.width === 375) {
        const menuButton = page.getByRole("button", { name: /open navigation menu/i });
        await expectMinimumTouchTarget(menuButton);
        await menuButton.click();
        await expect(page.locator(".dashboard-shell")).toHaveClass(/is-menu-open/);
        await page.waitForTimeout(350);
        await expectWithinViewport(page, page.locator(".dashboard-sidebar"));
        await expectWithinViewport(page, page.locator(".dashboard-sidebar .dashboard-role-toggle"));
      } else if (viewport.width >= 1440) {
        await expect(page.locator(".dashboard-sidebar")).toBeVisible();
        await expect(page.locator(".dashboard-header .dashboard-role-toggle")).toBeVisible();
      }
    });

    test("settings navigation adapts at each breakpoint", async ({ page }) => {
      await seedAuthenticatedState(page);
      await page.goto("settings");
      await waitForUiReady(page);

      if (viewport.width === 375) {
        const menuButton = page.getByRole("button", { name: /open settings menu/i });
        await expectMinimumTouchTarget(menuButton);
        await menuButton.click();
        await expect(page.locator(".settings-shell")).toHaveClass(/is-menu-open/);
        await page.waitForTimeout(350);
        await expectWithinViewport(page, page.locator(".settings-sidebar"));
        await expectWithinViewport(page, page.locator(".settings-nav"));
      } else if (viewport.width >= 1440) {
        await expect(page.locator(".settings-sidebar")).toBeVisible();
      }
    });

    if (viewport.width === 375) {
      test("role selection stays usable on mobile", async ({ page }) => {
        await seedAuthenticatedState(page);
        await page.goto("role-selection");
        await waitForUiReady(page);

        const cards = page.locator(".selection-card");
        await expect(cards).toHaveCount(2);
        await expectWithinViewport(page, cards.nth(0));
        await expectWithinViewport(page, cards.nth(1));
      });
    }
  });
}
