"use client";

import Link from "next/link";
import { Award, Target, BookOpen, TrendingUp } from "lucide-react";
import { getQuizStatsSummary } from "@/lib/quiz-analytics";
import {
  calculateProgressMetrics,
  getUnlockedMilestones,
  getNextMilestones,
  MILESTONES,
  getExamReadinessLevel,
} from "@/lib/progress-tracking";

export function ProgressClient() {
  const allStats = getQuizStatsSummary();
  const metrics = calculateProgressMetrics(allStats);
  const unlockedMilestones = getUnlockedMilestones(allStats);
  const nextMilestones = getNextMilestones(allStats);
  const readinessLevel = getExamReadinessLevel(metrics.examReadinessScore);

  if (allStats.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <BookOpen className="mx-auto text-text-muted" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">
          No progress tracked yet
        </p>
        <p className="mt-2 text-text-muted">
          Complete quizzes to start tracking your learning journey.
        </p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Start learning →
        </Link>
      </div>
    );
  }

  const readinessColors = {
    "not-ready": "from-error/20 to-error/5",
    "developing": "from-warning/20 to-warning/5",
    "preparing": "from-secondary/20 to-secondary/5",
    "nearly-ready": "from-success/20 to-success/5",
    "ready": "from-success/30 to-success/10",
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
      {/* Exam Readiness */}
      <section className={`rounded-xl border border-border bg-gradient-to-br ${readinessColors[readinessLevel]} p-8`}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              Exam Readiness Score
            </p>
            <p className="mt-3 text-6xl font-bold font-heading text-primary">
              {metrics.examReadinessScore}%
            </p>
            <p className="mt-3 text-xl font-semibold text-text">
              {readinessLabels[readinessLevel]}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Based on quiz performance and topic mastery
            </p>
          </div>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-40 w-40">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${
                  2 * Math.PI * 45 * (metrics.examReadinessScore / 100)
                } ${2 * Math.PI * 45}`}
                className="text-primary transition-all duration-500"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">Key Metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Topics Mastered
            </p>
            <p className="mt-3 text-4xl font-bold text-success">{metrics.topicsMastered}</p>
            <p className="mt-2 text-xs text-text-muted">
              {allStats.length > 0
                ? Math.round((metrics.topicsMastered / allStats.length) * 100)
                : 0}
              % of topics
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Topics Struggling
            </p>
            <p className="mt-3 text-4xl font-bold text-warning">{metrics.topicsStruggling}</p>
            <p className="mt-2 text-xs text-text-muted">Need focused practice</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Quizzes Completed
            </p>
            <p className="mt-3 text-4xl font-bold text-primary">
              {metrics.totalQuizzesAttempted}
            </p>
            <p className="mt-2 text-xs text-text-muted">
              {metrics.totalAttemptsCompleted} total attempts
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Average Score
            </p>
            <p className="mt-3 text-4xl font-bold text-accent">{metrics.averageScore}%</p>
            <p className="mt-2 text-xs text-text-muted">Across all attempts</p>
          </div>
        </div>
      </section>

      {/* Paper Breakdown */}
      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">Paper Progress</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { paper: 1, progress: metrics.paper1Progress },
            { paper: 2, progress: metrics.paper2Progress },
          ].map(({ paper, progress }) => (
            <div key={paper} className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-text">Paper {paper}</h3>
                <span className="text-3xl font-bold text-primary">{progress}%</span>
              </div>
              <div className="overflow-hidden rounded-full bg-surface-soft h-3">
                <div
                  className={`h-full transition-all duration-500 ${
                    progress >= 75
                      ? "bg-success"
                      : progress >= 50
                        ? "bg-secondary"
                        : "bg-warning"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-text-muted">
                {progress >= 75
                  ? "Exam ready"
                  : progress >= 50
                    ? "Good progress"
                    : "Needs practice"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
          <Award size={20} className="text-accent" aria-hidden="true" />
          Achievements ({unlockedMilestones.length} / {MILESTONES.length})
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {MILESTONES.map((milestone) => {
            const unlocked = unlockedMilestones.some((m) => m.id === milestone.id);
            return (
              <div
                key={milestone.id}
                className={`rounded-lg border p-4 text-center transition-all ${
                  unlocked
                    ? "border-accent/50 bg-accent/10"
                    : "border-border bg-surface opacity-50"
                }`}
              >
                <p className={`text-4xl ${unlocked ? "" : "grayscale opacity-50"}`}>
                  {milestone.icon}
                </p>
                <p className="mt-2 font-semibold text-text">{milestone.title}</p>
                <p className="text-xs text-text-muted">{milestone.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Next Milestones */}
      {nextMilestones.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <Target size={20} className="text-secondary" aria-hidden="true" />
            Next Milestones
          </h2>
          <div className="space-y-3">
            {nextMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex items-start gap-3">
                  <p className="text-2xl">{milestone.icon}</p>
                  <div className="flex-1">
                    <p className="font-semibold text-text">{milestone.title}</p>
                    <p className="text-sm text-text-muted">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
