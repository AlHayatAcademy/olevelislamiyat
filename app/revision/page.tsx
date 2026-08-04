import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarClock, Users, Target, AlertTriangle, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { quizzes } from "@/data/quizzes";
import type { TileAccent } from "@/data/homepage-content";
import { tileAccentClasses } from "@/lib/tile-accent";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Revision",
  description: "The Revision Centre: revision notes, key dates, key personalities, exam technique and common mistakes.",
  ...canonical("/revision"),
};

interface HubLink {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: TileAccent;
}

const hubLinks: HubLink[] = [
  {
    href: "/paper-1",
    title: "Paper 1 Revision Notes",
    description:
      "The Qur'an's major themes, its history and compilation, the life of the Prophet Muhammad (pbuh), and the first Islamic community — organised by syllabus section.",
    icon: BookOpenText,
    accent: "green",
  },
  {
    href: "/paper-2",
    title: "Paper 2 Revision Notes",
    description:
      "The history of Hadith, the Rightly Guided Caliphs, major Hadith teachings, and the Articles of Faith and Pillars of Islam — organised by syllabus section.",
    icon: BookOpenText,
    accent: "blue",
  },
  {
    href: "/revision/key-dates",
    title: "Key Dates",
    description: "Every date and timeline detail stated across the lessons, gathered onto one page for quick recall.",
    icon: CalendarClock,
    accent: "gold",
  },
  {
    href: "/revision/key-personalities",
    title: "Key Personalities",
    description:
      "The Prophets, Companions, caliphs and other figures covered across the syllabus, with what each is examinable for.",
    icon: Users,
    accent: "purple",
  },
  {
    href: "/revision/exam-technique",
    title: "AO1/AO2 Exam Technique Guide",
    description: "What the AO1 and AO2 command words actually expect, and how to structure answers that score on both.",
    icon: Target,
    accent: "teal",
  },
  {
    href: "/revision/common-mistakes",
    title: "Common Mistakes",
    description: "Every common-mistake warning from across the lessons, collected in one browsable page.",
    icon: AlertTriangle,
    accent: "gold",
  },
];

export default function RevisionPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Revision", href: "/revision" }]} />
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tile-green/10 text-tile-green">
          <GraduationCap aria-hidden="true" size={22} />
        </span>
        <h1 className="text-3xl font-bold font-heading text-text">Revision Centre</h1>
      </div>
      <p className="mt-3 text-text-muted">
        Everything you need for focused, final revision: full notes for both papers, compiled key dates and
        personalities, exam-technique guidance, and a single page of the mistakes examiners most often flag.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-soft p-4">
        <p className="text-sm text-text-muted">
          Prefer to test yourself directly? Try one of the {quizzes.length} self-check quizzes.
        </p>
        <Button href="/quizzes" variant="success" size="sm" icon={ArrowRight} iconPosition="right">
          Go to Quizzes
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {hubLinks.map((link) => {
          const Icon = link.icon;
          const accent = tileAccentClasses[link.accent];
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110 ${accent.badge} ${accent.badgeHover}`}
                >
                  <Icon aria-hidden="true" size={22} />
                </span>
                <ArrowRight
                  size={18}
                  className="text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold font-heading text-text">{link.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{link.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
