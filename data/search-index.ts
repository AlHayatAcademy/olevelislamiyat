// Site-wide search index, built at module-load time from the real content data sources.
// Do not hardcode duplicate content lists here — iterate the existing data arrays so the index
// always reflects what's actually on the site.

import { allTopics } from "@/data/topics/index";
import { pastPaperQuestions } from "@/data/questions";
import { modelAnswers } from "@/data/model-answers";
import { references, slugifyType } from "@/data/references";
import { quizzes } from "@/data/quizzes";
import { paper1Sections, paper2Sections } from "@/data/syllabus";

export interface SearchEntry {
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string;
}

function sectionTitle(paper: 1 | 2, sectionSlug: string): string {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.find((s) => s.slug === sectionSlug)?.title ?? sectionSlug;
}

// A small hardcoded set of the main static pages — these aren't in a data array.
const staticPages: SearchEntry[] = [
  {
    title: "Home",
    description: "O Level Islamiyat — Cambridge O Level 2058 and IGCSE 0493 Islamiyat study resources.",
    url: "/",
    category: "Page",
    keywords: "home islamiyat 2058 0493 al-hayat academy",
  },
  {
    title: "Syllabus",
    description: "Full Cambridge O Level / IGCSE Islamiyat syllabus breakdown by section and marks.",
    url: "/syllabus",
    category: "Page",
    keywords: "syllabus sections weightings 2058 0493",
  },
  {
    title: "Exam Pattern",
    description: "Paper structure, marks distribution, and assessment objectives for the Islamiyat exam.",
    url: "/exam-pattern",
    category: "Page",
    keywords: "exam pattern paper structure marks AO1 AO2 assessment objectives",
  },
  {
    title: "Paper 1",
    description: "Paper 1 lessons: major themes of the Qur'an, its history, the life of the Prophet, and the first Islamic community.",
    url: "/paper-1",
    category: "Page",
    keywords: "paper 1 quran seerah life of prophet first islamic community",
  },
  {
    title: "Paper 2",
    description: "Paper 2 lessons: history of Hadith, the Rightly Guided Caliphs, major teachings, and articles/pillars of faith.",
    url: "/paper-2",
    category: "Page",
    keywords: "paper 2 hadith caliphs articles of faith pillars of islam",
  },
  {
    title: "Past Papers",
    description: "Browse past-paper questions by year and by topic, with model answers.",
    url: "/past-papers",
    category: "Page",
    keywords: "past papers questions year topical",
  },
  {
    title: "Model Answers",
    description: "Fully worked model answers for a representative set of past-paper questions.",
    url: "/model-answers",
    category: "Page",
    keywords: "model answers sample answers exam technique",
  },
  {
    title: "Quotes & References",
    description: "Qur'anic verses, Hadith, and seerah quotations organised by category for exam use.",
    url: "/quotes-references",
    category: "Page",
    keywords: "quotes references quran verses hadith citations",
  },
  {
    title: "Revision",
    description: "Revision resources and exam-technique guidance for Islamiyat.",
    url: "/revision",
    category: "Page",
    keywords: "revision exam technique tips",
  },
  {
    title: "Quizzes",
    description: "Self-check quizzes to test recall and understanding across Paper 1 and Paper 2.",
    url: "/quizzes",
    category: "Page",
    keywords: "quizzes self test mcq true false matching",
  },
  {
    title: "Notes",
    description: "Concise revision notes across the syllabus.",
    url: "/notes",
    category: "Page",
    keywords: "notes revision summary",
  },
  {
    title: "Resources",
    description: "Further study resources for Islamiyat students.",
    url: "/resources",
    category: "Page",
    keywords: "resources study material",
  },
  {
    title: "Online Classes",
    description: "Online Islamiyat classes with Al-Hayat Academy.",
    url: "/online-classes",
    category: "Page",
    keywords: "online classes tuition academy",
  },
  {
    title: "About",
    description: "About O Level Islamiyat and Al-Hayat Research Institute of Social Sciences.",
    url: "/about",
    category: "Page",
    keywords: "about founder institute academy",
  },
  {
    title: "Contact",
    description: "Get in touch with O Level Islamiyat / Al-Hayat Academy.",
    url: "/contact",
    category: "Page",
    keywords: "contact email whatsapp phone",
  },
];

const topicEntries: SearchEntry[] = allTopics.map((t) => ({
  title: t.title,
  description: t.standing,
  url: `/paper-${t.paper}/${t.section}/${t.slug}`,
  category: t.paper === 1 ? "Paper 1 Lesson" : "Paper 2 Lesson",
  keywords: [
    t.title,
    t.standing,
    sectionTitle(t.paper, t.section),
    ...t.keyTerms.map((k) => `${k.term} ${k.meaning}`),
  ].join(" "),
}));

const questionEntries: SearchEntry[] = pastPaperQuestions.map((q) => ({
  title: `${q.session} ${q.year} Paper ${q.variant} Q${q.questionNumber}${q.part !== "whole" ? q.part : ""}`,
  description: q.topicHint,
  url: `/past-papers/question/${q.id}`,
  category: "Past Paper Question",
  keywords: [q.topicHint, q.prompt, sectionTitle(q.syllabusPaper, q.sectionSlug), q.year.toString(), q.session].join(
    " ",
  ),
}));

const modelAnswerEntries: SearchEntry[] = modelAnswers.map((m) => {
  const question = pastPaperQuestions.find((q) => q.id === m.questionId);
  const title = question
    ? `Model Answer: ${question.session} ${question.year} Paper ${question.variant} Q${question.questionNumber}${
        question.part !== "whole" ? question.part : ""
      }`
    : `Model Answer: ${m.id}`;
  return {
    title,
    description: question?.topicHint ?? "Fully worked model answer.",
    url: `/model-answers/${m.id}`,
    category: "Model Answer",
    keywords: [question?.topicHint ?? "", question?.prompt ?? "", ...m.sampleAnswer].join(" "),
  };
});

const referenceEntries: SearchEntry[] = references.map((r) => ({
  title: r.title,
  description: r.translation,
  url: `/quotes-references/${slugifyType(r.type)}/${r.id}`,
  category: "Reference",
  keywords: [r.title, r.type, r.translation, r.citation, r.explanation, r.topic].join(" "),
}));

const quizEntries: SearchEntry[] = quizzes.map((q) => ({
  title: `${q.title} Quiz`,
  description: q.description,
  url: `/quizzes/${q.id}`,
  category: "Quiz",
  keywords: [q.title, q.description, q.topicTitle, sectionTitle(q.paper, q.section)].join(" "),
}));

export const searchIndex: SearchEntry[] = [
  ...staticPages,
  ...topicEntries,
  ...questionEntries,
  ...modelAnswerEntries,
  ...referenceEntries,
  ...quizEntries,
];

export const searchIndexCountByCategory: Record<string, number> = searchIndex.reduce(
  (acc, entry) => {
    acc[entry.category] = (acc[entry.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);
