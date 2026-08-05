import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads successfully with expected title and hero content", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/O Level Islamiyat/i);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("has no obvious broken links in the header nav", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: /O Level Islamiyat/i })).toBeVisible();
  });
});
