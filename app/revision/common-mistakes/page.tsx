import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allTopics } from "@/data/topics";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Common Mistakes",
  description: "Every common-mistake warning from the Paper 1 and Paper 2 lessons, compiled on one page.",
  ...canonical("/revision/common-mistakes"),
};

function sectionTitle(paper: 1 | 2, sectionSlug: string): string {
  const sections = paper === 1 ? paper1Sections : paper2Sections;
  return sections.find((s) => s.slug === sectionSlug)?.title ?? sectionSlug;
}

export default function CommonMistakesPage() {
  const paper1Topics = allTopics.filter((t) => t.paper === 1 && t.commonMistakes.length > 0);
  const paper2Topics = allTopics.filter((t) => t.paper === 2 && t.commonMistakes.length > 0);
  const totalMistakes = allTopics.reduce((sum, t) => sum + t.commonMistakes.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Revision", href: "/revision" },
          { label: "Common Mistakes", href: "/revision/common-mistakes" },
        ]}
      />

      <div className="mt-4 flex items-center gap-2">
        <AlertTriangle size={24} className="text-warning" aria-hidden="true" />
        <h1 className="text-3xl font-bold font-heading text-text">Common Mistakes</h1>
      </div>
      <p className="mt-3 text-text-muted">
        {totalMistakes} mistakes examiners commonly flag, gathered from every lesson&apos;s &ldquo;common
        mistakes&rdquo; notes so you can check your own understanding against them before the exam.
      </p>

      {[
        { label: "Paper 1", list: paper1Topics },
        { label: "Paper 2", list: paper2Topics },
      ].map(({ label, list }) => (
        <section key={label} className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-text">{label}</h2>
          <div className="mt-4 space-y-4">
            {list.map((topic) => (
              <div key={`${topic.section}-${topic.slug}`} className="rounded-xl border border-border bg-surface p-5">
                <Link
                  href={`/paper-${topic.paper}/${topic.section}/${topic.slug}`}
                  className="font-heading font-semibold text-text hover:text-primary hover:underline"
                >
                  {topic.title}
                </Link>
                <p className="text-xs text-text-muted">{sectionTitle(topic.paper, topic.section)}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-muted">
                  {topic.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
