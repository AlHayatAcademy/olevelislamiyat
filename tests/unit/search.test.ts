import { describe, it, expect } from "vitest";
import { search, groupByCategory, popularSearches, RESULT_LIMIT } from "@/lib/search";

describe("search", () => {
  it("returns an empty array for an empty or whitespace-only query", () => {
    expect(search("")).toEqual([]);
    expect(search("   ")).toEqual([]);
  });

  it("finds results for a well-known topic term", () => {
    const results = search("hajj");
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.score).toBeGreaterThan(0);
    }
  });

  it("is case-insensitive", () => {
    const lower = search("hajj").map((r) => r.url);
    const upper = search("HAJJ").map((r) => r.url);
    expect(upper).toEqual(lower);
  });

  it("expands synonyms so alternate spellings find the same content", () => {
    // "makka" and "makkah" are grouped as synonyms in data/search-synonyms.ts.
    const a = search("makka").map((r) => r.url).sort();
    const b = search("makkah").map((r) => r.url).sort();
    expect(a).toEqual(b);
    expect(a.length).toBeGreaterThan(0);
  });

  it("requires every query token to match something (multi-word AND semantics)", () => {
    const results = search("hajj pilgrimage nonexistentzzz");
    expect(results).toEqual([]);
  });

  it("ranks results with a title match above a description-only match", () => {
    const results = search("hajj");
    const titleMatchIndex = results.findIndex((r) => r.title.toLowerCase().includes("hajj"));
    expect(titleMatchIndex).toBeGreaterThanOrEqual(0);
    // The top result should be a title match, since title matches score highest.
    expect(results[0].title.toLowerCase()).toContain("hajj");
  });

  it("never returns more than RESULT_LIMIT results", () => {
    // A very common token likely to match many entries.
    const results = search("islamiyat");
    expect(results.length).toBeLessThanOrEqual(RESULT_LIMIT);
  });

  it("returns no results for pure gibberish", () => {
    expect(search("zzxxqqnonexistentterm")).toEqual([]);
  });
});

describe("groupByCategory", () => {
  it("groups results by category, preserving first-seen category order", () => {
    const results = search("islamiyat");
    const grouped = groupByCategory(results);

    const totalInGroups = grouped.reduce((n, g) => n + g.results.length, 0);
    expect(totalInGroups).toBe(results.length);

    const firstSeenOrder: string[] = [];
    for (const r of results) {
      if (!firstSeenOrder.includes(r.category)) firstSeenOrder.push(r.category);
    }
    expect(grouped.map((g) => g.category)).toEqual(firstSeenOrder);
  });

  it("returns an empty array when given no results", () => {
    expect(groupByCategory([])).toEqual([]);
  });
});

describe("popularSearches", () => {
  it("every popular search query returns at least one result", () => {
    for (const { query } of popularSearches) {
      expect(search(query).length, `expected results for "${query}"`).toBeGreaterThan(0);
    }
  });
});
