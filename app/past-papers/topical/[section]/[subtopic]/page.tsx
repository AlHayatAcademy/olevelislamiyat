import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { TopicalQuestionList } from "@/components/TopicalQuestionList";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import {
  getQuestionsBySubtopic,
  getGeneralQuestionsForSection,
  getQuestionsBySection,
} from "@/data/questions";
import { canonical } from "@/lib/seo";

const allSections = [...paper1Sections, ...paper2Sections];

interface PageProps {
  params: Promise<{ section: string; subtopic: string }>;
}

export function generateStaticParams() {
  return allSections.flatMap((s) => [
    ...s.subtopics.map((t) => ({ section: s.slug, subtopic: t.slug })),
    { section: s.slug, subtopic: "general" },
  ]);
}

function resolve(sectionSlug: string, subtopicSlug: string) {
  const section = allSections.find((s) => s.slug === sectionSlug);
  if (!section) return null;
  if (subtopicSlug === "general") {
    const questions = getGeneralQuestionsForSection(sectionSlug);
    return { section, subtopicTitle: "General / Whole-Section Questions", questions };
  }
  const subtopic = section.subtopics.find((t) => t.slug === subtopicSlug);
  if (!subtopic) return null;
  const questions = getQuestionsBySubtopic(sectionSlug, subtopicSlug);
  return { section, subtopicTitle: subtopic.title, questions };
}

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionSlug, subtopic: subtopicSlug } = await params;
  const resolved = resolve(sectionSlug, subtopicSlug);
  if (!resolved) return {};
  return {
    title: `Past Papers: ${resolved.subtopicTitle}`,
    description: `Cambridge O Level Islamiyat 2058 past-paper questions on ${resolved.subtopicTitle} (${resolved.section.title}).`,
    ...canonical(`/past-papers/topical/${sectionSlug}/${subtopicSlug}`),
  };
}

export default async function TopicalSubtopicPage({ params }: PageProps) {
  const { section: sectionSlug, subtopic: subtopicSlug } = await params;
  const resolved = resolve(sectionSlug, subtopicSlug);
  if (!resolved) notFound();
  const { section, subtopicTitle, questions } = resolved;

  const totalInSection = getQuestionsBySection(sectionSlug).length;

  return (
    <PageShell
      title={subtopicTitle}
      description={`Paper ${section.paper} · ${section.title} · ${questions.length} of ${totalInSection} documented question(s) in this section.`}
      breadcrumbs={[
        { label: "Past Papers", href: "/past-papers" },
        { label: `Topical: ${section.title}`, href: `/past-papers/topical/${section.slug}` },
        {
          label: subtopicTitle,
          href: `/past-papers/topical/${section.slug}/${subtopicSlug}`,
        },
      ]}
    >
      {questions.length === 0 ? (
        <p className="text-sm text-text-muted">No questions documented for this subtopic yet.</p>
      ) : (
        <TopicalQuestionList questions={questions} />
      )}
    </PageShell>
  );
}
