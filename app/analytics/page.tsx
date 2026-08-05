import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuizAnalyticsDashboard } from "@/components/QuizAnalyticsDashboard";
import { canonical } from "@/lib/seo";
import { BarChart3 } from "lucide-react";

export const metadata = {
  title: "Quiz Analytics",
  description: "View your quiz performance analytics, weak topics, and personalized revision recommendations.",
  robots: { index: false, follow: true },
  ...canonical("/analytics"),
};

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Analytics", href: "/analytics" }]} />
      <div className="mt-6 flex items-center gap-3">
        <BarChart3 size={32} className="text-primary" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-bold font-heading text-text">Quiz Analytics</h1>
          <p className="mt-2 text-text-muted">
            Track your performance, identify weak areas, and get personalized revision recommendations.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <QuizAnalyticsDashboard />
      </div>
    </div>
  );
}