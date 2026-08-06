import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical } from "@/lib/seo";
import { TrendingUp } from "lucide-react";
import { ProgressClient } from "@/components/ProgressClient";

export const metadata = {
  title: "Learning Progress",
  description: "Track your exam readiness, milestones, and learning journey.",
  robots: { index: false, follow: true },
  ...canonical("/progress"),
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Progress", href: "/progress" }]} />
      <div className="mt-6 flex items-center gap-3">
        <TrendingUp size={32} className="text-primary" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-bold font-heading text-text">Your Learning Journey</h1>
          <p className="mt-2 text-text-muted">
            Track your exam readiness, achievements, and progress toward mastery.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ProgressClient />
      </div>
    </div>
  );
}
