"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { computeAnalyticsSummary, getQuizStatsSummary } from "@/lib/quiz-analytics";
import { paper1Sections, paper2Sections } from "@/data/syllabus";

export function QuizAnalyticsDashboard() {
  const analytics = computeAnalyticsSummary();
  const allStats = getQuizStatsSummary();

  if (allStats.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <AlertCircle className="mx-auto text-text-muted" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">No quiz data yet</p>
        <p className="mt-2 text-text-muted">Start taking quizzes to see your learning analytics here.</p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Browse quizzes →
        </Link>
      </div>
    );
  }

  const getSectionTitle = (slug: string): string => {
    const s1 = paper1Sections.find((s) => s.slug === slug);
    if (s1) return s1.title;
    const s2 = paper2Sections.find((s) => s.slug === slug);
    return s2?.title ?? slug;
  };

  const ProgressBar = ({ percent, size = "sm" }: { percent: number; size?: "sm" | "md" }) => (
    <div className={`overflow-hidden rounded-full ${size === "md" ? "h-3" : "h-2"} bg-surface-soft`}>
      <div
        className={`h-full transition-all duration-300 ${
          percent >= 75 ? "bg-success" : percent >= 50 ? "bg-secondary" : "bg-warning"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );

  const StatCard = ({
    label,
    value,
    unit = "",
    trend,
    subtext,
  }: {
    label: string;
    value: number;
    unit?: string;
    trend?: "up" | "down";
    subtext?: string;
  }) => (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 flex items-center gap-2">
        <span className="text-2xl font-bold font-heading text-text">
          {value}
          {unit}
        </span>
        {trend &&
          (trend === "up" ? (
            <TrendingUp size={18} className="text-success" />
          ) : (
            <TrendingDown size={18} className="text-warning" />
          ))}
      </p>
      {subtext && <p className="mt-1 text-xs text-text-muted">{subtext}</p>}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">Overall Performance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Quizzes Taken" value={analytics.totalQuizzes} />
          <StatCard label="Total Attempts" value={analytics.totalAttempts} />
          <StatCard label="Best Score" value={analytics.overallBestPercent} unit="%" />
          <StatCard label="Average Score" value={analytics.overallAveragePercent} unit="%" />
        </div>
      </section>

      {/* Paper Breakdown */}
      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">Performance by Paper</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { paper: 1, stats: analytics.paper1Stats },
            { paper: 2, stats: analytics.paper2Stats },
          ].map(({ paper, stats }) => (
            <div key={paper} className="rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text">Paper {paper}</h3>
                <span className="text-sm font-medium text-text-muted">
                  {stats.attempts} attempt{stats.attempts !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Best Score</span>
                    <span className="font-semibold text-text">{stats.bestScore}%</span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar percent={stats.bestScore} size="md" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Average Score</span>
                    <span className="font-semibold text-text">{stats.avgScore}%</span>
                  </div>
                  <div className="mt-1">
                    <ProgressBar percent={stats.avgScore} size="md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Breakdown */}
      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">Performance by Section</h2>
        <div className="space-y-2 rounded-lg border border-border bg-surface p-4">
          {Object.entries(analytics.sectionStats)
            .sort((a, b) => b[1].avgScore - a[1].avgScore)
            .map(([sectionSlug, stats]) => (
              <div key={sectionSlug} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text">{getSectionTitle(sectionSlug)}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted">
                      {stats.attempts} attempt{stats.attempts !== 1 ? "s" : ""}
                    </span>
                    <span className="text-sm font-semibold text-text w-12 text-right">{stats.avgScore}%</span>
                  </div>
                </div>
                <div className="mt-1">
                  <ProgressBar percent={stats.avgScore} />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Weak Topics */}
      {analytics.weakTopics.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <AlertCircle size={20} className="text-warning" aria-hidden="true" />
            Topics to Revise
          </h2>
          <div className="space-y-2">
            {analytics.weakTopics.map((topic) => (
              <div
                key={topic.quizId}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
              >
                <div className="flex-1">
                  <Link href={`/quizzes/${topic.quizId}`} className="font-medium text-text hover:text-primary">
                    {topic.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-text-muted">{topic.topicTitle}</p>
                </div>
                <div className="ml-3 flex items-center gap-4">
                  <div className="w-20 text-right">
                    <p className="text-sm font-semibold text-text">{topic.averageScorePercent}%</p>
                    <p className="text-xs text-text-muted">
                      {topic.attempts} attempt{topic.attempts !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <TrendingDown size={18} className="shrink-0 text-warning" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strong Topics */}
      {analytics.strongTopics.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <CheckCircle size={20} className="text-success" aria-hidden="true" />
            Topics You&apos;ve Mastered
          </h2>
          <div className="space-y-2">
            {analytics.strongTopics.map((topic) => (
              <div
                key={topic.quizId}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
              >
                <div className="flex-1">
                  <Link href={`/quizzes/${topic.quizId}`} className="font-medium text-text hover:text-primary">
                    {topic.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-text-muted">{topic.topicTitle}</p>
                </div>
                <div className="ml-3 flex items-center gap-4">
                  <div className="w-20 text-right">
                    <p className="text-sm font-semibold text-text">{topic.averageScorePercent}%</p>
                    <p className="text-xs text-text-muted">
                      {topic.attempts} attempt{topic.attempts !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <TrendingUp size={18} className="shrink-0 text-success" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recently Attempted */}
      {analytics.recentlyAttempted.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <Clock size={20} className="text-secondary" aria-hidden="true" />
            Recently Attempted
          </h2>
          <div className="space-y-2">
            {analytics.recentlyAttempted.map((topic) => (
              <div
                key={topic.quizId}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
              >
                <div className="flex-1">
                  <Link href={`/quizzes/${topic.quizId}`} className="font-medium text-text hover:text-primary">
                    {topic.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Latest: {topic.lastAttemptPercent}% • Best: {topic.bestScorePercent}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}