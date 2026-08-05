import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getQuiz, quizzes } from "@/data/quizzes";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { Quiz } from "@/components/Quiz";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

function sectionTitle(paper: 1 | 2, sectionSlug: string): string {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.find((s) => s.slug === sectionSlug)?.title ?? sectionSlug;
}

export function generateStaticParams() {
  return quizzes.map((q) => ({ id: q.id }));
}

// The full set of valid quiz ids is always known at build time - reject anything else with a
// real 404 instead of an on-demand-rendered "soft 404" (200 status).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const quiz = getQuiz(id);
  if (!quiz) return {};
  return {
    title: quiz.title,
    description: quiz.description,
    ...canonical(`/quizzes/${quiz.id}`),
  };
}

export default async function QuizDetailPage({ params }: PageProps) {
  const { id } = await params;
  const quiz = getQuiz(id);
  if (!quiz) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Quizzes", href: "/quizzes" },
          { label: quiz.title, href: `/quizzes/${quiz.id}` },
        ]}
      />

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-secondary">
        Paper {quiz.paper} &middot; {sectionTitle(quiz.paper, quiz.section)}
      </p>
      <h1 className="mt-1 text-3xl font-bold font-heading text-text">{quiz.title}</h1>
      <p className="mt-3 text-text-muted">{quiz.description}</p>

      <Link
        href={`/paper-${quiz.paper}/${quiz.section}/${quiz.topicSlug}`}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <BookOpen size={16} aria-hidden="true" />
        Read the lesson: {quiz.topicTitle}
      </Link>

      <div className="mt-8">
        <Quiz quiz={quiz} />
      </div>
    </div>
  );
}
