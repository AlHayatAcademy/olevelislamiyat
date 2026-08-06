"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getLastVisited, type RecentlyViewedEntry } from "@/lib/learner-store";

/**
 * "Continue Learning" banner - renders nothing for first-time visitors (no localStorage data
 * yet) or during SSR, and appears after mount if the learner has a last-visited lesson. This
 * avoids a hydration mismatch: server and first client render both produce nothing, and the
 * banner appears a moment later once localStorage has been read - a deliberate, minor trade-off
 * for a feature that fundamentally depends on client-only state.
 */
export function ContinueLearningBanner() {
  const [lastVisited, setLastVisited] = useState<RecentlyViewedEntry | null>(null);

  useEffect(() => {
    setLastVisited(getLastVisited());
  }, []);

  if (!lastVisited) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <Link
        href={lastVisited.url}
        className="group flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 transition-colors hover:bg-primary/10"
      >
        <span className="flex items-center gap-3 text-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpen size={18} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold text-text">Continue learning</span>
            <span className="block text-text-muted">{lastVisited.title}</span>
          </span>
        </span>
        <ArrowRight
          size={18}
          className="shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
