// Content schema for a single lesson/topic page under Paper 1 or Paper 2.
// Every field is designed so it renders directly as exam-focused, bullet-point content
// (see docs root instructions: AO1 vs AO2 separation, exam tips, common-mistake warnings).

export interface KeyFact {
  label: string;
  detail: string;
}

export interface Topic {
  slug: string;
  paper: 1 | 2;
  section: string; // matches SyllabusSection.slug in data/syllabus.ts
  title: string;
  standing: string; // one-line "what this is" summary shown under the title
  learningObjectives: string[];
  keyTerms: { term: string; meaning: string }[];
  explanation: string[]; // bullet points, AO1 knowledge content
  keyFacts: KeyFact[];
  ao1Guidance: string[];
  ao2Guidance: string[];
  commonMistakes: string[];
  examTip: string;
  relatedTopics: { paper: 1 | 2; section: string; slug: string; title: string }[];
}
