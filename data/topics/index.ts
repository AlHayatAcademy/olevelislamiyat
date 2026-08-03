import type { Topic } from "./types";
import { paper1HistoryOfQuranTopics } from "./paper1-history-of-quran";
import { paper1LifeOfProphetTopics } from "./paper1-life-of-prophet";
import { paper2HistoryOfHadithTopics } from "./paper2-history-of-hadith";
import { paper2CaliphsTopics } from "./paper2-caliphs";

export type { Topic } from "./types";

export const allTopics: Topic[] = [
  ...paper1HistoryOfQuranTopics,
  ...paper1LifeOfProphetTopics,
  ...paper2HistoryOfHadithTopics,
  ...paper2CaliphsTopics,
];

export function getTopicsForSection(paper: 1 | 2, sectionSlug: string): Topic[] {
  return allTopics.filter((t) => t.paper === paper && t.section === sectionSlug);
}

export function getTopic(paper: 1 | 2, sectionSlug: string, topicSlug: string): Topic | undefined {
  return allTopics.find((t) => t.paper === paper && t.section === sectionSlug && t.slug === topicSlug);
}

export function getAllTopicParams(paper: 1 | 2): { section: string; topic: string }[] {
  return allTopics.filter((t) => t.paper === paper).map((t) => ({ section: t.section, topic: t.slug }));
}
