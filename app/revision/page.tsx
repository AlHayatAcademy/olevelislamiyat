import Link from "next/link";
import {
  BookOpenText,
  CalendarClock,
  Users,
  Target,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { quizzes } from "@/data/quizzes";
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
}

const hubLinks: HubLink[] = [
  {
    href: "/paper-1",
    title: "Paper 1 Revision Notes",
    description:
      "The Qur'an's major themes, its history and compilation, the life of the Prophet Muhammad (pbuh), and the first Islamic community — organised by syllabus section.",
    icon: BookOpenText,
  },
  {
    href: "/paper-2",
    title: "Paper 2 Revision Notes",
    description:
      "The history of Hadith, the Rightly Guided Caliphs, major Hadith teachings, and the Articles of Faith and Pillars of Islam — organised by syllabus section.",
    icon: BookOpenText,
  },
  {
    href: "/revision/key-dates",
    title: "Key Dates",
    description: "Every date and timeline detail stated across the lessons, gathered onto one page for quick recall.",
    icon: CalendarClock,
  },
  {
    href: "/revision/key-personalities",
    title: "Key Personalities",
    description:
      "The Prophets, Companions, caliphs and other figures covered across the syllabus, with what each is examinable for.",
    icon: Users,
  },
  {
    href: "/revision/exam-technique",
    title: "AO1/AO2 Exam Technique Guide",
    description: "What the AO1 and AO2 command words actually expect, and how to structure answers that score on both.",
    icon: Target,
  },
  {
    href: "/revision/common-mistakes",
    title: "Common Mistakes",
    description: "Every common-mistake warning from across the lessons, collected in one browsable page.",
    icon: AlertTriangle,
  },
];

export default function RevisionPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">Revision Centre</h1>
      <p className="mt-3 text-text-muted">
        Everything you need for focused, final revision: full notes for both papers, compiled key dates and
        personalities, exam-technique guidance, and a single page of the mistakes examiners most often flag.
      </p>
      <p className="mt-2 text-sm text-text-muted">
        Prefer to test yourself directly?{" "}
        <Link href="/quizzes" className="font-medium text-primary hover:underline">
          Try one of the {quizzes.length} self-check quizzes
        </Link>
        .
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {hubLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center justify-between">
                <Icon size={22} className="text-secondary" aria-hidden="true" />
                <ChevronRight size={18} className="text-primary" aria-hidden="true" />
              </div>
              <h2 className="mt-3 text-lg font-semibold font-heading text-text">{link.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{link.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
