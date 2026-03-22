import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: "html",
  retries: 1,
  timeout: 60000,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4173/Team4/",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "Safari",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
  webServer: {
    command: "npm run e2e:serve",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 240000,
  },
});
