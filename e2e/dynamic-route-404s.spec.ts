import { test, expect } from "@playwright/test";

// Regression coverage for the soft-404 fix: every dynamic route below has a fully-enumerable
// param set at build time (generateStaticParams + dynamicParams = false), so an unknown param
// should 404 immediately rather than falling back to an on-demand render. See
// docs/Decision-Log.md and docs/Migration-History.md for the full story.
test.describe("Dynamic routes correctly 404 on unknown params", () => {
  const cases: { name: string; url: string }[] = [
    { name: "paper-1 section", url: "/paper-1/not-a-real-section" },
    { name: "paper-1 topic", url: "/paper-1/major-themes-of-the-quran/not-a-real-topic" },
    { name: "paper-2 section", url: "/paper-2/not-a-real-section" },
    { name: "paper-2 topic", url: "/paper-2/history-of-hadith/not-a-real-topic" },
    { name: "past-paper question", url: "/past-papers/question/not-a-real-id" },
    { name: "past-paper year", url: "/past-papers/year-wise/1900" },
    { name: "past-paper topical section", url: "/past-papers/topical/not-a-real-section" },
    {
      name: "past-paper topical subtopic",
      url: "/past-papers/topical/major-themes-of-the-quran/not-a-real-subtopic",
    },
    { name: "model answer", url: "/model-answers/not-a-real-id" },
    { name: "quiz", url: "/quizzes/not-a-real-quiz" },
    { name: "reference category", url: "/quotes-references/not-a-real-category" },
    {
      name: "reference item",
      url: "/quotes-references/qur-anic-reference/not-a-real-id",
    },
    {
      name: "reference topic",
      url: "/quotes-references/topic/major-themes-of-the-quran/not-a-real-subtopic",
    },
  ];

  for (const { name, url } of cases) {
    test(`${name} (${url}) returns 404`, async ({ request }) => {
      const response = await request.get(url);
      expect(response.status()).toBe(404);
    });
  }

  test("a valid page from each family still returns 200 (no over-correction)", async ({ request }) => {
    const validUrls = [
      "/paper-1/major-themes-of-the-quran",
      "/paper-1/major-themes-of-the-quran/al-anam-6-101-103",
      "/past-papers/question/2021-jj-p11-q1a",
      "/model-answers/ma-2021-jj-p11-q2a",
      "/quizzes/the-first-revelation",
      "/quotes-references/qur-anic-reference",
      "/quotes-references/qur-anic-reference/ref-ayat-al-kursi",
    ];
    for (const url of validUrls) {
      const response = await request.get(url);
      expect(response.status(), `expected 200 for ${url}`).toBe(200);
    }
  });
});
