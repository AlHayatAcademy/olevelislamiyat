import Link from "next/link";
import { ArrowRight, MessageSquareQuote } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { QuotesReferencesTabs } from "@/components/QuotesReferencesTabs";
import { referenceTypes, slugifyType, getReferencesByType } from "@/data/references";
import type { TileAccent } from "@/data/homepage-content";
import { tileAccentClasses } from "@/lib/tile-accent";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Quotes & References — Browse by Type",
  description: "Qur'an and Hadith references relevant to each syllabus topic, grouped by reference type.",
  ...canonical("/quotes-references/by-type"),
};

const accentRotation: TileAccent[] = ["green", "gold", "purple", "blue", "teal", "green"];

export default function QuotesReferencesByTypePage() {
  return (
    <PageShell
      title="Quotes & References"
      description="Qur'an and Hadith references relevant to each syllabus topic, grouped by reference type."
      breadcrumbs={[
        { label: "Quotes & References", href: "/quotes-references" },
        { label: "Browse by Type", href: "/quotes-references/by-type" },
      ]}
    >
      <QuotesReferencesTabs />

      <p>
        Appendix 1 of the syllabus lists 15 Qur&apos;an passages for special study (Allah in
        Himself, Allah&apos;s relationship with the created world, Allah&apos;s Messengers).
        Appendix 2 lists Hadiths for special study on individual conduct and community life.
      </p>
      <p className="text-sm text-text-muted">
        Explanations below are written in original wording. Qur&apos;an translations use the
        Sahih International rendering, and Hadith entries cite the exact collection and number
        (as listed on sunnah.com), with authenticity grading noted for any disputed tradition.
        See the &quot;Verification Pass&quot; section of the project&apos;s build notes for the
        full source list. Prefer to browse the entire syllabus outline instead? Use the
        &quot;Browse by Topic&quot; tab above.
      </p>

      <div className="mt-8 space-y-10">
        {referenceTypes.map((type, typeIndex) => {
          const items = getReferencesByType(type);
          if (items.length === 0) return null;
          const accent = tileAccentClasses[accentRotation[typeIndex % accentRotation.length]];
          return (
            <div key={type}>
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.badge}`}>
                  <MessageSquareQuote aria-hidden="true" size={18} />
                </span>
                <h2 className="text-xl font-semibold font-heading text-text">
                  {type} <span className="text-sm font-normal text-text-muted">({items.length})</span>
                </h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {items.map((ref) => (
                  <Link
                    key={ref.id}
                    href={`/quotes-references/${slugifyType(type)}/${ref.id}`}
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
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
