import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical } from "@/lib/seo";
import { Calendar } from "lucide-react";
import { RevisionQueueClient } from "@/components/RevisionQueueClient";

export const metadata = {
  title: "Revision Queue",
  description: "Your personalized revision schedule with spaced repetition.",
  robots: { index: false, follow: true },
  ...canonical("/revision-queue"),
};

export default function RevisionQueuePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Revision Queue", href: "/revision-queue" }]} />
      <div className="mt-6 flex items-center gap-3">
        <Calendar size={32} className="text-primary" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-bold font-heading text-text">Revision Queue</h1>
          <p className="mt-2 text-text-muted">
            Your personalized study schedule using spaced repetition to optimize learning.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <RevisionQueueClient />
      </div>
    </div>
  );
}
