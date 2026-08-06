"use client";

import Link from "next/link";
import { AlertCircle, Clock, TrendingUp, Calendar } from "lucide-react";
import { getQuizStatsSummary } from "@/lib/quiz-analytics";
import { getTopicsDueToday, getRevisionQueue } from "@/lib/spaced-repetition";

export function RevisionQueue() {
  const allStats = getQuizStatsSummary();
  const topicsDueToday = getTopicsDueToday(allStats);
  const revisionQueue = getRevisionQueue(allStats);

  if (allStats.length === 0) {
    return null;
  }

  const overdueTopic = topicsDueToday.find((t) => t.daysUntilDue < 0);
  const dueTodayTopics = topicsDueToday.filter((t) => t.daysUntilDue >= 0);

  if (revisionQueue.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Calendar size={24} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-text">Your Revision Queue</h2>
            <p className="mt-0.5 text-sm text-text-muted">
              {overdueTopic
                ? `1 topic overdue + ${dueTodayTopics.length} due today`
                : dueTodayTopics.length > 0
                  ? `${dueTodayTopics.length} topic${dueTodayTopics.length === 1 ? "" : "s"} due today`
                  : `Next review in ${revisionQueue[0]?.daysUntilDue} day${revisionQueue[0]?.daysUntilDue === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>
        <Link
          href="/revision-queue"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* Overdue topic */}
      {overdueTopic && (
        <div className="mt-4 rounded-lg border-l-4 border-error bg-error/10 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-error shrink-0" aria-hidden="true" />
                <p className="text-sm font-semibold text-text">Overdue for review</p>
              </div>
              <Link
                href={`/quizzes/${overdueTopic.quizId}`}
                className="mt-1 block font-medium text-text hover:text-primary"
              >
                {overdueTopic.title}
              </Link>
              <p className="text-xs text-text-muted">
                Last attempted {overdueTopic.daysAgo} day{overdueTopic.daysAgo === 1 ? "" : "s"} ago
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-text">{overdueTopic.currentScore}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Due today */}
      {dueTodayTopics.length > 0 && (
        <div className="mt-3 space-y-2">
          {dueTodayTopics.slice(0, 2).map((topic) => (
            <div key={topic.quizId} className="rounded-lg border border-border bg-surface p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Link
                    href={`/quizzes/${topic.quizId}`}
                    className="font-medium text-text hover:text-primary"
                  >
                    {topic.title}
                  </Link>
                  <p className="text-xs text-text-muted">
                    {topic.reviewReason === "weak-topic"
                      ? "Needs practice"
                      : topic.reviewReason === "time-decay"
                        ? "Time to revisit"
                        : "Maintain mastery"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-text">{topic.currentScore}%</p>
                  <p className="text-xs text-text-muted">Review now</p>
                </div>
              </div>
            </div>
          ))}
          {dueTodayTopics.length > 2 && (
            <p className="text-xs text-text-muted px-1">
              +{dueTodayTopics.length - 2} more due today
            </p>
          )}
        </div>
      )}

      {/* Next in queue */}
      {revisionQueue.length > topicsDueToday.length && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-surface p-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-secondary text-opacity-60" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Next up
              </p>
              <p className="text-sm text-text">
                {revisionQueue[topicsDueToday.length]?.title || "All caught up"}
              </p>
            </div>
          </div>
          <p className="text-xs text-text-muted text-right">
            in {revisionQueue[topicsDueToday.length]?.daysUntilDue} day
            {revisionQueue[topicsDueToday.length]?.daysUntilDue === 1 ? "" : "s"}
          </p>
        </div>
      )}
    </section>
  );
}
