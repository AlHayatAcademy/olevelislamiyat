"use client";

import { useLearnerProfile, getViewedCountForSection } from "@/lib/learner-store";

interface SectionProgressProps {
  paper: 1 | 2;
  section: string;
  total: number;
}

/**
 * Small client island showing how many lessons in this section the learner has already viewed.
 * Isolated to its own component (rather than making SectionHub a client component) so the rest
 * of the section page stays server-rendered - see docs/Architecture.md, Phase 3.7 performance
 * principle (minimal client JS).
 */
export function SectionProgress({ paper, section, total }: SectionProgressProps) {
  // Subscribing via useLearnerProfile (rather than reading getViewedCountForSection once) means
  // this updates live if the learner views a lesson in another tab, or immediately after
  // RecordView fires on this same section's own topic pages.
  useLearnerProfile();
  const viewed = getViewedCountForSection(paper, section);

  if (total === 0) return null;
  const percent = Math.round((viewed / total) * 100);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs font-medium text-text-muted">
        <span>
          {viewed} of {total} lessons viewed
        </span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Section progress: ${viewed} of ${total} lessons viewed`}
        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-soft"
      >
        <div
          className="h-full rounded-full bg-success transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
