import Link from "next/link";
import { ChevronRight, CircleDot, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { paper1Sections, paper2Sections, type SyllabusSection } from "@/data/syllabus";
import type { Topic } from "@/data/topics";

interface SectionHubProps {
  paper: 1 | 2;
  section: SyllabusSection;
  topics: Topic[];
}

export function SectionHub({ paper, section, topics }: SectionHubProps) {
  const topicSlugs = new Set(topics.map((t) => t.slug));
  const sectionsForPaper = paper === 1 ? paper1Sections : paper2Sections;
  const otherSections = sectionsForPaper.filter((s) => s.slug !== section.slug);
  const paperAccentText = paper === 1 ? "text-tile-green" : "text-tile-blue";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: `Paper ${paper}`, href: `/paper-${paper}` },
          { label: section.title, href: `/paper-${paper}/${section.slug}` },
        ]}
      />
      <div className="mt-4 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Left sidebar: section list with active-state highlighting */}
        <nav aria-label={`Paper ${paper} sections`} className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Paper {paper} Sections
          </p>
          <ul className="mt-3 space-y-1">
            {sectionsForPaper.map((s) => {
              const active = s.slug === section.slug;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/paper-${paper}/${s.slug}`}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-primary text-white font-semibold shadow-soft"
                        : "text-text hover:bg-surface-soft"
                    }`}
                  >
                    {s.number}. {s.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Main content */}
        <div>
          <p className={`text-sm font-semibold uppercase tracking-wide ${paperAccentText}`}>
            Paper {paper} &middot; Section {section.number} &middot; {section.marks} marks
          </p>
          <h1 className="mt-2 text-3xl font-bold font-heading text-text">{section.title}</h1>
          <p className="mt-3 text-text-muted">{section.description}</p>

          <ul className="mt-8 space-y-3">
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

              return (
                <li key={subtopic.slug}>
                  {hasContent ? (
                    <Link href={`/paper-${paper}/${section.slug}/${subtopic.slug}`}>{content}</Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>

          {/* Browse other sections */}
          {otherSections.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading font-semibold text-text">Browse Other Sections</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {otherSections.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/paper-${paper}/${s.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 text-sm shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BookOpen aria-hidden="true" size={16} />
                      </span>
                      <span className="font-medium text-text">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-8 text-sm text-text-muted">
            <Link href={`/paper-${paper}`} className="text-primary hover:underline">
              &larr; Back to Paper {paper} overview
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
