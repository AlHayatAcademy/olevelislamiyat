import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { referenceTypes, slugifyType, getReferencesByType } from "@/data/references";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Quotes & References",
  description: "Qur&apos;an and Hadith references relevant to each syllabus topic.",
  ...canonical("/quotes-references"),
};

export default function QuotesReferencesPage() {
  return (
    <PageShell
      title="Quotes & References"
      description="Qur'an and Hadith references relevant to each syllabus topic."
    >
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
        full source list.
      </p>

      <div className="mt-8 space-y-8">
        {referenceTypes.map((type) => {
          const items = getReferencesByType(type);
          if (items.length === 0) return null;
          return (
            <div key={type}>
              <h2 className="text-xl font-semibold mb-3">
                {type} <span className="text-sm text-text-muted">({items.length})</span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((ref) => (
                  <Link
                    key={ref.id}
                    href={`/quotes-references/${slugifyType(type)}/${ref.id}`}
                    className="block rounded-md border border-surface-soft px-4 py-3 hover:border-primary transition-colors"
                  >
                    <p className="font-medium">{ref.title}</p>
                    <p className="text-sm text-text-muted mt-1">{ref.citation}</p>
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
