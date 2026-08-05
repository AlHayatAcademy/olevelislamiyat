// Past-paper question index for Cambridge O Level Islamiyat (2058).
//
// Question wording in the "prompt" field is reproduced VERBATIM from the official question
// papers, as transcribed in the word-extraction files under source/07-word-extractions/ (the
// raw past-paper PDFs have been removed from this repo; the .docx extractions are the sole
// source). Marks, question/part numbers, and session/paper metadata are reproduced exactly as
// they appear in those extractions. "topicHint" is an original short label (not verbatim).
// "sectionSlug" is an editorial classification of the question against the official syllabus
// (data/syllabus.ts), assigned by reading each question's content. "subtopicSlug" is a finer,
// optional classification against a section's `subtopics` list (data/syllabus.ts) — set only
// where a question maps confidently to one specific lesson; left unset where a question is
// genuinely broad/general (spans multiple subtopics or the whole section) rather than forcing
// an inaccurate match. See docs/build-status.md for classification coverage figures.
//
// Coverage: May/June and Oct/Nov series 2021-2025, Papers 11/12 (Paper 1) and 21/22 (Paper 2),
// with one exception: October/November 2025 Paper 1 Variant 12 (2058/12) has no verbatim
// question-paper source among the extraction files and is not included. See
// docs/past-paper-extraction-log.md for the full extraction log and known gaps.
//
// Data is split one file per year (./2021.ts .. ./2025.ts) to keep individual files reviewable;
// this module concatenates them back into a single ordered array so all existing callers of
// `@/data/questions` keep working unchanged.

import type { PastPaperQuestion } from "./types";
import { pastPaperQuestions2021 } from "./2021";
import { pastPaperQuestions2022 } from "./2022";
import { pastPaperQuestions2023 } from "./2023";
import { pastPaperQuestions2024 } from "./2024";
import { pastPaperQuestions2025 } from "./2025";

export type { Paper, AO, PastPaperQuestion } from "./types";

export const pastPaperQuestions: PastPaperQuestion[] = [
  ...pastPaperQuestions2021,
  ...pastPaperQuestions2022,
  ...pastPaperQuestions2023,
  ...pastPaperQuestions2024,
  ...pastPaperQuestions2025,
];

export function getQuestionsByYear(year: number): PastPaperQuestion[] {
  return pastPaperQuestions.filter((q) => q.year === year);
}

export function getQuestionsBySection(sectionSlug: string): PastPaperQuestion[] {
  return pastPaperQuestions.filter((q) => q.sectionSlug === sectionSlug);
}

export function getQuestionsBySubtopic(sectionSlug: string, subtopicSlug: string): PastPaperQuestion[] {
  return pastPaperQuestions.filter(
    (q) => q.sectionSlug === sectionSlug && q.subtopicSlug === subtopicSlug,
  );
}

// Questions tagged to a section but not confidently mapped to one specific subtopic —
// shown under a "General / Whole-Section Questions" bucket in the topical browsing UI.
export function getGeneralQuestionsForSection(sectionSlug: string): PastPaperQuestion[] {
  return pastPaperQuestions.filter((q) => q.sectionSlug === sectionSlug && !q.subtopicSlug);
}

export function getQuestionById(id: string): PastPaperQuestion | undefined {
  return pastPaperQuestions.find((q) => q.id === id);
}

export const availableYears = Array.from(new Set(pastPaperQuestions.map((q) => q.year))).sort(
  (a, b) => b - a,
);
