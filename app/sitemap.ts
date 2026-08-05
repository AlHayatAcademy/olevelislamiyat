import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { allTopics } from "@/data/topics";
import { availableYears, pastPaperQuestions } from "@/data/questions";
import { referenceTypes, slugifyType, references } from "@/data/references";
import { modelAnswers } from "@/data/model-answers";
import { quizzes } from "@/data/quizzes";

const staticRoutes = [
  "/",
  "/syllabus",
  "/exam-pattern",
  "/paper-1",
  "/paper-2",
  "/past-papers",
  "/model-answers",
  "/quotes-references",
  "/quotes-references/by-type",
  "/revision",
  "/quizzes",
  "/notes",
  "/resources",
  "/online-classes",
  "/teacher-resources",
  "/about",
  "/about/institute",
  "/about/founder",
  "/contact",
  "/privacy",
  "/terms",
  "/copyright",
  "/disclaimer",
  "/cambridge-disclaimer",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: now,
  }));

  for (const section of paper1Sections) {
    entries.push({ url: `${siteConfig.domain}/paper-1/${section.slug}`, lastModified: now });
  }
  for (const section of paper2Sections) {
    entries.push({ url: `${siteConfig.domain}/paper-2/${section.slug}`, lastModified: now });
  }
  for (const topic of allTopics) {
    entries.push({
      url: `${siteConfig.domain}/paper-${topic.paper}/${topic.section}/${topic.slug}`,
      lastModified: now,
    });
  }

  for (const year of availableYears) {
    entries.push({ url: `${siteConfig.domain}/past-papers/year-wise/${year}`, lastModified: now });
  }
  entries.push({ url: `${siteConfig.domain}/past-papers/topical`, lastModified: now });
  for (const section of [...paper1Sections, ...paper2Sections]) {
    entries.push({ url: `${siteConfig.domain}/past-papers/topical/${section.slug}`, lastModified: now });
    for (const sub of section.subtopics) {
      entries.push({
        url: `${siteConfig.domain}/past-papers/topical/${section.slug}/${sub.slug}`,
        lastModified: now,
      });
    }
  }
  for (const question of pastPaperQuestions) {
    entries.push({ url: `${siteConfig.domain}/past-papers/question/${question.id}`, lastModified: now });
  }

  for (const answer of modelAnswers) {
    entries.push({ url: `${siteConfig.domain}/model-answers/${answer.id}`, lastModified: now });
  }

  for (const type of referenceTypes) {
    entries.push({
      url: `${siteConfig.domain}/quotes-references/${slugifyType(type)}`,
      lastModified: now,
    });
  }
  for (const reference of references) {
    entries.push({
      url: `${siteConfig.domain}/quotes-references/${slugifyType(reference.type)}/${reference.id}`,
      lastModified: now,
    });
  }
  for (const section of [...paper1Sections, ...paper2Sections]) {
    for (const sub of section.subtopics) {
      entries.push({
        url: `${siteConfig.domain}/quotes-references/topic/${section.slug}/${sub.slug}`,
        lastModified: now,
      });
    }
  }

  for (const quiz of quizzes) {
    entries.push({ url: `${siteConfig.domain}/quizzes/${quiz.id}`, lastModified: now });
  }

  return entries;
}
