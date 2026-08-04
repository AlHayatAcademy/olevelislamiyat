import Link from "next/link";
import {
  BookOpen,
  FileText,
  MessageCircle,
  Layers,
  ListChecks,
  Hash,
  ArrowRight,
  ScrollText,
  History,
  User,
  Users,
  MessageSquareQuote,
  BookMarked,
  Crown,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GeometricPattern } from "@/components/GeometricPattern";
import { paper1Sections, paper2Sections, type SyllabusSection } from "@/data/syllabus";
import { pastPaperQuestions, getQuestionsBySection } from "@/data/questions";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Topical Islamiyat Past Papers by Syllabus Section",
  description:
    "Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493 past-paper questions, organised topic-by-topic across all eight Paper 1 and Paper 2 syllabus sections.",
  ...canonical("/past-papers/topical"),
};

// Icon assigned per real syllabus section (data/syllabus.ts) — purely
// decorative labelling, not a data source.
const sectionIcons: Record<string, LucideIcon> = {
  "major-themes-of-the-quran": BookOpen,
  "history-of-the-quran": History,
  "life-of-prophet-muhammad": User,
  "first-islamic-community": Users,
  "major-teachings-of-hadith": MessageSquareQuote,
  "history-of-hadith": ScrollText,
  "rightly-guided-caliphs": Crown,
  "articles-of-faith-and-pillars": Landmark,
};

const totalSections = paper1Sections.length + paper2Sections.length;
const totalSubtopics = [...paper1Sections, ...paper2Sections].reduce(
  (sum, s) => sum + s.subtopics.length,
  0,
);

const stats = [
  { value: "2", label: "Exam Papers" },
  { value: String(totalSections), label: "Syllabus Sections" },
  { value: String(totalSubtopics), label: "Topical Practice Areas" },
  {
    value: `${siteConfig.qualifications.oLevel.code} / ${siteConfig.qualifications.igcse.code}`,
    label: "Cambridge Codes",
  },
];

const shortcuts = [
  { label: "Paper 1 Guide", href: "/paper-1" },
  { label: "Paper 2 Guide", href: "/paper-2" },
  { label: "Paper 1 Topical Papers", href: "#paper-1-topical" },
  { label: "Paper 2 Topical Papers", href: "#paper-2-topical" },
];

function SectionCard({ section }: { section: SyllabusSection }) {
  const Icon = sectionIcons[section.slug] ?? BookMarked;
  const questionCount = getQuestionsBySection(section.slug).length;

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon aria-hidden="true" size={22} />
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold text-text">{section.title}</h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{section.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-primary">
          Paper {section.paper}
        </span>
        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-muted">
          {section.marks} marks
        </span>
        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-text-muted">
          {questionCount} question{questionCount === 1 ? "" : "s"}
        </span>
      </div>

      <Link
        href={`/past-papers/topical/${section.slug}`}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-heading font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-card"
      >
        Open {section.title} Questions
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </div>
  );
}

export default function TopicalPastPapersLandingPage() {
  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark text-white">
        <GeometricPattern
          id="topical-hero-pattern"
          tone="dark"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center lg:py-24">
          <span className="inline-flex rounded-full border border-accent/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            Topical Past Papers &amp; Repeated Questions
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-bold sm:text-5xl">
            O Level Islamiyat {siteConfig.qualifications.oLevel.code} Topical Past Papers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Instead of working through one exam session at a time, this hub regroups every
            documented past-paper question by syllabus section and subtopic, so you can see every
            way a topic such as the Farewell Sermon or the Pillars of Islam has been examined
            before moving on to the next.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/past-papers/topical/major-themes-of-the-quran" variant="gold" size="lg" icon={BookOpen} iconPosition="right">
              Explore Paper 1 Past Papers
            </Button>
            <Button
              href="/past-papers/topical/major-teachings-of-hadith"
              variant="outline"
              size="lg"
              icon={FileText}
              iconPosition="right"
              className="border-white text-white hover:bg-white hover:text-primary focus-visible:ring-white"
            >
              Explore Paper 2 Past Papers
            </Button>
            <Button
              href={siteConfig.contact.whatsapp}
              external
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              iconPosition="right"
            >
              Ask About Online Classes
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <Breadcrumbs
          items={[
            { label: "Past Papers", href: "/past-papers" },
            { label: "Topical", href: "/past-papers/topical" },
          ]}
        />
        {/* How to use card */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <h2 className="font-heading text-2xl font-bold text-text">
            How to Use These Islamiyat Past Papers
          </h2>
          <p className="mt-3 text-text-muted">
            Pick the paper you are revising, then open the syllabus section that matches your
            current topic. Each section page lists its subtopics with a live question count next
            to each one — open a subtopic to read every documented past-paper question on it,
            rewritten in original wording rather than copied verbatim from the official paper.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-surface-soft px-4 py-5 text-center"
              >
                <p className="font-heading text-2xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {shortcuts.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-surface-soft"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Paper 1 */}
        <section id="paper-1-topical" className="mt-14 scroll-mt-24">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
            <Layers aria-hidden="true" size={16} />
            Paper 1
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
            O Level Islamiyat Paper 1 Topical Past Papers
          </h2>
          <p className="mt-3 max-w-3xl text-text-muted">
            Paper 1 covers the Qur&apos;an and the Seerah of Prophet Muhammad (pbuh): its major
            themes, its history and compilation, the Prophet&apos;s (pbuh) life, and the first
            Islamic community. Open a section below to browse its documented past-paper questions
            by subtopic.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {paper1Sections.map((section) => (
              <SectionCard key={section.slug} section={section} />
            ))}
          </div>
        </section>

        {/* Paper 2 */}
        <section id="paper-2-topical" className="mt-14 scroll-mt-24">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary">
            <ListChecks aria-hidden="true" size={16} />
            Paper 2
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-text sm:text-3xl">
            O Level Islamiyat Paper 2 Topical Past Papers
          </h2>
          <p className="mt-3 max-w-3xl text-text-muted">
            Paper 2 covers the Hadiths of the Prophet (pbuh), the Rightly Guided Caliphs, and the
            Articles of Faith and Pillars of Islam. Open a section below to browse its documented
            past-paper questions by subtopic.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {paper2Sections.map((section) => (
              <SectionCard key={section.slug} section={section} />
            ))}
          </div>
        </section>

        <p className="mt-12 flex items-center gap-2 text-sm text-text-muted">
          <Hash aria-hidden="true" size={14} />
          {pastPaperQuestions.length} questions documented across both papers so far.{" "}
          <Link href="/past-papers" className="text-primary hover:underline">
            See past papers by year instead &rarr;
          </Link>
        </p>
      </div>
    </>
  );
}
