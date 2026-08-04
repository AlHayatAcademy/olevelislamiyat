import { ArrowRight, Puzzle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { quizzes } from "@/data/quizzes";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import type { TileAccent } from "@/data/homepage-content";
import { tileAccentClasses } from "@/lib/tile-accent";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Quizzes",
  description: "Self-check quizzes to test recall and understanding across Paper 1 and Paper 2.",
  ...canonical("/quizzes"),
};

const accentRotation: TileAccent[] = ["green", "gold", "purple", "blue", "teal"];

function sectionTitle(paper: 1 | 2, sectionSlug: string): string {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.find((s) => s.slug === sectionSlug)?.title ?? sectionSlug;
}

export default function QuizzesPage() {
  const paper1Quizzes = quizzes.filter((q) => q.paper === 1);
  const paper2Quizzes = quizzes.filter((q) => q.paper === 2);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Quizzes", href: "/quizzes" }]} />
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tile-purple/10 text-tile-purple">
          <Puzzle aria-hidden="true" size={22} />
        </span>
        <h1 className="text-3xl font-bold font-heading text-text">Quizzes</h1>
      </div>
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
          <h2 className="font-heading text-xl font-semibold text-text">
            {label} <span className="text-sm font-normal text-text-muted">({list.length} quizzes)</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {list.map((quiz, i) => {
              const accent = tileAccentClasses[accentRotation[i % accentRotation.length]];
              return (
                <div
                  key={quiz.id}
                  className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110 ${accent.badge} ${accent.badgeHover}`}
                    >
                      <Puzzle aria-hidden="true" size={18} />
                    </span>
                    <span className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {quiz.questions.length} questions
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-secondary">
                    Paper {quiz.paper} &middot; {sectionTitle(quiz.paper, quiz.section)}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold font-heading text-text">{quiz.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-text-muted">{quiz.description}</p>
                  <div className="mt-4">
                    <Button
                      href={`/quizzes/${quiz.id}`}
                      variant="success"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Start Quiz
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
