// Shared type definitions for the past-paper question bank.
// See ./index.ts for provenance notes on the data itself.

export type Paper = 1 | 2;
export type AO = "AO1" | "AO2";

export interface PastPaperQuestion {
  id: string; // e.g. "2021-jj-p11-q2a"
  year: number;
  session: "May/June" | "Oct/Nov";
  qualification: "2058";
  paper: Paper;
  variant: string; // e.g. "11", "12", "21", "22"
  questionNumber: number;
  part: "a" | "b" | "whole";
  marks: number;
  ao: AO;
  syllabusPaper: Paper;
  sectionSlug: string; // links into data/syllabus.ts sections
  subtopicSlug?: string; // links into the section's subtopics in data/syllabus.ts; unset if the question is general/whole-section
  topicHint: string; // short human label of the specific topic examined (original, not verbatim)
  prompt: string; // VERBATIM question wording from the official question paper
  sourceNote: string; // which source/07-word-extractions/ file this was transcribed from
}
