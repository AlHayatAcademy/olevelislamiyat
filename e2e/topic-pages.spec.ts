import { test, expect } from "@playwright/test";

test.describe("Topic pages", () => {
  test("a Paper 1 topic page renders its lesson content and breadcrumbs", async ({ page }) => {
    const response = await page.goto("/paper-1/major-themes-of-the-quran/al-anam-6-101-103");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  });

  test("a Paper 2 topic page renders its lesson content and breadcrumbs", async ({ page }) => {
    const response = await page.goto("/paper-2/history-of-hadith/isnad-and-matn");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  });

  test("paper index pages list their sections", async ({ page }) => {
    await page.goto("/paper-1");
    await expect(page.getByRole("heading", { level: 1, name: "Paper 1" })).toBeVisible();

    await page.goto("/paper-2");
    await expect(page.getByRole("heading", { level: 1, name: "Paper 2" })).toBeVisible();
  });

  test("an unknown topic slug correctly 404s", async ({ page }) => {
    // Previously a "soft 404": generateStaticParams pre-renders only real topics, and without
    // `dynamicParams = false` Next served an on-demand fallback render for anything else, whose
    // notFound() call rendered the right UI but didn't propagate a 404 status. Fixed by adding
    // `export const dynamicParams = false` to every fully-enumerable dynamic route (see
    // docs/Decision-Log.md and docs/Migration-History.md).
    const response = await page.goto("/paper-1/major-themes-of-the-quran/not-a-real-topic");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });

  test("an unknown section 404s", async ({ page }) => {
    const response = await page.goto("/paper-1/not-a-real-section");
    expect(response?.status()).toBe(404);
  });
});
