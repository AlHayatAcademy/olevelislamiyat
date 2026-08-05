import { describe, it, expect } from "vitest";
import { allTopics, getTopic, getTopicsForSection, getAllTopicParams } from "@/data/topics";
import { paper1Sections, paper2Sections, getSection, getSections } from "@/data/syllabus";

function allSubtopicSlugs(paper: 1 | 2) {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.flatMap((s) => s.subtopics.map((sub) => ({ section: s.slug, slug: sub.slug })));
}

describe("syllabus <-> topics 1:1 coverage", () => {
  it("every syllabus subtopic (both papers) has exactly one matching topic/lesson", () => {
    const allSubtopics = [...allSubtopicSlugs(1), ...allSubtopicSlugs(2)];
    for (const { section, slug } of allSubtopics) {
      const paper = allSubtopicSlugs(1).some((s) => s.section === section && s.slug === slug) ? 1 : 2;
      const matches = allTopics.filter((t) => t.paper === paper && t.section === section && t.slug === slug);
      expect(matches.length, `expected exactly one topic for ${paper}/${section}/${slug}`).toBe(1);
    }
  });

  it("every topic maps back to a real syllabus subtopic (no orphan lessons)", () => {
    for (const topic of allTopics) {
      const section = getSection(topic.paper, topic.section);
      expect(section, `topic ${topic.slug} references unknown section ${topic.section}`).toBeDefined();
      const subtopic = section?.subtopics.find((s) => s.slug === topic.slug);
      expect(subtopic, `topic ${topic.paper}/${topic.section}/${topic.slug} has no matching syllabus subtopic`).toBeDefined();
    }
  });

  it("topic count matches syllabus subtopic count exactly", () => {
    const subtopicCount = allSubtopicSlugs(1).length + allSubtopicSlugs(2).length;
    expect(allTopics.length).toBe(subtopicCount);
  });
});

describe("topics data integrity", () => {
  it("has no duplicate (paper, section, slug) topics", () => {
    const keys = allTopics.map((t) => `${t.paper}/${t.section}/${t.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("every topic has non-empty core content fields", () => {
    for (const t of allTopics) {
      expect(t.title.trim().length, `${t.slug} missing title`).toBeGreaterThan(0);
      expect(t.learningObjectives.length, `${t.slug} missing learningObjectives`).toBeGreaterThan(0);
      expect(t.explanation.length, `${t.slug} missing explanation`).toBeGreaterThan(0);
      expect(t.examTip.trim().length, `${t.slug} missing examTip`).toBeGreaterThan(0);
    }
  });
});

describe("getTopic", () => {
  it("finds an existing topic", () => {
    const target = allTopics[0];
    expect(getTopic(target.paper, target.section, target.slug)).toEqual(target);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getTopic(1, "major-themes-of-the-quran", "does-not-exist")).toBeUndefined();
  });
});

describe("getTopicsForSection", () => {
  it("returns only topics belonging to the given paper and section", () => {
    const { paper, section } = allTopics[0];
    const results = getTopicsForSection(paper, section);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((t) => t.paper === paper && t.section === section)).toBe(true);
  });
});

describe("getAllTopicParams", () => {
  it("returns one { section, topic } pair per topic for the given paper", () => {
    const params = getAllTopicParams(1);
    const expectedCount = allTopics.filter((t) => t.paper === 1).length;
    expect(params).toHaveLength(expectedCount);
    for (const p of params) {
      expect(p).toHaveProperty("section");
      expect(p).toHaveProperty("topic");
    }
  });
});

describe("getSections / getSection", () => {
  it("getSections returns the right paper's sections in order", () => {
    expect(getSections(1)).toEqual(paper1Sections);
    expect(getSections(2)).toEqual(paper2Sections);
  });

  it("getSection finds a known section and returns undefined for an unknown one", () => {
    const known = paper1Sections[0];
    expect(getSection(1, known.slug)).toEqual(known);
    expect(getSection(1, "not-a-real-section")).toBeUndefined();
  });
});
