import { describe, it, expect } from "vitest";
import { canonical, faqSchema, articleSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";

describe("canonical", () => {
  it("builds an absolute canonical URL from a site-relative path", () => {
    expect(canonical("/paper-1")).toEqual({
      alternates: { canonical: `${siteConfig.domain}/paper-1` },
    });
  });

  it("handles the root path", () => {
    expect(canonical("/")).toEqual({
      alternates: { canonical: `${siteConfig.domain}/` },
    });
  });
});

describe("faqSchema", () => {
  it("produces a valid FAQPage JSON-LD shape", () => {
    const schema = faqSchema([
      { q: "Question one?", a: "Answer one." },
      { q: "Question two?", a: "Answer two." },
    ]);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "Question one?",
      acceptedAnswer: { "@type": "Answer", text: "Answer one." },
    });
  });

  it("produces an empty mainEntity array for no FAQs", () => {
    expect(faqSchema([])).toMatchObject({ mainEntity: [] });
  });

  it("serializes to valid JSON with no undefined leaking through", () => {
    const schema = faqSchema([{ q: "Q", a: "A" }]);
    expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
  });
});

describe("articleSchema", () => {
  it("produces a valid Article JSON-LD shape with an absolute url", () => {
    const schema = articleSchema({
      headline: "Test Topic",
      description: "A test description.",
      path: "/paper-1/some-section/some-topic",
    });

    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe("Test Topic");
    expect(schema.description).toBe("A test description.");
    expect(schema.url).toBe(`${siteConfig.domain}/paper-1/some-section/some-topic`);
    expect(schema.author).toEqual({ "@type": "Organization", name: siteConfig.institution.name });
    expect(schema.publisher).toEqual({ "@type": "Organization", name: siteConfig.institution.name });
  });
});
