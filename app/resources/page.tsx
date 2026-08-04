import Link from "next/link";
import {
  BookOpen,
  Map,
  Layers,
  Video,
  Lightbulb,
  Download,
  CalendarCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/Button";
import { GeometricPattern } from "@/components/GeometricPattern";
import type { TileAccent } from "@/data/homepage-content";
import { tileAccentClasses } from "@/lib/tile-accent";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Resources",
  description:
    "The full study resource hub for Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493 — notes, revision plans, video lessons and more.",
  ...canonical("/resources"),
};

interface ResourceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  status: "available" | "soon";
  href?: string;
  external?: boolean;
  accent: TileAccent;
}

const cards: ResourceCard[] = [
  {
    icon: BookOpen,
    title: "Notes",
    description: "Full section-by-section revision notes for Paper 1 and Paper 2.",
    status: "available",
    href: "/notes",
    accent: "green",
  },
  {
    icon: Map,
    title: "Mind Maps",
    description: "Visual mind maps summarising each syllabus section.",
    status: "soon",
    accent: "purple",
  },
  {
    icon: Layers,
    title: "Flashcards",
    description: "Quick-recall flashcards for key terms, dates and figures.",
    status: "soon",
    accent: "blue",
  },
  {
    icon: Video,
    title: "Video Lessons",
    description: "Recorded lessons on the Al-Hayat Academy YouTube channel.",
    status: "available",
    href: siteConfig.links.youtube,
    external: true,
    accent: "gold",
  },
  {
    icon: Lightbulb,
    title: "Exam Tips & Technique",
    description: "Exam-technique guidance woven into every topic and model answer page.",
    status: "available",
    href: "/model-answers",
    accent: "teal",
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Printable/offline versions of notes and revision material.",
    status: "soon",
    accent: "green",
  },
  {
    icon: CalendarCheck,
    title: "Revision Plans",
    description: "The structured revision centre — topic checklists and self-testing.",
    status: "available",
    href: "/revision",
    accent: "gold",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold font-heading text-text">Resources</h1>
      <p className="mt-3 text-text-muted">
        Everything for {siteConfig.qualifications.oLevel.name} ({siteConfig.qualifications.oLevel.code})
        and {siteConfig.qualifications.igcse.name} ({siteConfig.qualifications.igcse.code}) study,
        organised by resource type. Items marked &quot;Coming soon&quot; are honestly labelled — they
        are not yet built.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((c) => {
            const accent = tileAccentClasses[c.accent];
            return (
              <div
                key={c.title}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110 ${accent.badge} ${accent.badgeHover}`}
                >
                  <c.icon aria-hidden="true" size={22} />
                </span>
                <h2 className="mt-4 font-heading font-semibold text-text">{c.title}</h2>
                <p className="mt-2 flex-1 text-sm text-text-muted">{c.description}</p>
                {c.status === "available" && c.href ? (
                  <Link
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-2"
                  >
                    {c.external ? "Visit channel" : `View ${c.title}`}
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                ) : (
                  <span className="mt-4 inline-block w-fit rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                    Coming soon
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <aside className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-card">
          <GeometricPattern
            id="resources-promo-pattern"
            tone="dark"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
          />
          <div className="relative">
            <h2 className="font-heading text-xl font-bold text-white">
              Consistent study today, confident results on exam day.
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Work through the revision centre&apos;s topic checklists and self-check quizzes to keep
              your Paper 1 and Paper 2 preparation on track.
            </p>
            <div className="mt-6">
              <Button href="/revision" variant="gold" icon={ArrowRight} iconPosition="right">
                Start Learning
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-surface-soft p-6">
        <h2 className="font-heading font-semibold text-text">Teaching resources</h2>
        <p className="mt-2 text-sm text-text-muted">
          Looking for lesson plans, worksheets and classroom materials for teachers? Visit the{" "}
          <Link href="/teacher-resources" className="text-primary underline">
            Teacher Resources
          </Link>{" "}
          hub.
        </p>
      </div>
    </div>
  );
}
