import Link from "next/link";
import {
  ChevronRight,
  BookOpen,
  ScrollText,
  Users,
  Landmark,
  Download,
  ClipboardList,
} from "lucide-react";
import { paper1Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { PaperTabs } from "@/components/PaperTabs";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { tileAccentClasses } from "@/lib/tile-accent";
import type { TileAccent } from "@/data/homepage-content";
import { getSubtopicIcon } from "@/lib/subtopic-icons";
import { canonical } from "@/lib/seo";

const sectionIcons = [BookOpen, ScrollText, Users, Landmark];
const accentRotation: TileAccent[] = ["green", "gold", "purple", "blue", "teal"];

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

const totalSubtopics = paper1Sections.reduce((n, s) => n + s.subtopics.length, 0);

export default function Paper1Page() {
  let accentIndex = 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs items={[{ label: "Paper 1", href: "/paper-1" }]} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">Paper 1</h1>
      <p className="mt-3 text-text-muted">
        Major themes of the Qur&apos;an, its history, the life of the Prophet Muhammad (pbuh), and the first Islamic
        community. 1½ hours, 50 marks — answer Question 1, Question 2 and two others. The full outline below covers
        all {totalSubtopics} subtopics across the 4 sections. See also{" "}
        <Link href="/past-papers" className="text-primary underline">
          Islamiyat past papers by topic
        </Link>{" "}
        and{" "}
        <Link href="/quotes-references" className="text-primary underline">
          Qur&apos;an quotes and references
        </Link>
        .
      </p>

      <div className="mt-6">
        <PaperTabs />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/syllabus" variant="outline" icon={Download} iconPosition="left">
          View Full Syllabus
        </Button>
        <Button href="/exam-pattern" variant="ghost" icon={ClipboardList} iconPosition="left">
          View Exam Pattern
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-bold text-text">
          Full Syllabus Outline
          <span className="ml-2 text-sm font-normal text-text-muted">
            ({totalSubtopics} subtopics across {paper1Sections.length} sections)
          </span>
        </h2>

        <div className="mt-6 space-y-10">
          {paper1Sections.map((section, sectionIdx) => {
            const SectionIcon = sectionIcons[sectionIdx % sectionIcons.length];
            const topicCount = getTopicsForSection(1, section.slug).length;

            return (
              <div key={section.slug} id={section.slug}>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <SectionIcon aria-hidden="true" size={22} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                        Section {section.number} &middot; {section.marks} marks
                      </p>
                      <h3 className="text-xl font-semibold font-heading text-text">{section.title}</h3>
                    </div>
                  </div>
                  <Link
                    href={`/paper-1/${section.slug}`}
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-2"
                  >
                    Section hub
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-2 text-sm text-text-muted">{section.description}</p>
                <p className="mt-1 text-xs text-text-muted">
                  {section.subtopics.length} subtopic{section.subtopics.length === 1 ? "" : "s"} &middot;{" "}
                  {topicCount > 0
                    ? `${topicCount} lesson${topicCount === 1 ? "" : "s"} available`
                    : "Lessons coming soon"}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {section.subtopics.map((subtopic) => {
                    const Icon = getSubtopicIcon(1, section.slug, subtopic.slug);
                    const accent = tileAccentClasses[accentRotation[accentIndex % accentRotation.length]];
                    accentIndex += 1;

                    return (
                      <Link
                        key={subtopic.slug}
                        href={`/paper-1/${section.slug}/${subtopic.slug}`}
                        className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.badge} ${accent.badgeHover}`}
                        >
                          <Icon aria-hidden="true" size={16} />
                        </span>
                        <span className="min-w-0 flex-1 truncate font-medium text-text">
                          {subtopic.title}
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
          })}
        </div>
      </section>

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
