import { Suspense } from "react";
import { canonical } from "@/lib/seo";
import { SearchPageClient } from "./SearchPageClient";

export const metadata = {
  title: "Search",
  description: "Search lessons, past-paper questions, model answers, quizzes, and references across the site.",
  robots: { index: false, follow: true },
  ...canonical("/search"),
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-12 text-text-muted">Loading search…</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
