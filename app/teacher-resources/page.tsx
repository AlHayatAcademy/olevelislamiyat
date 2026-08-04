import Link from "next/link";
import {
  ClipboardList,
  FileText,
  Presentation,
  CheckSquare,
  Users,
  NotebookPen,
  Home,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { canonical } from "@/lib/seo";

export const metadata = {
  title: "Teacher Resources",
  description:
    "A growing hub of teaching resources for Cambridge O Level Islamiyat 2058 / IGCSE Islamiyat 0493 — lesson plans, worksheets, rubrics and classroom activities.",
  ...canonical("/teacher-resources"),
};

interface Category {
  icon: LucideIcon;
  title: string;
  description: string;
}

const categories: Category[] = [
  {
    icon: ClipboardList,
    title: "Lesson Plans",
    description: "Syllabus-mapped lesson plans for each Paper 1 and Paper 2 section.",
  },
  {
    icon: FileText,
    title: "Worksheets",
    description: "Printable worksheets for consolidating key facts, terms and references.",
  },
  {
    icon: Presentation,
    title: "Presentation Outlines",
    description: "Slide-ready outlines summarising each topic for classroom delivery.",
  },
  {
    icon: CheckSquare,
    title: "Assessment Rubrics",
    description: "AO1/AO2-aligned marking rubrics for structured and essay-style answers.",
  },
  {
    icon: Users,
    title: "Classroom Activities",
    description: "Discussion prompts, pair/group tasks and recall activities.",
  },
  {
    icon: NotebookPen,
    title: "Revision Tests",
    description: "Short in-class tests mapped to individual syllabus sections.",
  },
  {
    icon: Home,
    title: "Homework Sets",
    description: "Structured homework tasks that reinforce classroom teaching.",
  },
  {
    icon: Lightbulb,
    title: "Teaching Strategies",
    description: "Notes on approaches that work well for examination-focused Islamiyat teaching.",
  },
];

export default function TeacherResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Teacher Resources", href: "/teacher-resources" }]} />
      <h1 className="mt-4 text-3xl font-bold font-heading text-text">Teacher Resources</h1>
      <p className="mt-3 text-text-muted">
        A dedicated hub for teachers preparing students for {siteConfig.qualifications.oLevel.name}{" "}
        ({siteConfig.qualifications.oLevel.code}) and {siteConfig.qualifications.igcse.name} (
        {siteConfig.qualifications.igcse.code}). These resource categories are being built out —
        each one is honestly labelled below as it becomes available.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.title} className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <c.icon aria-hidden="true" className="text-secondary" size={26} />
            <h2 className="mt-4 font-heading font-semibold text-text">{c.title}</h2>
            <p className="mt-2 flex-1 text-sm text-text-muted">{c.description}</p>
            <span className="mt-4 inline-block w-fit rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Coming soon
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-surface-soft p-6">
        <h2 className="font-heading font-semibold text-text">In the meantime</h2>
        <p className="mt-2 text-sm text-text-muted">
          The full{" "}
          <Link href="/notes" className="text-primary underline">
            Notes
          </Link>{" "}
          library, the{" "}
          <Link href="/model-answers" className="text-primary underline">
            Model Answers
          </Link>{" "}
          bank, and the{" "}
          <Link href="/quotes-references" className="text-primary underline">
            Quotes &amp; References
          </Link>{" "}
          compilation are already published and usable directly in the classroom. If there is a
          specific resource you need urgently, get in touch — see{" "}
          <Link href="/contact" className="text-primary underline">
            Contact
          </Link>{" "}
          and select &quot;Teacher support enquiry&quot;.
        </p>
      </div>
    </div>
  );
}
