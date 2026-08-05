import { describe, it, expect } from "vitest";
import { expandTerm, expandQueryTokens, synonymGroups, synonymGroupCount } from "@/data/search-synonyms";

describe("expandTerm", () => {
  it("expands a term to its full synonym group, normalized", () => {
    const expanded = expandTerm("Makkah");
    expect(expanded).toContain("makka");
    expect(expanded).toContain("makkah");
    expect(expanded).toContain("mecca");
  });

  it("strips apostrophes when normalizing", () => {
    expect(expandTerm("Qur'an")).toContain("quran");
  });

  it("returns just the normalized term when it has no synonym group", () => {
    expect(expandTerm("nonexistentterm")).toEqual(["nonexistentterm"]);
  });
});

describe("expandQueryTokens", () => {
  it("splits a multi-word query into one variant array per token", () => {
    const tokens = expandQueryTokens("quran hajj");
    expect(tokens).toHaveLength(2);
    expect(tokens[0]).toContain("quran");
    expect(tokens[1]).toContain("hajj");
  });

  it("collapses repeated whitespace and trims", () => {
    const tokens = expandQueryTokens("  quran   hajj  ");
    expect(tokens).toHaveLength(2);
  });

  it("returns an empty array for an empty string", () => {
    expect(expandQueryTokens("")).toEqual([]);
  });
});

describe("synonymGroups data integrity", () => {
  it("has no duplicate terms across different groups", () => {
    const seen = new Map<string, number>();
    synonymGroups.forEach((group, groupIndex) => {
      for (const term of group) {
        const normalized = term.toLowerCase();
        if (seen.has(normalized) && seen.get(normalized) !== groupIndex) {
          throw new Error(`"${term}" appears in more than one synonym group`);
        }
        seen.set(normalized, groupIndex);
      }
    });
  });

  it("every group has at least two terms (otherwise it isn't a synonym group)", () => {
    for (const group of synonymGroups) {
      expect(group.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("synonymGroupCount matches the actual array length", () => {
    expect(synonymGroupCount).toBe(synonymGroups.length);
  });
});
