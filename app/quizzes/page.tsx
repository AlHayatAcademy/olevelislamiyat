import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { quizzes } from "@/data/quizzes";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Quizzes",
  description: "Self-check quizzes to test recall and understanding across Paper 1 and Paper 2.",
  ...canonical("/quizzes"),
};

function sectionTitle(paper: 1 | 2, sectionSlug: string): string {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.find((s) => s.slug === sectionSlug)?.title ?? sectionSlug;
}

export default function QuizzesPage() {
  const paper1Quizzes = quizzes.filter((q) => q.paper === 1);
  const paper2Quizzes = quizzes.filter((q) => q.paper === 2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">Quizzes</h1>
      <p className="mt-3 text-text-muted">
        {quizzes.length} self-check quizzes drawn directly from the Paper 1 and Paper 2 lessons. Each quiz gives
        instant feedback with a short explanation for every question, and links back to the full lesson for
        revision.
      </p>

      {[
        { label: "Paper 1", list: paper1Quizzes },
        { label: "Paper 2", list: paper2Quizzes },
      ].map(({ label, list }) => (
        <section key={label} className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-text">{label}</h2>
          <div className="mt-4 space-y-4">
            {list.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quizzes/${quiz.id}`}
                className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                      Paper {quiz.paper} &middot; {sectionTitle(quiz.paper, quiz.section)}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold font-heading text-text">{quiz.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{quiz.description}</p>
                    <p className="mt-2 text-xs text-text-muted">{quiz.questions.length} questions</p>
                  </div>
                  <ChevronRight size={20} className="shrink-0 text-primary" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
