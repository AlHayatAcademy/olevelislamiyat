import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;
const PREINSTALLED_CHROMIUM = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Use the preinstalled Chromium if present (avoids a version-pinned download in
        // sandboxed/offline environments); falls back to Playwright's own managed browser
        // (`npx playwright install`) wherever that path doesn't exist, e.g. most CI runners.
        launchOptions: existsSync(PREINSTALLED_CHROMIUM) ? { executablePath: PREINSTALLED_CHROMIUM } : {},
      },
    },
  ],
  // Builds the production bundle and boots `next start` once, shared by every test — matches
  // how the site actually runs (this is a Cloudflare Workers/OpenNext deploy, not dev mode).
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
