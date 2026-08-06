import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical } from "@/lib/seo";
import { Lightbulb } from "lucide-react";
import { RevisionRecommendationsClient } from "@/components/RevisionRecommendationsClient";

export const metadata = {
  title: "Revision Recommendations",
  description: "Personalized study recommendations based on your quiz performance.",
  robots: { index: false, follow: true },
  ...canonical("/revision-recommendations"),
};

export default function RevisionRecommendationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs
        items={[{ label: "Revision Recommendations", href: "/revision-recommendations" }]}
      />
      <div className="mt-6 flex items-center gap-3">
        <Lightbulb size={32} className="text-primary" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-bold font-heading text-text">
            Personalized Study Recommendations
          </h1>
          <p className="mt-2 text-text-muted">
            A smart study plan based on your current performance and exam structure.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <RevisionRecommendationsClient />
      </div>
    </div>
  );
}
