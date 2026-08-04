import Link from "next/link";
import {
  BookOpen,
  Map,
  Layers,
  Video,
  Lightbulb,
  Download,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
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
}

const cards: ResourceCard[] = [
  {
    icon: BookOpen,
    title: "Notes",
    description: "Full section-by-section revision notes for Paper 1 and Paper 2.",
    status: "available",
    href: "/notes",
  },
  {
    icon: Map,
    title: "Mind Maps",
    description: "Visual mind maps summarising each syllabus section.",
    status: "soon",
  },
  {
    icon: Layers,
    title: "Flashcards",
    description: "Quick-recall flashcards for key terms, dates and figures.",
    status: "soon",
  },
  {
    icon: Video,
    title: "Video Lessons",
    description: "Recorded lessons on the Al-Hayat Academy YouTube channel.",
    status: "available",
    href: siteConfig.links.youtube,
    external: true,
  },
  {
    icon: Lightbulb,
    title: "Exam Tips & Technique",
    description: "Exam-technique guidance woven into every topic and model answer page.",
    status: "available",
    href: "/model-answers",
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Printable/offline versions of notes and revision material.",
    status: "soon",
  },
  {
    icon: CalendarCheck,
    title: "Revision Plans",
    description: "The structured revision centre — topic checklists and self-testing.",
    status: "available",
    href: "/revision",
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

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <c.icon aria-hidden="true" className="text-secondary" size={26} />
            <h2 className="mt-4 font-heading font-semibold text-text">{c.title}</h2>
            <p className="mt-2 flex-1 text-sm text-text-muted">{c.description}</p>
            {c.status === "available" && c.href ? (
              <Link
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="mt-4 text-sm font-semibold text-primary underline underline-offset-2"
              >
                {c.external ? "Visit channel" : "Open"}
              </Link>
            ) : (
              <span className="mt-4 inline-block w-fit rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                Coming soon
              </span>
            )}
          </div>
        ))}
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
