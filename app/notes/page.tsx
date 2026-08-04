import Link from "next/link";
import { BookOpen } from "lucide-react";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Notes",
  description:
    "Section-by-section revision notes for Cambridge O Level Islamiyat 2058 / IGCSE 0493 Paper 1 and Paper 2, drawn from the full lesson library.",
  ...canonical("/notes"),
};

function PaperBlock({ paper, sections }: { paper: 1 | 2; sections: typeof paper1Sections }) {
  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-primary">Paper {paper}</h2>
      <div className="mt-4 space-y-3">
        {sections.map((section) => {
          const topics = getTopicsForSection(paper, section.slug);
          return (
            <div key={section.slug} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                    Section {section.number} &middot; {section.marks} marks
                  </p>
                  <h3 className="mt-1 font-heading font-semibold text-text">{section.title}</h3>
                </div>
                <Link
                  href={`/paper-${paper}/${section.slug}`}
                  className="shrink-0 text-sm font-semibold text-primary underline underline-offset-2"
                >
                  {topics.length > 0 ? "Open notes" : "View section"}
                </Link>
              </div>
              {topics.length > 0 ? (
                <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm text-text-muted sm:grid-cols-2">
                  {topics.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/paper-${paper}/${section.slug}/${t.slug}`}
                        className="hover:text-primary hover:underline"
                      >
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-text-muted">Lessons coming soon.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-3">
        <BookOpen aria-hidden="true" className="text-secondary" size={28} />
        <h1 className="text-3xl font-bold font-heading text-text">Notes</h1>
      </div>
      <p className="mt-3 text-text-muted">
        Full, hand-written revision notes for every section of the Cambridge O Level Islamiyat
        (2058) / IGCSE Islamiyat (0493) syllabus, organised exactly as the syllabus is structured.
        Each lesson links through to the complete Paper 1 or Paper 2 topic page.
      </p>

      <div className="mt-10 space-y-12">
        <PaperBlock paper={1} sections={paper1Sections} />
        <PaperBlock paper={2} sections={paper2Sections} />
      </div>
    </div>
  );
}
