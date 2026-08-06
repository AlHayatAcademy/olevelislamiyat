"use client";

import Link from "next/link";
import { AlertCircle, TrendingDown, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { getQuizStatsSummary } from "@/lib/quiz-analytics";
import {
  generateRevisionRecommendations,
  estimateTotalStudyTime,
  getRecommendationsByUrgency,
} from "@/lib/revision-recommendations";

export function RevisionRecommendationsClient() {
  const allStats = getQuizStatsSummary();
  const recommendations = generateRevisionRecommendations(allStats);
  const byUrgency = getRecommendationsByUrgency(allStats);
  const totalMinutes = estimateTotalStudyTime(recommendations);
  const totalHours = Math.ceil(totalMinutes / 60);

  if (allStats.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <BookOpen className="mx-auto text-text-muted" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">
          No recommendations yet
        </p>
        <p className="mt-2 text-text-muted">
          Complete some quizzes to get personalized study recommendations.
        </p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Start a quiz →
        </Link>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <CheckCircle2 className="mx-auto text-success" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">All topics mastered!</p>
        <p className="mt-2 text-text-muted">
          Continue practicing to maintain your knowledge.
        </p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Try another quiz →
        </Link>
      </div>
    );
  }

  const urgencyCard = (
    title: string,
    icon: React.ReactNode,
    topics: typeof recommendations,
    color: string,
  ) => (
    <section>
      <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
        {icon}
        {title} ({topics.length})
      </h2>
      <div className="space-y-2">
        {topics.map((topic) => (
          <Link
            key={topic.quizId}
            href={`/quizzes/${topic.quizId}`}
            className="group block rounded-lg border border-border bg-surface p-4 transition-all hover:border-primary hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-text group-hover:text-primary">
                    {topic.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-soft px-2 py-0.5 text-xs font-semibold text-text-muted">
                    <Clock size={12} aria-hidden="true" />
                    {topic.estimatedMinutes}m
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{topic.topicTitle}</p>
                <p className="mt-2 text-xs text-text-muted">{topic.reason}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    topic.examImpact === "high"
                      ? "bg-primary/10 text-primary"
                      : "bg-surface-soft text-text-muted"
                  }`}>
                    {topic.examImpact === "high" ? "High impact" : "Exam relevant"}
                  </span>
                  <span className="rounded-full bg-surface-soft px-2 py-0.5 text-xs font-semibold text-text-muted capitalize">
                    {topic.difficulty}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-primary">{topic.currentScore}%</p>
                <p className="text-xs text-text-muted">
                  {topic.attempts} attempt{topic.attempts === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-8">
      {/* Summary card */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Topics to study
            </p>
            <p className="mt-2 text-3xl font-bold text-primary">{recommendations.length}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Estimated time
            </p>
            <p className="mt-2 text-3xl font-bold text-primary">~{totalHours}h</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Focus areas
            </p>
            <p className="mt-2 text-3xl font-bold text-primary">
              {byUrgency.critical.length + byUrgency.high.length}
            </p>
          </div>
        </div>
      </div>

      {/* Critical */}
      {byUrgency.critical.length > 0 &&
        urgencyCard(
          "Critical Priority",
          <AlertCircle size={20} className="text-error" aria-hidden="true" />,
          byUrgency.critical,
          "error",
        )}

      {/* High */}
      {byUrgency.high.length > 0 &&
        urgencyCard(
          "High Priority",
          <TrendingDown size={20} className="text-warning" aria-hidden="true" />,
          byUrgency.high,
          "warning",
        )}

      {/* Medium */}
      {byUrgency.medium.length > 0 &&
        urgencyCard(
          "Medium Priority",
          <BookOpen size={20} className="text-secondary" aria-hidden="true" />,
          byUrgency.medium,
          "secondary",
        )}

      {/* Low */}
      {byUrgency.low.length > 0 &&
        urgencyCard(
          "Maintenance",
          <CheckCircle2 size={20} className="text-success" aria-hidden="true" />,
          byUrgency.low,
          "success",
        )}
    </div>
  );
}
