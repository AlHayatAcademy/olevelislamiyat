import Link from "next/link";
import { ArrowRight, Puzzle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { quizzes, type Quiz } from "@/data/quizzes";
import { paper1Sections, paper2Sections, type SyllabusSection } from "@/data/syllabus";
import type { TileAccent } from "@/data/homepage-content";
import { tileAccentClasses } from "@/lib/tile-accent";
import { getSubtopicIcon } from "@/lib/subtopic-icons";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Quizzes",
  description:
    "Browse self-check quizzes across every section and subtopic of Paper 1 and Paper 2, with more quizzes added over time.",
  ...canonical("/quizzes"),
};

const accentRotation: TileAccent[] = ["green", "gold", "purple", "blue", "teal", "coral", "amber", "rose"];

function getQuizForTopic(paper: 1 | 2, sectionSlug: string, subtopicSlug: string): Quiz | undefined {
  return quizzes.find(
    (q) => q.paper === paper && q.section === sectionSlug && q.topicSlug === subtopicSlug
  );
}

const totalSubtopics =
  paper1Sections.reduce((n, s) => n + s.subtopics.length, 0) +
  paper2Sections.reduce((n, s) => n + s.subtopics.length, 0);

function PaperOutline({ paper, sections }: { paper: 1 | 2; sections: SyllabusSection[] }) {
  let accentIndex = 0;
  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl font-bold text-text">
        Paper {paper}
        <span className="ml-2 text-sm font-normal text-text-muted">
          ({sections.reduce((n, s) => n + s.subtopics.length, 0)} topics)
        </span>
      </h2>

      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <div key={section.slug}>
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
              <h3 className="font-heading text-lg font-semibold text-text">
                {section.number}. {section.title}
              </h3>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-text-muted">
                {section.marks} marks
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {section.subtopics.map((subtopic) => {
                const quiz = getQuizForTopic(paper, section.slug, subtopic.slug);
                const Icon = getSubtopicIcon(paper, section.slug, subtopic.slug);
                const accent = tileAccentClasses[accentRotation[accentIndex % accentRotation.length]];
                accentIndex += 1;

                if (quiz) {
                  const paperBorder = paper === 1 ? "border-l-tile-green" : "border-l-tile-blue";
                  return (
                    <div
                      key={subtopic.slug}
                      className={`group flex flex-col rounded-xl border border-border ${paperBorder} border-l-4 bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110 ${accent.badge} ${accent.badgeHover}`}
                        >
                          <Icon aria-hidden="true" size={18} />
                        </span>
                        <span className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                          {quiz.questions.length} questions
                        </span>
                      </div>
                      <h4 className="mt-3 text-base font-semibold font-heading text-text">
                        {subtopic.title}
                      </h4>
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
                }

                return (
                  <div
                    key={subtopic.slug}
                    className="flex flex-col rounded-xl border border-dashed border-border bg-surface-soft p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-text-muted/10 text-text-muted">
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                        0 questions
                      </span>
                    </div>
                    <h4 className="mt-3 text-base font-semibold font-heading text-text-muted">
                      {subtopic.title}
                    </h4>
                    <p className="mt-2 flex-1 text-sm text-text-muted">
                      A self-check quiz for this topic hasn&apos;t been added yet.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-block w-fit rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                        Quiz coming soon
                      </span>
                      <Link
                        href={`/paper-${paper}/${section.slug}/${subtopic.slug}`}
                        className="text-sm font-medium text-primary hover:underline underline-offset-2"
                      >
                        Read the lesson &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function QuizzesPage() {
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
        A full outline of every section and topic across Paper 1 and Paper 2 ({totalSubtopics} topics
        in total). {quizzes.length} self-check quizzes are live so far, each with instant feedback and a
        short explanation for every question, and linking back to the full lesson for revision. Topics
        without a quiz yet are marked &quot;Quiz coming soon&quot; and link through to the lesson instead
        &mdash; more quizzes are being added over time.
      </p>

      <PaperOutline paper={1} sections={paper1Sections} />
      <PaperOutline paper={2} sections={paper2Sections} />
    </div>
  );
}
