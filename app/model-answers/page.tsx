import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { modelAnswers } from "@/data/model-answers";
import { getQuestionById } from "@/data/questions";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Model Answers",
  description: "Answer-structure guidance aligned with AO1/AO2 mark schemes.",
  ...canonical("/model-answers"),
};

export default function ModelAnswersPage() {
  return (
    <PageShell
      title="Model Answers"
      description="Answer-structure guidance aligned with AO1/AO2 mark schemes."
      breadcrumbs={[{ label: "Model Answers", href: "/model-answers" }]}
    >
      <p>
        Each model answer below is written from scratch — a full answer plan, an original sample
        answer in bullet-point form, a marking-point breakdown, and a self-assessment checklist —
        never a paraphrase of an official mark scheme.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 mt-6">
        {modelAnswers.map((answer) => {
          const question = getQuestionById(answer.questionId);
          if (!question) return null;
          return (
            <Link
              key={answer.id}
              href={`/model-answers/${answer.id}`}
              className="block rounded-md border border-surface-soft px-4 py-3 hover:border-primary transition-colors"
            >
              <span className="text-sm text-text-muted">
                Paper {question.paper} · {question.session} {question.year} · {answer.marks} marks
                · {answer.ao}
              </span>
              <p className="mt-1 font-medium">{question.topicHint}</p>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
