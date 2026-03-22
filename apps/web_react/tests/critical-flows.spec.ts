import { expect, test, type Page } from "@playwright/test";

async function seedUser(page: Page, role?: "patient" | "caregiver") {
  await page.addInitScript((seedRole) => {
    const demoUser = {
      id: "demo_user_1",
      email: "demo@careconnect.com",
      password: "demo123",
      name: "Demo User",
      role: seedRole,
      createdAt: "2026-03-17T00:00:00.000Z",
    };

    localStorage.setItem("careconnect_users", JSON.stringify([demoUser]));
    localStorage.setItem(
      "careconnect_user",
      JSON.stringify({
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
        createdAt: demoUser.createdAt,
      }),
    );
  }, role);
}

test.describe("critical user flows", () => {
  test("landing page CTA sends users to login", async ({ page }) => {
    await page.goto("");

    await page.getByRole("button", { name: "Get Started" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("heading", { name: /welcome back/i }),
    ).toBeVisible();
  });

  test("new user can sign up, choose patient role, and reach the dashboard", async ({ page }) => {
    await page.goto("signup");

    await page.getByLabel("Full Name").fill("Taylor Patient");
    await page.getByLabel("Email Address").fill("taylor.patient@example.com");
    await page.getByLabel("Password", { exact: true }).fill("patient123");
    await page.getByLabel("Confirm Password").fill("patient123");
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(
      page.getByRole("heading", { name: /welcome, taylor patient!/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /patient portal/i }).click();

    await expect(
      page.getByRole("heading", { name: /welcome back, taylor patient/i }),
    ).toBeVisible();

    const storedUser = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("careconnect_user") ?? "{}"),
    );
    expect(storedUser.role).toBe("patient");
  });

  test("existing demo user can log in, switch to caregiver, and review medical data", async ({
    page,
  }) => {
    await page.goto("login");

    await page.getByLabel("Email Address").fill("demo@careconnect.com");
    await page.getByLabel("Password").fill("demo123");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(
      page.getByRole("heading", { name: /welcome, demo user!/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /caregiver portal/i }).click();
    await expect(
      page.getByRole("heading", { name: /caregiver dashboard/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /medical data/i }).click();
    await expect(
      page.getByRole("heading", { name: /medical data/i }),
    ).toBeVisible();

    await page.getByRole("combobox", { name: /select patient/i }).selectOption({
      label: "Mary Williams",
    });

    await expect(page.getByRole("combobox", { name: /select patient/i })).toHaveValue("2");
  });

  test("authenticated user can open profile, edit their name, and save changes", async ({
    page,
  }) => {
    await seedUser(page, "patient");
    await page.goto("dashboard");

    await expect(
      page.getByRole("heading", { name: /welcome back, demo user/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /user profile/i }).click();
    await expect(
      page.getByRole("heading", { name: /my profile/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /edit name/i }).click();
    await page.getByRole("textbox").fill("Jordan Demo");
    await page.getByRole("button", { name: /save changes/i }).click();

    await expect(page.getByRole("heading", { name: "Jordan Demo" })).toBeVisible();

    const storedUser = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("careconnect_user") ?? "{}"),
    );
    expect(storedUser.name).toBe("Jordan Demo");
  });

  test("user can update accessibility settings and they persist after reload", async ({
    page,
  }) => {
    await seedUser(page, "patient");
    await page.goto("settings");

    await page.getByRole("button", { name: /extra large/i }).click();
    await page.getByRole("button", { name: /high contrast mode off/i }).click();
    await page.getByRole("button", { name: /reduce motion off/i }).click();
    await page.getByRole("button", { name: /save settings/i }).click();

    await expect(page.getByText(/settings saved!/i)).toBeVisible();

    await page.reload();

    await expect(
      page.getByRole("button", { name: /high contrast mode on/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /reduce motion on/i }),
    ).toBeVisible();

    const storedSettings = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("careconnect-settings") ?? "{}"),
    );
    expect(storedSettings.textSize).toBe("extra-large");
    expect(storedSettings.highContrast).toBe(true);
    expect(storedSettings.reducedMotion).toBe(true);
  });

  test("dashboard logout returns the user to the login page", async ({
    page,
  }) => {
    await seedUser(page, "patient");
    await page.goto("dashboard");

    await page.getByRole("button", { name: /logout/i }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
  });
});
