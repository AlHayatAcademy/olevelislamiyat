import Link from "next/link";
import { ChevronRight, CircleDot } from "lucide-react";
import type { SyllabusSection } from "@/data/syllabus";
import type { Topic } from "@/data/topics";

interface SectionHubProps {
  paper: 1 | 2;
  section: SyllabusSection;
  topics: Topic[];
}

export function SectionHub({ paper, section, topics }: SectionHubProps) {
  const topicSlugs = new Set(topics.map((t) => t.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
        Paper {paper} &middot; Section {section.number} &middot; {section.marks} marks
      </p>
      <h1 className="mt-2 text-3xl font-bold font-heading text-text">{section.title}</h1>
      <p className="mt-3 text-text-muted">{section.description}</p>

      <div className="mt-8 space-y-3">
        {section.subtopics.map((subtopic) => {
          const hasContent = topicSlugs.has(subtopic.slug);
          const content = (
            <div
              className={`group flex items-center justify-between rounded-lg border border-border px-4 py-3 shadow-soft transition-all duration-200 ${
                hasContent
                  ? "bg-surface hover:-translate-y-0.5 hover:border-primary hover:bg-surface-soft hover:shadow-card"
                  : "bg-surface-soft"
              }`}
            >
              <span className="flex items-center gap-2">
                <CircleDot size={16} className={hasContent ? "text-success" : "text-text-muted"} aria-hidden="true" />
                <span className={hasContent ? "font-medium text-text" : "text-text-muted"}>{subtopic.title}</span>
              </span>
              {hasContent ? (
                <ChevronRight
                  size={18}
                  className="text-primary transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              ) : (
                <span className="text-xs text-text-muted">Coming soon</span>
              )}
            </div>
          );

          return hasContent ? (
            <Link key={subtopic.slug} href={`/paper-${paper}/${section.slug}/${subtopic.slug}`}>
              {content}
            </Link>
          ) : (
            <div key={subtopic.slug}>{content}</div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-text-muted">
        <Link href={`/paper-${paper}`} className="text-primary hover:underline">
          &larr; Back to Paper {paper} overview
        </Link>
      </p>
    </div>
  );
}
