"use client";

import { QuizStats } from "@/lib/quiz-analytics";

export interface RevisionItem {
  quizId: string;
  title: string;
  topicTitle: string;
  paper: 1 | 2;
  section: string;
  currentScore: number;
  lastAttemptedAt: string;
  daysAgo: number;
  daysUntilDue: number;
  dueDate: Date;
  urgency: "overdue" | "due-soon" | "upcoming";
  reviewReason: "weak-topic" | "time-decay" | "mastery-check";
}

export function calculateNextReviewDate(
  lastAttemptedAt: string,
  currentScore: number,
): Date {
  const lastAttemptDate = new Date(lastAttemptedAt);
  const today = new Date();
  const daysAgo = Math.floor((today.getTime() - lastAttemptDate.getTime()) / (1000 * 60 * 60 * 24));

  let daysUntilNextReview: number;

  if (currentScore < 50) {
    daysUntilNextReview = 1;
  } else if (currentScore < 75) {
    daysUntilNextReview = 3;
  } else {
    daysUntilNextReview = 7;
  }

  daysUntilNextReview = Math.max(0, daysUntilNextReview - daysAgo);

  const nextReviewDate = new Date(today);
  nextReviewDate.setDate(nextReviewDate.getDate() + daysUntilNextReview);
  return nextReviewDate;
}

export function getRevisionQueue(allStats: QuizStats[]): RevisionItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const revisionItems: RevisionItem[] = allStats
    .filter((stat) => stat.lastAttemptedAt && stat.attempts > 0)
    .map((stat) => {
      const lastAttemptDate = new Date(stat.lastAttemptedAt!);
      const daysAgo = Math.floor(
        (today.getTime() - lastAttemptDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const dueDate = calculateNextReviewDate(stat.lastAttemptedAt!, stat.averageScorePercent);
      const daysUntilDue = Math.floor(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      let urgency: "overdue" | "due-soon" | "upcoming";
      if (daysUntilDue < 0) {
        urgency = "overdue";
      } else if (daysUntilDue <= 1) {
        urgency = "due-soon";
      } else {
        urgency = "upcoming";
      }

      let reviewReason: "weak-topic" | "time-decay" | "mastery-check";
      if (stat.averageScorePercent < 50) {
        reviewReason = "weak-topic";
      } else if (daysAgo > 7) {
        reviewReason = "time-decay";
      } else {
        reviewReason = "mastery-check";
      }

      return {
        quizId: stat.quizId,
        title: stat.title,
        topicTitle: stat.topicTitle,
        paper: stat.paper,
        section: stat.section,
        currentScore: stat.averageScorePercent,
        lastAttemptedAt: stat.lastAttemptedAt!,
        daysAgo,
        daysUntilDue,
        dueDate,
        urgency,
        reviewReason,
      };
    });

  return revisionItems.sort((a, b) => {
    if (a.urgency === "overdue" && b.urgency !== "overdue") return -1;
    if (a.urgency !== "overdue" && b.urgency === "overdue") return 1;
    if (a.urgency === "due-soon" && b.urgency !== "due-soon") return -1;
    if (a.urgency !== "due-soon" && b.urgency === "due-soon") return 1;
    return a.daysUntilDue - b.daysUntilDue;
  });
}

export function getTopicsDueToday(allStats: QuizStats[]): RevisionItem[] {
  const revisionQueue = getRevisionQueue(allStats);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return revisionQueue.filter(
    (item) =>
      item.urgency === "overdue" ||
      (item.dueDate.getTime() >= today.getTime() && item.dueDate.getTime() < tomorrow.getTime()),
  );
}

export function getUpcomingTopics(allStats: QuizStats[], days: number = 7): RevisionItem[] {
  const revisionQueue = getRevisionQueue(allStats);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const future = new Date(today);
  future.setDate(future.getDate() + days);

  return revisionQueue.filter((item) => item.dueDate.getTime() <= future.getTime());
}
