import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { pastPaperQuestions, availableYears, getQuestionsByYear } from "@/data/questions";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ year: string }>;
}

export function generateStaticParams() {
  return availableYears.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { year } = await params;
  return {
    title: `Past Papers ${year}`,
    description: `Cambridge O Level Islamiyat 2058 questions documented from the ${year} sessions.`,
    ...canonical(`/past-papers/year-wise/${year}`),
  };
}

export default async function YearWisePastPapersPage({ params }: PageProps) {
  const { year } = await params;
  const yearNum = Number(year);
  if (!availableYears.includes(yearNum)) notFound();

  const questions = getQuestionsByYear(yearNum);

  return (
    <PageShell
      title={`Past Papers — ${year}`}
      description={`${questions.length} documented question(s) from the ${year} sessions, paraphrased in original wording.`}
    >
      {["May/June", "Oct/Nov"].map((session) => {
        const sessionQuestions = questions.filter((q) => q.session === session);
        if (sessionQuestions.length === 0) return null;
        return (
          <div key={session} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{session} {year}</h2>
            <ul className="space-y-2">
              {sessionQuestions.map((q) => (
                <li key={q.id}>
                  <Link
                    href={`/past-papers/question/${q.id}`}
                    className="block rounded-md border border-surface-soft px-4 py-3 hover:border-primary transition-colors"
                  >
                    <span className="text-sm text-text-muted">
                      Paper {q.paper} ({q.variant}) · Q{q.questionNumber}
                      {q.part !== "whole" ? `(${q.part})` : ""} · {q.marks} marks · {q.ao}
                    </span>
                    <p className="mt-1 font-medium">{q.topicHint}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <p className="text-sm text-text-muted mt-6">
        Total questions documented across all years: {pastPaperQuestions.length}. This is a
        curated sample, not full paper-by-paper coverage — see
        docs/model-answers-and-references-build.md for the coverage log.
      </p>
    </PageShell>
  );
}
