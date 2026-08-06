"use client";

import Link from "next/link";
import { TrendingUp, Award, Target, BookOpen } from "lucide-react";
import { getQuizStatsSummary } from "@/lib/quiz-analytics";
import {
  calculateProgressMetrics,
  getUnlockedMilestones,
  getExamReadinessLevel,
} from "@/lib/progress-tracking";

export function ProgressDashboard() {
  const allStats = getQuizStatsSummary();
  const metrics = calculateProgressMetrics(allStats);
  const unlockedMilestones = getUnlockedMilestones(allStats);
  const readinessLevel = getExamReadinessLevel(metrics.examReadinessScore);

  if (allStats.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <Target className="mx-auto text-text-muted" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">
          No progress yet
        </p>
        <p className="mt-2 text-text-muted">
          Start taking quizzes to track your learning journey.
        </p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Begin learning →
        </Link>
      </div>
    );
  }

  const readinessColors = {
    "not-ready": "bg-error",
    "developing": "bg-warning",
    "preparing": "bg-secondary",
    "nearly-ready": "bg-success/70",
    "ready": "bg-success",
  };

  const readinessLabels = {
    "not-ready": "Not Ready",
    "developing": "Developing",
    "preparing": "Preparing",
    "nearly-ready": "Nearly Ready",
    "ready": "Exam Ready",
  };

  return (
    <div className="space-y-8">
      {/* Exam Readiness Score */}
      <section className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              Exam Readiness
            </p>
            <p className="mt-2 text-5xl font-bold font-heading text-primary">
              {metrics.examReadinessScore}%
            </p>
            <p className="mt-2 text-lg font-semibold text-text">
              {readinessLabels[readinessLevel]}
            </p>
          </div>
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/50 backdrop-blur">
            <svg viewBox="0 0 100 100" className="h-32 w-32">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45 * (metrics.examReadinessScore / 100)} ${
                  2 * Math.PI * 45
                }`}
                className={readinessColors[readinessLevel]}
              />
            </svg>
          </div>
        </div>
        <Link
          href="/progress"
          className="mt-6 inline-block text-primary hover:underline text-sm font-semibold"
        >
          View full progress →
        </Link>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Topics Mastered
          </p>
          <p className="mt-2 text-3xl font-bold text-success">{metrics.topicsMastered}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Quizzes Completed
          </p>
          <p className="mt-2 text-3xl font-bold text-primary">
            {metrics.totalQuizzesAttempted}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Total Attempts
          </p>
          <p className="mt-2 text-3xl font-bold text-secondary">
            {metrics.totalAttemptsCompleted}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Average Score
          </p>
          <p className="mt-2 text-3xl font-bold text-accent">{metrics.averageScore}%</p>
        </div>
      </section>

      {/* Paper Progress */}
      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">Paper Progress</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { paper: 1, progress: metrics.paper1Progress },
            { paper: 2, progress: metrics.paper2Progress },
          ].map(({ paper, progress }) => (
            <div key={paper} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text">Paper {paper}</h3>
                <span className="text-lg font-bold text-primary">{progress}%</span>
              </div>
              <div className="mt-3 overflow-hidden rounded-full bg-surface-soft h-2">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      {unlockedMilestones.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <Award size={20} className="text-accent" aria-hidden="true" />
            Achievements Unlocked ({unlockedMilestones.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {unlockedMilestones.slice(0, 6).map((milestone) => (
              <div
                key={milestone.id}
                className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center"
              >
                <p className="text-3xl">{milestone.icon}</p>
                <p className="mt-2 font-semibold text-text">{milestone.title}</p>
                <p className="text-xs text-text-muted">{milestone.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
