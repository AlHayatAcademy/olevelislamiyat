"use client";

import Link from "next/link";
import { AlertCircle, TrendingDown, Clock, BookOpen } from "lucide-react";
import { getQuizStatsSummary } from "@/lib/quiz-analytics";
import { getTopicsNeedingWork, estimateTotalStudyTime } from "@/lib/revision-recommendations";

export function RevisionRecommendations() {
  const allStats = getQuizStatsSummary();
  const topicsNeedingWork = getTopicsNeedingWork(allStats);

  if (allStats.length === 0) {
    return null;
  }

  if (topicsNeedingWork.length === 0) {
    return null;
  }

  const totalMinutes = estimateTotalStudyTime(topicsNeedingWork);
  const totalHours = Math.ceil(totalMinutes / 60);

  return (
    <section className="rounded-xl border border-border bg-gradient-to-br from-warning/5 to-secondary/5 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <AlertCircle size={24} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-text">
              Recommended Focus Areas
            </h2>
            <p className="mt-0.5 text-sm text-text-muted">
              {topicsNeedingWork.length} topic{topicsNeedingWork.length === 1 ? "" : "s"} need your
              attention • ~{totalHours}h study time
            </p>
          </div>
        </div>
        <Link
          href="/revision-recommendations"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Full plan →
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {topicsNeedingWork.slice(0, 3).map((topic) => (
          <Link
            key={topic.quizId}
            href={`/quizzes/${topic.quizId}`}
            className="group flex items-start gap-3 rounded-lg border border-border bg-surface p-3 transition-all hover:border-primary hover:bg-surface-soft"
          >
            <div className="mt-1">
              {topic.urgency === "critical" && (
                <span className="inline-block h-2 w-2 rounded-full bg-error" aria-hidden="true" />
              )}
              {topic.urgency === "high" && (
                <span className="inline-block h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-text group-hover:text-primary">{topic.title}</p>
              <p className="text-xs text-text-muted">{topic.reason}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-text">{topic.currentScore}%</p>
              <p className="text-xs text-text-muted">{topic.estimatedMinutes}m</p>
            </div>
          </Link>
        ))}
        {topicsNeedingWork.length > 3 && (
          <p className="px-3 py-1 text-xs text-text-muted">
            +{topicsNeedingWork.length - 3} more in your recommended focus areas
          </p>
        )}
      </div>
    </section>
  );
}
