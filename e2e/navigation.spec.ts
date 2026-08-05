import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("desktop mega-menu navigates to a section page", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await primaryNav.getByRole("button", { name: "Study" }).click();

    const syllabusLink = primaryNav.getByRole("link", { name: /^Syllabus/ });
    await expect(syllabusLink).toBeVisible();
    await syllabusLink.click();

    await expect(page).toHaveURL(/\/syllabus$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("mobile menu opens, navigates, and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Primary mobile" });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole("link", { name: /syllabus/i }).click();
    await expect(page).toHaveURL(/\/syllabus$/);
  });

  test("footer and breadcrumbs render on an interior page", async ({ page }) => {
    await page.goto("/paper-1");
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("a genuinely missing route renders the styled 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-at-all");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });
});
