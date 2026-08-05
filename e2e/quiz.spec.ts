import { test, expect } from "@playwright/test";

test.describe("Quiz flow", () => {
  test("the quizzes index lists a known quiz", async ({ page }) => {
    await page.goto("/quizzes");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("The First Revelation").first()).toBeVisible();
  });

  test("completes a full quiz attempt end to end", async ({ page }) => {
    await page.goto("/quizzes/the-first-revelation");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Answer every radio-group question with its first option, and every matching
    // (select-based) question with its first real choice, so the quiz becomes submittable
    // regardless of exactly how many/what type of questions this quiz has.
    const fieldsets = page.locator("fieldset");
    const count = await fieldsets.count();
    for (let i = 0; i < count; i++) {
      const fieldset = fieldsets.nth(i);
      const radios = fieldset.getByRole("radio");
      const selects = fieldset.locator("select");

      if (await radios.count()) {
        await radios.first().check();
      } else if (await selects.count()) {
        const selectCount = await selects.count();
        for (let s = 0; s < selectCount; s++) {
          const select = selects.nth(s);
          const options = await select.locator("option").all();
          // option[0] is the disabled "Select a match..." placeholder.
          const value = await options[1].getAttribute("value");
          if (value) await select.selectOption(value);
        }
      }
    }

    const submitButton = page.getByRole("button", { name: /submit answers/i });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(page.getByText("Quiz complete")).toBeVisible();
    await expect(page.getByRole("button", { name: /retry quiz/i })).toBeVisible();
  });
});
