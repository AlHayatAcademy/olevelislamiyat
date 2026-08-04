import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { modelAnswers } from "@/data/model-answers";
import { getQuestionById } from "@/data/questions";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return modelAnswers.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const answer = modelAnswers.find((a) => a.id === id);
  const question = answer ? getQuestionById(answer.questionId) : undefined;
  if (!answer || !question) return {};
  return {
    title: `Model Answer: ${question.topicHint}`,
    description: `${answer.marks}-mark ${answer.ao} model answer for a Paper ${answer.paper} question.`,
    ...canonical(`/model-answers/${answer.id}`),
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default async function ModelAnswerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const answer = modelAnswers.find((a) => a.id === id);
  if (!answer) notFound();
  const question = getQuestionById(answer.questionId);
  if (!question) notFound();

  return (
    <PageShell
      title={`Model Answer — ${question.topicHint}`}
      description={`Paper ${answer.paper} · ${question.session} ${question.year} · ${answer.marks} marks · ${answer.ao}`}
      breadcrumbs={[
        { label: "Model Answers", href: "/model-answers" },
        { label: question.topicHint, href: `/model-answers/${answer.id}` },
      ]}
    >
      <div className="rounded-md border border-surface-soft p-4">
        <p className="text-xs uppercase tracking-wide text-text-muted mb-2">Question (original paraphrase)</p>
        <p className="font-medium">{question.prompt}</p>
        <Link
          href={`/past-papers/question/${question.id}`}
          className="mt-2 inline-block text-sm text-primary underline"
        >
          View in Past Papers →
        </Link>
      </div>

      <Section title="Answer plan">
        <ul className="list-disc pl-5 space-y-1">
          {answer.plan.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </Section>

      <Section title="Full sample answer">
        <ul className="list-disc pl-5 space-y-2">
          {answer.sampleAnswer.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </Section>

      <Section title="Marking-point breakdown">
        <ul className="space-y-1">
          {answer.markingPoints.map((mp, i) => (
            <li key={i} className="flex justify-between gap-4 border-b border-surface-soft py-1 text-sm">
              <span>{mp.point}</span>
              <span className="whitespace-nowrap text-text-muted">{mp.marksAvailable} mark(s)</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Strengths of this answer">
        <ul className="list-disc pl-5 space-y-1">
          {answer.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Areas for improvement">
        <ul className="list-disc pl-5 space-y-1">
          {answer.improvements.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Self-assessment checklist">
        <ul className="list-disc pl-5 space-y-1">
          {answer.selfAssessment.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
