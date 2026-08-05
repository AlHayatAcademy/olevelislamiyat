import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { QuotesReferencesTabs } from "@/components/QuotesReferencesTabs";
import { paper1Sections, paper2Sections, type SyllabusSection } from "@/data/syllabus";
import type { TileAccent } from "@/data/homepage-content";
import { tileAccentClasses } from "@/lib/tile-accent";
import { getReferencesForSubtopic, iconForSubtopic } from "@/lib/quotes-references-topics";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Quotes & References — Full Syllabus Outline",
  description:
    "Every Paper 1 and Paper 2 section and subtopic of Cambridge O Level Islamiyat 2058, with a dedicated quotes-and-references button for each.",
  ...canonical("/quotes-references"),
};

const accentRotation: TileAccent[] = ["green", "gold", "purple", "blue", "teal", "coral", "amber", "rose"];

function SectionBlock({ section, accentIndex }: { section: SyllabusSection; accentIndex: number }) {
  const accent = tileAccentClasses[accentRotation[accentIndex % accentRotation.length]];

  return (
    <div id={section.slug}>
      <h3 className="text-lg font-semibold font-heading text-text">
        {section.number}. {section.title}{" "}
        <span className="text-sm font-normal text-text-muted">({section.marks} marks)</span>
      </h3>
      <p className="mt-1 text-sm text-text-muted">{section.description}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {section.subtopics.map((subtopic) => {
          const items = getReferencesForSubtopic(subtopic.slug);
          const Icon = iconForSubtopic(subtopic.slug, subtopic.title);
          const count = items.length;

          return (
            <Link
              key={subtopic.slug}
              href={`/quotes-references/topic/${section.slug}/${subtopic.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.badge} ${accent.badgeHover}`}
              >
                <Icon aria-hidden="true" size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-text">{subtopic.title}</span>
                <span className={`block text-xs ${count > 0 ? "text-text-muted" : "text-text-muted/70"}`}>
                  {count} reference{count === 1 ? "" : "s"}
                  {count === 0 && " · coming soon"}
                </span>
              </span>
              <ChevronRight
                size={16}
                className="shrink-0 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function QuotesReferencesPage() {
  return (
    <PageShell
      title="Quotes & References"
      description="Browse the full syllabus outline — every Paper 1 and Paper 2 section and subtopic — to find the Qur'an and Hadith references relevant to it."
      breadcrumbs={[{ label: "Quotes & References", href: "/quotes-references" }]}
    >
      <QuotesReferencesTabs />

      <p>
        Appendix 1 of the syllabus lists 15 Qur&apos;an passages for special study (Allah in
        Himself, Allah&apos;s relationship with the created world, Allah&apos;s Messengers).
        Appendix 2 lists Hadiths for special study on individual conduct and community life. Every
        button below leads to a real destination: topics with a matching entry show it directly,
        and topics without one yet are labelled &quot;coming soon&quot; with a link to the full
        lesson instead of a broken page.
      </p>
      <p className="text-sm text-text-muted">
        Prefer the flat list grouped by reference type (Qur&apos;anic, Hadith, Historical/Seerah,
        Companions &amp; Caliphs, Articles of Faith, Pillars of Islam) instead? Use the &quot;Browse
        by Type&quot; tab above.
      </p>

      <div className="mt-8 space-y-12">
        <section aria-labelledby="paper-1-heading">
          <h2 id="paper-1-heading" className="text-2xl font-bold font-heading text-text">
            Paper 1 — The Qur&apos;an and Life of the Prophet (pbuh)
          </h2>
          <div className="mt-6 space-y-8">
            {paper1Sections.map((section, i) => (
              <SectionBlock key={section.slug} section={section} accentIndex={i} />
            ))}
          </div>
        </section>

        <section aria-labelledby="paper-2-heading">
          <h2 id="paper-2-heading" className="text-2xl font-bold font-heading text-text">
            Paper 2 — Hadith, the Rightly Guided Caliphs, and Faith &amp; Practice
          </h2>
          <div className="mt-6 space-y-8">
            {paper2Sections.map((section, i) => (
              <SectionBlock key={section.slug} section={section} accentIndex={paper1Sections.length + i} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
