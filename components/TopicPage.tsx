import Link from "next/link";
import {
  Target,
  BookOpen,
  ListChecks,
  Info,
  Lightbulb,
  AlertTriangle,
  PenSquare,
  Link2,
} from "lucide-react";
import type { Topic } from "@/data/topics";
import { getSection } from "@/data/syllabus";
import { getQuestionsBySubtopic } from "@/data/questions";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface TopicPageProps {
  topic: Topic;
}

function Section({
  icon: Icon,
  title,
  children,
  tone = "default",
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "ao1" | "ao2" | "warning";
}) {
  const toneClasses: Record<string, string> = {
    default: "border-border bg-surface",
    ao1: "border-primary/30 bg-surface",
    ao2: "border-secondary/40 bg-surface",
    warning: "border-warning/40 bg-surface",
  };

  return (
    <section className={`rounded-xl border p-5 ${toneClasses[tone]}`}>
      <h2 className="flex items-center gap-2 text-lg font-semibold font-heading text-text">
        <Icon size={20} className="text-primary" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function TopicPage({ topic }: TopicPageProps) {
  const section = getSection(topic.paper, topic.section);
  const relatedQuestions = getQuestionsBySubtopic(topic.section, topic.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: `Paper ${topic.paper}`, href: `/paper-${topic.paper}` },
          { label: section?.title ?? topic.section, href: `/paper-${topic.paper}/${topic.section}` },
          { label: topic.title, href: `/paper-${topic.paper}/${topic.section}/${topic.slug}` },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold font-heading text-text">{topic.title}</h1>
      <p className="mt-3 text-text-muted">{topic.standing}</p>

      {relatedQuestions.length > 0 && (
        <Link
          href={`/past-papers/topical/${topic.section}/${topic.slug}`}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          {relatedQuestions.length} related past-paper question{relatedQuestions.length === 1 ? "" : "s"} for this topic &rarr;
        </Link>
      )}

      <div className="mt-8 space-y-6">
        <Section icon={Target} title="Learning objectives">
          <ul className="list-disc list-inside space-y-1 text-text">
            {topic.learningObjectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>
        </Section>

        <Section icon={BookOpen} title="Key terms">
          <dl className="space-y-2">
            {topic.keyTerms.map((kt) => (
              <div key={kt.term}>
                <dt className="font-semibold text-text">{kt.term}</dt>
                <dd className="text-text-muted">{kt.meaning}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section icon={ListChecks} title="Explanation">
          <ul className="list-disc list-inside space-y-2 text-text">
            {topic.explanation.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </Section>

        <Section icon={Info} title="Key facts">
          <ul className="space-y-1 text-text">
            {topic.keyFacts.map((f) => (
              <li key={f.label}>
                <span className="font-semibold">{f.label}:</span> {f.detail}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={ListChecks} title="AO1 exam guidance — knowledge &amp; understanding" tone="ao1">
          <ul className="list-disc list-inside space-y-1 text-text">
            {topic.ao1Guidance.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </Section>

        <Section icon={Lightbulb} title="AO2 exam guidance — significance &amp; evaluation" tone="ao2">
          <ul className="list-disc list-inside space-y-1 text-text">
            {topic.ao2Guidance.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </Section>

        <Section icon={AlertTriangle} title="Common mistakes to avoid" tone="warning">
          <ul className="list-disc list-inside space-y-1 text-text">
            {topic.commonMistakes.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </Section>

        <Section icon={PenSquare} title="Exam tip">
          <p className="text-text">{topic.examTip}</p>
        </Section>

        {topic.relatedTopics.length > 0 && (
          <Section icon={Link2} title="Related topics">
            <ul className="space-y-1">
              {topic.relatedTopics.map((rt) => (
                <li key={`${rt.paper}-${rt.section}-${rt.slug}`}>
                  <Link
                    href={`/paper-${rt.paper}/${rt.section}/${rt.slug}`}
                    className="text-primary hover:underline"
                  >
                    Paper {rt.paper}: {rt.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      <p className="mt-8 text-sm text-text-muted">
        <Link href={`/paper-${topic.paper}/${topic.section}`} className="text-primary hover:underline">
          &larr; Back to {section?.title ?? "section"}
        </Link>
      </p>
    </div>
  );
}
