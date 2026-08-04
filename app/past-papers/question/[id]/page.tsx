import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { pastPaperQuestions, getQuestionById } from "@/data/questions";
import { getModelAnswer } from "@/data/model-answers";
import { getSection } from "@/data/syllabus";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return pastPaperQuestions.map((q) => ({ id: q.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const question = getQuestionById(id);
  if (!question) return {};
  return {
    title: `${question.session} ${question.year} · Paper ${question.paper} Q${question.questionNumber}`,
    description: question.topicHint,
    ...canonical(`/past-papers/question/${question.id}`),
  };
}

export default async function QuestionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const question = getQuestionById(id);
  if (!question) notFound();

  const section = getSection(question.syllabusPaper, question.sectionSlug);
  const answer = getModelAnswer(question.id);

  return (
    <PageShell
      title={`${question.session} ${question.year} — Paper ${question.paper} (${question.variant})`}
      description={`Question ${question.questionNumber}${question.part !== "whole" ? ` part (${question.part})` : ""} · ${question.marks} marks · ${question.ao}`}
      breadcrumbs={[
        { label: "Past Papers", href: "/past-papers" },
        {
          label: `${question.session} ${question.year} — Q${question.questionNumber}`,
          href: `/past-papers/question/${question.id}`,
        },
      ]}
    >
      <div className="rounded-md border border-surface-soft p-4">
        <p className="text-xs uppercase tracking-wide text-text-muted mb-2">
          Original paraphrase — not verbatim exam wording
        </p>
        <p className="font-medium">{question.prompt}</p>
      </div>

      {section && (
        <p className="text-sm">
          Syllabus section:{" "}
          <Link href={`/past-papers/topical/${section.slug}`} className="text-primary underline">
            Paper {section.paper} · {section.title}
          </Link>
        </p>
      )}

      <p className="text-sm text-text-muted">Source cross-check: {question.sourceNote}</p>

      {answer ? (
        <Link
          href={`/model-answers/${answer.id}`}
          className="inline-block mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          View full model answer →
        </Link>
      ) : (
        <p className="text-sm text-text-muted mt-4">
          A full model answer for this question is not yet published.
        </p>
      )}
    </PageShell>
  );
}
