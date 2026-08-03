import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { paper2Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";

export const metadata = {
  title: "Paper 2",
  description:
    "Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
};

export default function Paper2Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">Paper 2</h1>
      <p className="mt-3 text-text-muted">
        Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith &amp; Pillars of
        Islam. 1½ hours, 50 marks — answer Question 1, Question 2 and two others.
      </p>

      <div className="mt-8 space-y-4">
        {paper2Sections.map((section) => {
          const topicCount = getTopicsForSection(2, section.slug).length;
          return (
            <Link
              key={section.slug}
              href={`/paper-2/${section.slug}`}
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-surface-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                    Section {section.number} &middot; {section.marks} marks
                  </p>
                  <h2 className="mt-1 text-xl font-semibold font-heading text-text">{section.title}</h2>
                  <p className="mt-2 text-sm text-text-muted">{section.description}</p>
                  <p className="mt-2 text-xs text-text-muted">
                    {topicCount > 0
                      ? `${topicCount} lesson${topicCount === 1 ? "" : "s"} available`
                      : "Lessons coming soon"}
                  </p>
                </div>
                <ChevronRight size={20} className="shrink-0 text-primary" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
