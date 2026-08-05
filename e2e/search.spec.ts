import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("Ctrl/Cmd+K opens the search modal and returns results for a known term", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Site search" });
    await expect(dialog).toBeVisible();

    const input = dialog.getByRole("combobox");
    await input.fill("hajj");

    await expect(dialog.getByText(/hajj/i).first()).toBeVisible();
  });

  test("shows a no-results state for a nonsense query", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");

    const dialog = page.getByRole("dialog", { name: "Site search" });
    await dialog.getByRole("combobox").fill("zzxxqqnonexistentterm");

    await expect(dialog.getByText(/no results for/i)).toBeVisible();
  });

  test("Escape closes the search modal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");

    const dialog = page.getByRole("dialog", { name: "Site search" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("the advanced /search page loads and returns results for a query param", async ({ page }) => {
    await page.goto("/search?q=hajj");
    await expect(page.getByRole("heading", { level: 1, name: "Search" })).toBeVisible();
    await expect(page.getByText(/hajj/i).first()).toBeVisible();
  });
});
