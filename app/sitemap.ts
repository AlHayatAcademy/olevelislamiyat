import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

const routes = [
  "/",
  "/syllabus",
  "/exam-pattern",
  "/paper-1",
  "/paper-2",
  "/past-papers",
  "/model-answers",
  "/quotes-references",
  "/revision",
  "/quizzes",
  "/notes",
  "/resources",
  "/online-classes",
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
  return routes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
  }));
}
