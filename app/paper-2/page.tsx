import Link from "next/link";
import {
  ChevronRight,
  MessageSquareQuote,
  ScrollText,
  Crown,
  ListChecks,
  Download,
  ClipboardList,
} from "lucide-react";
import { paper2Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { PaperTabs } from "@/components/PaperTabs";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { tileAccentClasses } from "@/lib/tile-accent";
import type { TileAccent } from "@/data/homepage-content";
import { getSubtopicIcon } from "@/lib/subtopic-icons";
import { canonical, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

const sectionIcons = [MessageSquareQuote, ScrollText, Crown, ListChecks];
const accentRotation: TileAccent[] = ["green", "gold", "purple", "blue", "teal", "coral", "amber", "rose"];

export const metadata = {
  title: "Islamiyat Paper 2 Notes (Hadith & Caliphs)",
  description:
    "Islamiyat 2058 / 0493 Paper 2 notes: Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith & Pillars of Islam.",
  ...canonical("/paper-2"),
};

const faqs = [
  {
    q: "How do I compare Abu Bakr, Umar, Uthman and Ali as leaders?",
    a: "The Rightly Guided Caliphs section covers the leadership, achievements and character of each of the four caliphs individually, giving the material needed to build a comparison for exam questions.",
  },
  {
    q: "What is the difference between isnad and matn?",
    a: "Isnad is the chain of narrators through which a Hadith was transmitted; matn is the actual text/content of the Hadith. Both are explained in the History and Importance of the Hadiths section.",
  },
  {
    q: "What are the six authentic books of Hadith?",
    a: "The Sihah Sittah (six authentic books) are covered in the History and Importance of the Hadiths section, alongside the stages of compilation from the Companions to the Tabi'un.",
  },
];


const totalSubtopics = paper2Sections.reduce((n, s) => n + s.subtopics.length, 0);

export default function Paper2Page() {
  let accentIndex = 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ label: "Paper 2", href: "/paper-2" }]} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">Paper 2</h1>
      <p className="mt-3 text-text-muted">
        Hadith teachings, their history, the Rightly Guided Caliphs, and the Articles of Faith &amp; Pillars of
        Islam. 1½ hours, 50 marks — answer Question 1, Question 2 and two others. The full outline below covers all{" "}
        {totalSubtopics} subtopics across the 4 sections. See also{" "}
        <Link href="/past-papers" className="text-primary underline">
          Islamiyat past papers by topic
        </Link>{" "}
        and{" "}
        <Link href="/quotes-references" className="text-primary underline">
          Hadith quotes and references
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
            ({totalSubtopics} subtopics across {paper2Sections.length} sections)
          </span>
        </h2>

        <div className="mt-6 space-y-10">
          {paper2Sections.map((section, sectionIdx) => {
            const SectionIcon = sectionIcons[sectionIdx % sectionIcons.length];
            const topicCount = getTopicsForSection(2, section.slug).length;

            return (
              <div key={section.slug} id={section.slug}>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tile-blue/15 text-tile-blue ring-1 ring-inset ring-tile-blue/20">
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
                    href={`/paper-2/${section.slug}`}
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
                    const Icon = getSubtopicIcon(2, section.slug, subtopic.slug);
                    const accent = tileAccentClasses[accentRotation[accentIndex % accentRotation.length]];
                    accentIndex += 1;

                    return (
                      <Link
                        key={subtopic.slug}
                        href={`/paper-2/${section.slug}/${subtopic.slug}`}
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
