import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { paper1Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";

export const metadata = {
  title: "Paper 1",
  description:
    "Major themes of the Qur'an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic community.",
};

export default function Paper1Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">Paper 1</h1>
      <p className="mt-3 text-text-muted">
        Major themes of the Qur&apos;an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic
        community. 1½ hours, 50 marks — answer Question 1, Question 2 and two others.
      </p>

      <div className="mt-8 space-y-4">
        {paper1Sections.map((section) => {
          const topicCount = getTopicsForSection(1, section.slug).length;
          return (
            <Link
              key={section.slug}
              href={`/paper-1/${section.slug}`}
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
