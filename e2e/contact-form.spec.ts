import { test, expect } from "@playwright/test";

test.describe("Contact form validation", () => {
  test("shows a client-side error when submitted empty", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send enquiry/i }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
  });

  test("shows a client-side error for an invalid email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Test User");
    await page.getByLabel("Your email").fill("not-an-email");
    await page.getByLabel("Message").fill("This is a long enough test message.");
    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("shows a client-side error for a too-short message", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Test User");
    await page.getByLabel("Your email").fill("test@example.com");
    await page.getByLabel("Message").fill("short");
    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(page.getByText(/message must be at least/i)).toBeVisible();
  });

  test("submits successfully with valid input", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Test User");
    await page.getByLabel("Your email").fill("test@example.com");
    await page.getByLabel("Message").fill("This is a perfectly valid test enquiry message.");
    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(page.getByText(/your enquiry has been sent/i)).toBeVisible();
  });
});
