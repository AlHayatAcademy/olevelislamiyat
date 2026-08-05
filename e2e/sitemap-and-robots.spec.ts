import { test, expect } from "@playwright/test";

test.describe("Sitemap and robots", () => {
  test("robots.txt is accessible and points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("Sitemap:");
    expect(body.toLowerCase()).toContain("user-agent");
  });

  test("sitemap.xml is accessible and lists real site URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("<loc>");
    expect(body).toContain("/paper-1");
  });

  test("manifest.webmanifest is accessible", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toContain("O Level Islamiyat");
  });
});
