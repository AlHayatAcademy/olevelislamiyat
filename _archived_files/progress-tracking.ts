"use client";

import { QuizStats } from "@/lib/quiz-analytics";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: (stats: QuizStats[]) => boolean;
}

export interface ProgressMetrics {
  examReadinessScore: number;
  topicsMastered: number;
  topicsStruggling: number;
  totalQuizzesAttempted: number;
  totalAttemptsCompleted: number;
  averageScore: number;
  paper1Progress: number;
  paper2Progress: number;
  lastUpdated: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "first-quiz",
    title: "First Step",
    description: "Complete your first quiz",
    icon: "🎯",
    requirement: (stats) => stats.length >= 1,
  },
  {
    id: "quiz-streak-5",
    title: "Committed Learner",
    description: "Complete 5 quizzes",
    icon: "📚",
    requirement: (stats) => stats.length >= 5,
  },
  {
    id: "quiz-streak-10",
    title: "Consistent Practitioner",
    description: "Complete 10 quizzes",
    icon: "🔥",
    requirement: (stats) => stats.length >= 10,
  },
  {
    id: "perfect-score",
    title: "Flawless",
    description: "Score 100% on a quiz",
    icon: "💯",
    requirement: (stats) =>
      stats.some((s) => s.bestScorePercent === 100),
  },
  {
    id: "topic-mastery",
    title: "Topic Master",
    description: "Master a topic (75%+ average)",
    icon: "👑",
    requirement: (stats) =>
      stats.some((s) => s.averageScorePercent >= 75),
  },
  {
    id: "paper-1-ready",
    title: "Paper 1 Ready",
    description: "Achieve 75%+ average on Paper 1 topics",
    icon: "📄",
    requirement: (stats) => {
      const paper1 = stats.filter((s) => s.paper === 1);
      if (paper1.length === 0) return false;
      const avg =
        paper1.reduce((sum, s) => sum + s.averageScorePercent, 0) /
        paper1.length;
      return avg >= 75;
    },
  },
  {
    id: "paper-2-ready",
    title: "Paper 2 Ready",
    description: "Achieve 75%+ average on Paper 2 topics",
    icon: "📄",
    requirement: (stats) => {
      const paper2 = stats.filter((s) => s.paper === 2);
      if (paper2.length === 0) return false;
      const avg =
        paper2.reduce((sum, s) => sum + s.averageScorePercent, 0) /
        paper2.length;
      return avg >= 75;
    },
  },
  {
    id: "exam-ready",
    title: "Exam Ready",
    description: "Achieve 75%+ overall average score",
    icon: "🎓",
    requirement: (stats) => {
      if (stats.length === 0) return false;
      const avg =
        stats.reduce((sum, s) => sum + s.averageScorePercent, 0) /
        stats.length;
      return avg >= 75;
    },
  },
];

export function calculateProgressMetrics(allStats: QuizStats[]): ProgressMetrics {
  const topicsMastered = allStats.filter(
    (s) => s.averageScorePercent >= 75,
  ).length;
  const topicsStruggling = allStats.filter(
    (s) => s.averageScorePercent < 50,
  ).length;
  const totalAttemptsCompleted = allStats.reduce(
    (sum, s) => sum + s.attempts,
    0,
  );
  const averageScore =
    allStats.length > 0
      ? Math.round(
          allStats.reduce((sum, s) => sum + s.averageScorePercent, 0) /
            allStats.length,
        )
      : 0;

  const paper1Stats = allStats.filter((s) => s.paper === 1);
  const paper1Progress =
    paper1Stats.length > 0
      ? Math.round(
          paper1Stats.reduce((sum, s) => sum + s.averageScorePercent, 0) /
            paper1Stats.length,
        )
      : 0;

  const paper2Stats = allStats.filter((s) => s.paper === 2);
  const paper2Progress =
    paper2Stats.length > 0
      ? Math.round(
          paper2Stats.reduce((sum, s) => sum + s.averageScorePercent, 0) /
            paper2Stats.length,
        )
      : 0;

  const examReadinessScore = Math.round(averageScore * 0.7 + (topicsMastered / allStats.length) * 30);

  return {
    examReadinessScore: Math.min(100, examReadinessScore),
    topicsMastered,
    topicsStruggling,
    totalQuizzesAttempted: allStats.length,
    totalAttemptsCompleted,
    averageScore,
    paper1Progress,
    paper2Progress,
    lastUpdated: new Date().toISOString(),
  };
}

export function getUnlockedMilestones(allStats: QuizStats[]): Milestone[] {
  return MILESTONES.filter((milestone) => milestone.requirement(allStats));
}

export function getNextMilestones(allStats: QuizStats[]): Milestone[] {
  const unlocked = getUnlockedMilestones(allStats);
  return MILESTONES.filter((m) => !unlocked.some((u) => u.id === m.id)).slice(
    0,
    3,
  );
}

export function getExamReadinessLevel(
  score: number,
): "not-ready" | "developing" | "preparing" | "nearly-ready" | "ready" {
  if (score < 25) return "not-ready";
  if (score < 50) return "developing";
  if (score < 65) return "preparing";
  if (score < 80) return "nearly-ready";
  return "ready";
}
