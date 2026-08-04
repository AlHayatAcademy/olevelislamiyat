import Link from "next/link";
import { Users } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allTopics } from "@/data/topics";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Key Personalities",
  description: "The Companions, caliphs and Prophets covered across the syllabus, compiled for revision.",
  ...canonical("/revision/key-personalities"),
};

const PERSONALITY_SECTIONS = new Set(["rightly-guided-caliphs", "first-islamic-community"]);
const PERSONALITY_THEME_SLUGS = new Set(["adam-al-baqarah-2-30-37", "isa-al-maidah-5-110", "muhammad-al-duha-93"]);

function isPersonalityTopic(section: string, slug: string): boolean {
  return PERSONALITY_SECTIONS.has(section) || PERSONALITY_THEME_SLUGS.has(slug);
}

export default function KeyPersonalitiesPage() {
  const personalities = allTopics.filter((t) => isPersonalityTopic(t.section, t.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Revision", href: "/revision" },
          { label: "Key Personalities", href: "/revision/key-personalities" },
        ]}
      />

      <div className="mt-4 flex items-center gap-2">
        <Users size={24} className="text-secondary" aria-hidden="true" />
        <h1 className="text-3xl font-bold font-heading text-text">Key Personalities</h1>
      </div>
      <p className="mt-3 text-text-muted">
        The Companions, Rightly Guided Caliphs and Prophets covered by the syllabus, with the facts each lesson
        highlights as most examinable. Click through to any lesson for the full picture.
      </p>

      <div className="mt-8 space-y-5">
        {personalities.map((topic) => (
          <div key={`${topic.paper}-${topic.section}-${topic.slug}`} className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Paper {topic.paper}
            </p>
            <Link
              href={`/paper-${topic.paper}/${topic.section}/${topic.slug}`}
              className="mt-1 block text-lg font-semibold font-heading text-text hover:text-primary hover:underline"
            >
              {topic.title}
            </Link>
            <p className="mt-2 text-sm text-text-muted">{topic.standing}</p>
            {topic.keyFacts.length > 0 && (
              <dl className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {topic.keyFacts.slice(0, 6).map((fact) => (
                  <div key={fact.label} className="text-sm">
                    <dt className="inline font-semibold text-text">{fact.label}: </dt>
                    <dd className="inline text-text-muted">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
