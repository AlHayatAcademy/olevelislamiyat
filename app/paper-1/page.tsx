import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { paper1Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Islamiyat Paper 1 Notes (Qur'an & Seerah)",
  description:
    "Islamiyat 2058 / 0493 Paper 1 notes: major themes of the Qur'an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic community.",
  ...canonical("/paper-1"),
};

const faqs = [
  {
    q: "What are the major themes of the Qur'an in Islamiyat?",
    a: "The syllabus groups fifteen designated Qur'an passages under three themes: God in Himself, God's relationship with the created world, and God's relationship with His Messengers.",
  },
  {
    q: "Who compiled the Qur'an under Abu Bakr and Uthman?",
    a: "The Qur'an was first compiled into a single manuscript under Caliph Abu Bakr, and later standardised into the form used today under Caliph Uthman. See the History and Importance of the Qur'an section below for the full lesson.",
  },
  {
    q: "What happened in the first revelation?",
    a: "The first revelation is covered in the History and Importance of the Qur'an section, and again in the context of the start of the Prophet's (pbuh) mission in Life and Importance of Prophet Muhammad (pbuh).",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Paper1Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-3xl font-bold font-heading text-text">Paper 1</h1>
      <p className="mt-3 text-text-muted">
        Major themes of the Qur&apos;an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic
        community. 1½ hours, 50 marks — answer Question 1, Question 2 and two others. See also{" "}
        <Link href="/past-papers" className="text-primary underline">
          Islamiyat past papers by topic
        </Link>{" "}
        and{" "}
        <Link href="/quotes-references" className="text-primary underline">
          Qur&apos;an quotes and references
        </Link>
        .
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

      <section className="mt-12">
        <h2 className="text-xl font-heading font-bold text-primary">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-heading font-semibold text-text">{f.q}</h3>
              <p className="mt-2 text-sm text-text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
