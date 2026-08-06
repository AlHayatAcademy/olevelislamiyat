"use client";

import Link from "next/link";
import { AlertCircle, Clock, CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { getQuizStatsSummary } from "@/lib/quiz-analytics";
import { getRevisionQueue, getTopicsDueToday } from "@/lib/spaced-repetition";

export function RevisionQueueClient() {
  const allStats = getQuizStatsSummary();
  const revisionQueue = getRevisionQueue(allStats);
  const topicsDueToday = getTopicsDueToday(allStats);

  if (allStats.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <CalendarIcon className="mx-auto text-text-muted" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">No revision schedule yet</p>
        <p className="mt-2 text-text-muted">Complete some quizzes to generate your revision schedule.</p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Start a quiz →
        </Link>
      </div>
    );
  }

  if (revisionQueue.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-soft p-8 text-center">
        <CheckCircle className="mx-auto text-success" size={32} aria-hidden="true" />
        <p className="mt-4 font-heading text-lg font-semibold text-text">All caught up!</p>
        <p className="mt-2 text-text-muted">No topics are due for review right now.</p>
        <Link href="/quizzes" className="mt-4 inline-block text-primary hover:underline">
          Try a new quiz →
        </Link>
      </div>
    );
  }

  const overdue = revisionQueue.filter((t) => t.daysUntilDue < 0);
  const dueSoon = revisionQueue.filter((t) => t.daysUntilDue >= 0 && t.daysUntilDue <= 1);
  const upcoming = revisionQueue.filter((t) => t.daysUntilDue > 1);

  const revisionItemCard = (topic: ReturnType<typeof getRevisionQueue>[0]) => (
    <Link
      key={topic.quizId}
      href={`/quizzes/${topic.quizId}`}
      className="group rounded-lg border border-border bg-surface p-4 transition-all hover:border-primary hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {topic.urgency === "overdue" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-error/10 px-2 py-0.5 text-xs font-semibold text-error">
                <AlertCircle size={14} aria-hidden="true" />
                Overdue
              </span>
            )}
            {topic.urgency === "due-soon" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
                <Clock size={14} aria-hidden="true" />
                Due today
              </span>
            )}
          </div>
          <h3 className="mt-2 font-semibold text-text group-hover:text-primary">{topic.title}</h3>
          <p className="mt-0.5 text-sm text-text-muted">{topic.topicTitle}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs text-text-muted">
              {topic.reviewReason === "weak-topic"
                ? "🎯 Needs practice"
                : topic.reviewReason === "time-decay"
                  ? "⏱️ Time to revisit"
                  : "✨ Maintain mastery"}
            </span>
            <span className="text-xs text-text-muted">
              Last: {topic.daysAgo} day{topic.daysAgo === 1 ? "" : "s"} ago
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-primary">{topic.currentScore}%</p>
          <p className="text-xs text-text-muted">
            {topic.daysUntilDue < 0
              ? `${Math.abs(topic.daysUntilDue)} day${Math.abs(topic.daysUntilDue) === 1 ? "" : "s"} overdue`
              : topic.daysUntilDue === 0
                ? "Due today"
                : `In ${topic.daysUntilDue} day${topic.daysUntilDue === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Overdue */}
      {overdue.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <AlertCircle size={20} className="text-error" aria-hidden="true" />
            Overdue ({overdue.length})
          </h2>
          <div className="space-y-2">{overdue.map(revisionItemCard)}</div>
        </section>
      )}

      {/* Due soon */}
      {dueSoon.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <Clock size={20} className="text-warning" aria-hidden="true" />
            Due soon ({dueSoon.length})
          </h2>
          <div className="space-y-2">{dueSoon.map(revisionItemCard)}</div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-text">
            <CalendarIcon size={20} className="text-secondary" aria-hidden="true" />
            Upcoming ({upcoming.length})
          </h2>
          <div className="space-y-2">{upcoming.map(revisionItemCard)}</div>
        </section>
      )}
    </div>
  );
}
