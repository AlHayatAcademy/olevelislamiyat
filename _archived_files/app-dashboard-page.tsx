import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DashboardClient, type SectionTotal } from "@/components/DashboardClient";
import { paper1Sections, paper2Sections } from "@/data/syllabus";
import { getTopicsForSection } from "@/data/topics";
import { canonical } from "@/lib/seo";

// Computed server-side so the client bundle doesn't need to import the full topics/syllabus
// data (all 99 lessons' content) just to count how many lessons are in each section.
const sectionTotals: SectionTotal[] = [
  ...paper1Sections.map((s) => ({
    paper: 1 as const,
    slug: s.slug,
    title: s.title,
    total: getTopicsForSection(1, s.slug).length,
  })),
  ...paper2Sections.map((s) => ({
    paper: 2 as const,
    slug: s.slug,
    title: s.title,
    total: getTopicsForSection(2, s.slug).length,
  })),
];

export const metadata = {
  title: "Your Learning Dashboard",
  description:
    "Track your progress, bookmarks, quiz results, and continue where you left off across the Islamiyat syllabus.",
  ...canonical("/dashboard"),
  // Personalized, device-local content with nothing to index - empty for every crawler and
  // every first-time visitor alike, so there's no public content here worth ranking.
  robots: { index: false, follow: true },
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }]} />
      <h1 className="mt-2 text-3xl font-bold font-heading text-text">Your Learning Dashboard</h1>
      <p className="mt-3 text-text-muted">
        Everything is saved on this device only — bookmarks, progress, and quiz results are stored
        in your browser, not on our servers.
      </p>

      <div className="mt-8">
        <DashboardClient sections={sectionTotals} />
      </div>
    </div>
  );
}
