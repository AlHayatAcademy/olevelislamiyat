import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { getQuestionsBySection } from "@/data/questions";
import { canonical } from "@/lib/seo";

const allSections = [...paper1Sections, ...paper2Sections];

interface PageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return allSections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = allSections.find((s) => s.slug === sectionSlug);
  if (!section) return {};
  return {
    title: `Past Papers: ${section.title}`,
    description: `Questions from Cambridge O Level Islamiyat 2058 relating to ${section.title}.`,
    ...canonical(`/past-papers/topical/${section.slug}`),
  };
}

export default async function TopicalPastPapersPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = allSections.find((s) => s.slug === sectionSlug);
  if (!section) notFound();

  const questions = getQuestionsBySection(sectionSlug);

  return (
    <PageShell
      title={`Topical: ${section.title}`}
      description={`Paper ${section.paper} · ${questions.length} documented question(s) tagged to this syllabus section.`}
    >
      {questions.length === 0 ? (
        <p className="text-sm text-text-muted">
          No questions documented for this section yet in the current sample.
        </p>
      ) : (
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id}>
              <Link
                href={`/past-papers/question/${q.id}`}
                className="block rounded-md border border-surface-soft px-4 py-3 hover:border-primary transition-colors"
              >
                <span className="text-sm text-text-muted">
                  {q.session} {q.year} · Paper {q.paper} ({q.variant}) · Q{q.questionNumber}
                  {q.part !== "whole" ? `(${q.part})` : ""} · {q.marks} marks · {q.ao}
                </span>
                <p className="mt-1 font-medium">{q.topicHint}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
