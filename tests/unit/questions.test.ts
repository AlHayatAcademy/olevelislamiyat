import { describe, it, expect } from "vitest";
import {
  pastPaperQuestions,
  availableYears,
  getQuestionsByYear,
  getQuestionsBySection,
  getQuestionsBySubtopic,
  getGeneralQuestionsForSection,
  getQuestionById,
} from "@/data/questions";

describe("pastPaperQuestions data integrity", () => {
  it("has no duplicate question ids", () => {
    const ids = pastPaperQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every question has non-empty prompt, sectionSlug, and sourceNote", () => {
    for (const q of pastPaperQuestions) {
      expect(q.prompt.trim().length, `empty prompt on ${q.id}`).toBeGreaterThan(0);
      expect(q.sectionSlug.trim().length, `empty sectionSlug on ${q.id}`).toBeGreaterThan(0);
      expect(q.sourceNote.trim().length, `empty sourceNote on ${q.id}`).toBeGreaterThan(0);
    }
  });

  it("every question has a positive mark value and a valid paper number", () => {
    for (const q of pastPaperQuestions) {
      expect(q.marks, `non-positive marks on ${q.id}`).toBeGreaterThan(0);
      expect([1, 2]).toContain(q.paper);
      expect([1, 2]).toContain(q.syllabusPaper);
    }
  });

  it("is not empty (regression guard for the per-year data split)", () => {
    expect(pastPaperQuestions.length).toBeGreaterThan(0);
  });
});

describe("availableYears", () => {
  it("matches the distinct years actually present in the data, sorted descending", () => {
    const distinctYears = [...new Set(pastPaperQuestions.map((q) => q.year))].sort((a, b) => b - a);
    expect(availableYears).toEqual(distinctYears);
  });
});

describe("getQuestionsByYear", () => {
  it("returns only questions from the requested year", () => {
    const year = availableYears[0];
    const results = getQuestionsByYear(year);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((q) => q.year === year)).toBe(true);
  });

  it("returns an empty array for a year with no data", () => {
    expect(getQuestionsByYear(1900)).toEqual([]);
  });
});

describe("getQuestionsBySection", () => {
  it("returns only questions matching the given sectionSlug", () => {
    const sectionSlug = pastPaperQuestions[0].sectionSlug;
    const results = getQuestionsBySection(sectionSlug);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((q) => q.sectionSlug === sectionSlug)).toBe(true);
  });
});

describe("getQuestionsBySubtopic", () => {
  it("returns only questions matching both sectionSlug and subtopicSlug", () => {
    const withSubtopic = pastPaperQuestions.find((q) => q.subtopicSlug);
    expect(withSubtopic).toBeDefined();
    if (!withSubtopic) return;
    const results = getQuestionsBySubtopic(withSubtopic.sectionSlug, withSubtopic.subtopicSlug!);
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((q) => q.sectionSlug === withSubtopic.sectionSlug && q.subtopicSlug === withSubtopic.subtopicSlug),
    ).toBe(true);
  });
});

describe("getGeneralQuestionsForSection", () => {
  it("returns only questions with a matching sectionSlug and no subtopicSlug", () => {
    const sectionSlug = pastPaperQuestions[0].sectionSlug;
    const results = getGeneralQuestionsForSection(sectionSlug);
    expect(results.every((q) => q.sectionSlug === sectionSlug && !q.subtopicSlug)).toBe(true);
  });
});

describe("getQuestionById", () => {
  it("finds an existing question by id", () => {
    const target = pastPaperQuestions[0];
    expect(getQuestionById(target.id)).toEqual(target);
  });

  it("returns undefined for a nonexistent id", () => {
    expect(getQuestionById("does-not-exist")).toBeUndefined();
  });
});
