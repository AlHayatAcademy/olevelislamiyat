import Link from "next/link";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { allTopics } from "@/data/topics";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Key Dates",
  description: "Every date and timeline detail from the Paper 1 and Paper 2 lessons, gathered for quick revision.",
  ...canonical("/revision/key-dates"),
};

const DATE_PATTERN = /\d{1,4}\s?(AH|CE|BCE)\b/i;
const DATE_LABEL_PATTERN = /year|reign|date|century|when/i;

interface DateEntry {
  paper: 1 | 2;
  topicSlug: string;
  section: string;
  topicTitle: string;
  label: string;
  detail: string;
}

function collectDateEntries(): DateEntry[] {
  const entries: DateEntry[] = [];
  for (const topic of allTopics) {
    for (const fact of topic.keyFacts) {
      if (DATE_PATTERN.test(fact.detail) || DATE_LABEL_PATTERN.test(fact.label)) {
        entries.push({
          paper: topic.paper,
          topicSlug: topic.slug,
          section: topic.section,
          topicTitle: topic.title,
          label: fact.label,
          detail: fact.detail,
        });
      }
    }
  }
  return entries;
}

export default function KeyDatesPage() {
  const entries = collectDateEntries();
  const paper1Entries = entries.filter((e) => e.paper === 1);
  const paper2Entries = entries.filter((e) => e.paper === 2);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/revision"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Revision Centre
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <CalendarClock size={24} className="text-secondary" aria-hidden="true" />
        <h1 className="text-3xl font-bold font-heading text-text">Key Dates</h1>
      </div>
      <p className="mt-3 text-text-muted">
        Every dated fact stated in the lessons — years, reigns and timeline milestones — compiled onto one page.
        Nothing here is invented: each entry is drawn directly from that lesson&apos;s key facts, with a link back
        to the full lesson.
      </p>

      {[
        { label: "Paper 1", list: paper1Entries },
        { label: "Paper 2", list: paper2Entries },
      ].map(({ label, list }) => (
        <section key={label} className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-text">{label}</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-soft text-left">
                  <th scope="col" className="px-4 py-3 font-heading font-semibold text-text">
                    Lesson
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading font-semibold text-text">
                    Fact
                  </th>
                  <th scope="col" className="px-4 py-3 font-heading font-semibold text-text">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((entry, i) => (
                  <tr key={`${entry.topicSlug}-${i}`} className="border-b border-border last:border-0 odd:bg-surface even:bg-surface-soft/40">
                    <td className="px-4 py-3 align-top">
                      <Link
                        href={`/paper-${entry.paper}/${entry.section}/${entry.topicSlug}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {entry.topicTitle}
                      </Link>
                    </td>
                    <td className="px-4 py-3 align-top text-text">{entry.label}</td>
                    <td className="px-4 py-3 align-top text-text-muted">{entry.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
