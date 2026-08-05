import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { paper1Sections, paper2Sections, type SyllabusSection } from "@/data/syllabus";
import { getTopic } from "@/data/topics";
import { slugifyType } from "@/data/references";
import { getReferencesForSubtopic, iconForSubtopic } from "@/lib/quotes-references-topics";
import { canonical } from "@/lib/seo";

interface PageProps {
  params: Promise<{ section: string; subtopic: string }>;
}

const allSections: SyllabusSection[] = [...paper1Sections, ...paper2Sections];

function findSection(sectionSlug: string) {
  return allSections.find((s) => s.slug === sectionSlug);
}

export function generateStaticParams() {
  return allSections.flatMap((s) => s.subtopics.map((sub) => ({ section: s.slug, subtopic: sub.slug })));
}

export async function generateMetadata({ params }: PageProps) {
  const { section: sectionSlug, subtopic: subtopicSlug } = await params;
  const section = findSection(sectionSlug);
  const subtopic = section?.subtopics.find((s) => s.slug === subtopicSlug);
  if (!section || !subtopic) return {};
  return {
    title: `${subtopic.title} — Quotes & References`,
    description: `Qur'an and Hadith references relevant to "${subtopic.title}" (Paper ${section.paper} · ${section.title}).`,
    ...canonical(`/quotes-references/topic/${sectionSlug}/${subtopicSlug}`),
  };
}

export default async function QuotesReferencesTopicPage({ params }: PageProps) {
  const { section: sectionSlug, subtopic: subtopicSlug } = await params;
  const section = findSection(sectionSlug);
  const subtopic = section?.subtopics.find((s) => s.slug === subtopicSlug);
  if (!section || !subtopic) notFound();

  const items = getReferencesForSubtopic(subtopicSlug);
  const lesson = getTopic(section.paper, section.slug, subtopicSlug);
  const Icon = iconForSubtopic(subtopicSlug, subtopic.title);

  return (
    <PageShell
      title={subtopic.title}
      description={`Paper ${section.paper} · ${section.title}`}
      breadcrumbs={[
        { label: "Quotes & References", href: "/quotes-references" },
        { label: section.title, href: `/quotes-references#${section.slug}` },
        { label: subtopic.title, href: `/quotes-references/topic/${sectionSlug}/${subtopicSlug}` },
      ]}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon aria-hidden="true" size={20} />
        </span>
        <p className="text-sm text-text-muted">
          {items.length} reference{items.length === 1 ? "" : "s"} currently tagged to this topic.
        </p>
      </div>

      {items.length > 0 ? (
        <ul className="mt-2 grid gap-3 sm:grid-cols-2">
          {items.map((ref) => (
            <li key={ref.id}>
              <Link
                href={`/quotes-references/${slugifyType(ref.type)}/${ref.id}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
              >
                <span>
                  <p className="font-medium text-text">{ref.title}</p>
                  <p className="mt-1 text-sm text-text-muted">{ref.citation}</p>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 flex items-start gap-3 rounded-lg border border-dashed border-border bg-surface-soft p-4">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
          <p className="text-sm text-text-muted">
            Quotes and references for this topic will be added soon.
            {lesson && (
              <>
                {" "}
                In the meantime, see the full lesson:{" "}
                <Link href={`/paper-${section.paper}/${section.slug}/${subtopicSlug}`} className="text-primary underline">
                  Paper {section.paper} · {subtopic.title}
                </Link>
                .
              </>
            )}
          </p>
        </div>
      )}

      <p className="text-sm mt-6">
        <Link href={`/paper-${section.paper}/${section.slug}`} className="text-primary underline">
          ← Back to {section.title}
        </Link>
      </p>
    </PageShell>
  );
}
