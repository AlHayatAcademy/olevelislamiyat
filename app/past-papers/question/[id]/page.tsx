import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  BookmarkPlus,
  Flag,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/Button";
import { pastPaperQuestions, getQuestionById } from "@/data/questions";
import { getModelAnswer } from "@/data/model-answers";
import { getSection } from "@/data/syllabus";
import { siteConfig } from "@/data/site-config";
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

// General command-word reference — standard Cambridge-style command word
// meanings, not extracted per-question, shown as a fixed glossary alongside
// every question.
const commandWords = [
  { word: "State", meaning: "Give a short, factual answer with no explanation needed." },
  { word: "Describe", meaning: "Give a detailed account, in your own words." },
  { word: "Explain", meaning: "Set out reasons or causes — say why or how." },
  { word: "Discuss", meaning: "Present more than one side of an issue or interpretation." },
];

function guidanceFor(ao: "AO1" | "AO2", marks: number) {
  if (ao === "AO1") {
    return `This is an AO1 (Recall, select and present relevant facts) question worth ${marks} marks. Focus on accurate, well-organised factual content — names, events, sequences and details drawn directly from the syllabus topic — rather than personal opinion or evaluation.`;
  }
  return `This is an AO2 (Understanding of significance in Islam and Muslim lives) question worth ${marks} marks. Go beyond stating facts: explain why the topic matters, what it means for Muslim belief or practice, and support each point with reasoning.`;
}

export default async function QuestionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const question = getQuestionById(id);
  if (!question) notFound();

  const section = getSection(question.syllabusPaper, question.sectionSlug);
  const answer = getModelAnswer(question.id);

  const currentIndex = pastPaperQuestions.findIndex((q) => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? pastPaperQuestions[currentIndex - 1] : undefined;
  const nextQuestion =
    currentIndex >= 0 && currentIndex < pastPaperQuestions.length - 1
      ? pastPaperQuestions[currentIndex + 1]
      : undefined;

  const related = section
    ? pastPaperQuestions.filter((q) => q.sectionSlug === section.slug && q.id !== question.id).slice(0, 4)
    : [];

  const keyPoints =
    answer?.markingPoints.map((mp) => mp.point) ?? [
      "Identify the specific syllabus topic the question is testing.",
      "Structure your answer with a clear opening and logical sequence of points.",
      "Support each point with a relevant example, name, date or detail.",
      "Keep language concise — write only what earns marks.",
    ];

  const reportSubject = encodeURIComponent(`Issue report: question ${question.id}`);
  const reportBody = encodeURIComponent(
    `I'd like to report an issue with the question at /past-papers/question/${question.id}.\n\nDetails:\n`
  );

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
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Question {question.questionNumber}
          {question.part !== "whole" ? `(${question.part})` : ""}
        </span>
        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          {question.marks} marks
        </span>
        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-muted">
          {question.ao}
        </span>
      </div>

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

      {/* Two-column body: guidance/key points (left) + related/command words (right) */}
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
            <h2 className="font-heading font-semibold text-text">Guidance</h2>
            <p className="mt-2 text-sm text-text-muted">{guidanceFor(question.ao, question.marks)}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
            <h2 className="font-heading font-semibold text-text">Key Points</h2>
            <ul className="mt-3 space-y-2">
              {keyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-text-muted">
                  <CheckCircle2 aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-success" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          {related.length > 0 && (
            <div className="rounded-xl border border-border bg-surface-soft p-5">
              <h3 className="font-heading font-semibold text-text">Related</h3>
              <ul className="mt-3 space-y-2">
                {related.map((q) => (
                  <li key={q.id}>
                    <Link
                      href={`/past-papers/question/${q.id}`}
                      className="block rounded-md px-2 py-1.5 text-sm text-text transition-colors hover:bg-surface hover:text-primary"
                    >
                      {q.session} {q.year} · Q{q.questionNumber}
                      {q.part !== "whole" ? `(${q.part})` : ""} — {q.topicHint}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-border bg-surface-soft p-5">
            <h3 className="font-heading font-semibold text-text">Command Words</h3>
            <dl className="mt-3 space-y-3">
              {commandWords.map((cw) => (
                <div key={cw.word}>
                  <dt className="text-sm font-semibold text-primary">{cw.word}</dt>
                  <dd className="text-xs text-text-muted">{cw.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* Bottom action bar */}
      <div className="mt-10 space-y-4 border-t border-border pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {prevQuestion ? (
            <Button href={`/past-papers/question/${prevQuestion.id}`} variant="ghost" icon={ChevronLeft}>
              Previous Question
            </Button>
          ) : (
            <span />
          )}
          {nextQuestion ? (
            <Button
              href={`/past-papers/question/${nextQuestion.id}`}
              variant="ghost"
              icon={ChevronRight}
              iconPosition="right"
            >
              Next Question
            </Button>
          ) : (
            <span />
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {answer ? (
            <>
              <Button href={`/model-answers/${answer.id}#plan`} variant="secondary" icon={ClipboardCheck}>
                View Answer Plan
              </Button>
              <Button href={`/model-answers/${answer.id}`} variant="success" icon={FileText}>
                View Model Answer
              </Button>
            </>
          ) : (
            <p className="self-center text-sm text-text-muted">
              A full model answer for this question is not yet published.
            </p>
          )}
          <Button href="/revision" variant="warning" icon={BookmarkPlus}>
            Add to Practice
          </Button>
          <Button
            href={`mailto:${siteConfig.contact.email}?subject=${reportSubject}&body=${reportBody}`}
            external
            variant="destructive"
            className="!bg-transparent !text-error border border-error hover:!bg-error hover:!text-white"
            icon={Flag}
          >
            Report an Issue
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
