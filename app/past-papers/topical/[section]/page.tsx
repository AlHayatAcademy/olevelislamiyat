import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ListChecks } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { getQuestionsBySection, getGeneralQuestionsForSection } from "@/data/questions";
import { canonical } from "@/lib/seo";

const allSections = [...paper1Sections, ...paper2Sections];

interface PageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return allSections.map((s) => ({ section: s.slug }));
}

// The full set of valid sections is always known at build time - reject anything else with a
// real 404 instead of falling back to on-demand rendering (which previously produced a "soft
// 404": the not-found UI rendered correctly, but with an HTTP 200 status).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = allSections.find((s) => s.slug === sectionSlug);
  if (!section) return {};
  return {
    title: `Past Papers: ${section.title}`,
    description: `Questions from Cambridge O Level Islamiyat 2058 relating to ${section.title}, organised by subtopic.`,
    ...canonical(`/past-papers/topical/${section.slug}`),
  };
}

export default async function TopicalPastPapersPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = allSections.find((s) => s.slug === sectionSlug);
  if (!section) notFound();

  const allQuestions = getQuestionsBySection(sectionSlug);
  const generalQuestions = getGeneralQuestionsForSection(sectionSlug);

  return (
    <PageShell
      title={`Topical: ${section.title}`}
      description={`Paper ${section.paper} · Section ${section.number} · ${allQuestions.length} documented question(s), organised by subtopic below.`}
      breadcrumbs={[
        { label: "Past Papers", href: "/past-papers" },
        { label: `Topical: ${section.title}`, href: `/past-papers/topical/${section.slug}` },
      ]}
    >
      {allQuestions.length === 0 ? (
        <p className="text-sm text-text-muted">
          No questions documented for this section yet in the current sample.
        </p>
      ) : (
        <>
          <ul className="space-y-2">
            {section.subtopics.map((subtopic) => {
              const count = allQuestions.filter((q) => q.subtopicSlug === subtopic.slug).length;
              const hasQuestions = count > 0;
              const content = (
                <div
                  className={`group flex items-center justify-between rounded-lg border px-4 py-3 shadow-soft transition-all duration-200 ${
                    hasQuestions
                      ? "border-border bg-surface hover:-translate-y-0.5 hover:border-primary hover:bg-surface-soft hover:shadow-card"
                      : "border-border bg-surface-soft"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ListChecks
                      size={16}
                      className={hasQuestions ? "text-primary" : "text-text-muted"}
                      aria-hidden="true"
                    />
                    <span className={hasQuestions ? "font-medium text-text" : "text-text-muted"}>
                      {subtopic.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-xs text-text-muted">
                    {count} question{count === 1 ? "" : "s"}
                    {hasQuestions && (
                      <ChevronRight
                        size={16}
                        className="text-primary transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
              );

              return (
                <li key={subtopic.slug}>
                  {hasQuestions ? (
                    <Link href={`/past-papers/topical/${section.slug}/${subtopic.slug}`}>
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>

          {generalQuestions.length > 0 && (
            <div className="mt-8">
              <Link href={`/past-papers/topical/${section.slug}/general`}>
                <div className="group flex items-center justify-between rounded-lg border border-dashed border-border bg-surface px-4 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-surface-soft hover:shadow-card">
                  <span>
                    <span className="font-medium text-text">General / Whole-Section Questions</span>
                    <p className="mt-0.5 text-xs text-text-muted">
                      Questions that span this whole section or several subtopics at once, rather
                      than testing one specific lesson.
                    </p>
                  </span>
                  <span className="flex items-center gap-2 text-xs text-text-muted">
                    {generalQuestions.length} question{generalQuestions.length === 1 ? "" : "s"}
                    <ChevronRight
                      size={16}
                      className="text-primary transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </>
      )}

      <p className="mt-8 text-sm">
        <Link href="/past-papers#browse-by-topic" className="text-primary hover:underline">
          &larr; Back to all topics
        </Link>
      </p>
    </PageShell>
  );
}
