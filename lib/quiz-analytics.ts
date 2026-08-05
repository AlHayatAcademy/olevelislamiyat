"use client";

// Quiz analytics: detailed attempt tracking and performance aggregation
// Designed to migrate to account-backed storage later without changing public API

import { quizzes } from "@/data/quizzes";

export interface QuizAttemptRecord {
  timestamp: string; // ISO
  scorePercent: number;
  correctCount: number;
  totalCount: number;
  answers: Record<string, { type: string; correct: boolean }>;
}

export interface QuestionStats {
  questionId: string;
  correct: number;
  incorrect: number;
  totalAttempts: number;
  correctPercent: number;
}

export interface QuizStats {
  quizId: string;
  title: string;
  paper: 1 | 2;
  section: string;
  topicSlug: string;
  topicTitle: string;
  bestScorePercent: number;
  lastAttemptPercent: number;
  attempts: number;
  lastAttemptedAt?: string;
  averageScorePercent: number;
  questionStats: QuestionStats[];
}

export interface AnalyticsSummary {
  totalQuizzes: number;
  totalAttempts: number;
  overallBestPercent: number;
  overallAveragePercent: number;
  paper1Stats: { attempts: number; avgScore: number; bestScore: number };
  paper2Stats: { attempts: number; avgScore: number; bestScore: number };
  sectionStats: Record<string, { attempts: number; avgScore: number; bestScore: number }>;
  recentlyAttempted: QuizStats[];
  weakTopics: QuizStats[];
  strongTopics: QuizStats[];
}

const STORAGE_KEY = "olevelislamiyat:quiz-analytics:v1";

export function loadQuizAnalytics(quizId: string): {
  bestScorePercent: number;
  lastAttemptPercent: number;
  attempts: number;
  lastAttemptedAt?: string;
  attemptHistory: QuizAttemptRecord[];
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_KEY}:${quizId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveQuizAttempt(
  quizId: string,
  attempt: QuizAttemptRecord,
  bestScorePercent: number,
  lastAttemptPercent: number,
  attempts: number,
) {
  if (typeof window === "undefined") return;
  try {
    const existing = loadQuizAnalytics(quizId) ?? {
      bestScorePercent: 0,
      lastAttemptPercent: 0,
      attempts: 0,
      attemptHistory: [],
    };
    const updated = {
      ...existing,
      bestScorePercent,
      lastAttemptPercent,
      attempts,
      lastAttemptedAt: attempt.timestamp,
      attemptHistory: [...(existing.attemptHistory || []), attempt],
    };
    window.localStorage.setItem(`${STORAGE_KEY}:${quizId}`, JSON.stringify(updated));
  } catch {
    // localStorage unavailable
  }
}

export function getQuizStatsSummary(): QuizStats[] {
  if (typeof window === "undefined") return [];
  const results: QuizStats[] = [];

  for (const quiz of quizzes) {
    const data = loadQuizAnalytics(quiz.id);
    if (!data) continue;

    const attempts = data.attemptHistory || [];
    const avgScore = attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + a.scorePercent, 0) / attempts.length) : 0;

    // Aggregate question stats
    const questionMap = new Map<string, { correct: number; incorrect: number; totalAttempts: number }>();
    for (const attempt of attempts) {
      for (const [qid, result] of Object.entries(attempt.answers)) {
        if (!questionMap.has(qid)) {
          questionMap.set(qid, { correct: 0, incorrect: 0, totalAttempts: 0 });
        }
        const stats = questionMap.get(qid)!;
        stats.totalAttempts++;
        if (result.correct) stats.correct++;
        else stats.incorrect++;
      }
    }

    const questionStats: QuestionStats[] = Array.from(questionMap.entries()).map(([qid, stats]) => ({
      questionId: qid,
      correct: stats.correct,
      incorrect: stats.incorrect,
      totalAttempts: stats.totalAttempts,
      correctPercent: stats.totalAttempts > 0 ? Math.round((stats.correct / stats.totalAttempts) * 100) : 0,
    }));

    results.push({
      quizId: quiz.id,
      title: quiz.title,
      paper: quiz.paper,
      section: quiz.section,
      topicSlug: quiz.topicSlug,
      topicTitle: quiz.topicTitle,
      bestScorePercent: data.bestScorePercent,
      lastAttemptPercent: data.lastAttemptPercent,
      attempts: data.attempts,
      lastAttemptedAt: data.lastAttemptedAt,
      averageScorePercent: avgScore,
      questionStats,
    });
  }

  return results;
}

export function computeAnalyticsSummary(): AnalyticsSummary {
  const allStats = getQuizStatsSummary();

  const sectionMap = new Map<string, { attempts: number; scores: number[]; best: number }>();
  let totalAttempts = 0;
  let totalBest = 0;
  const totalScores: number[] = [];
  const paper1Scores: number[] = [];
  const paper2Scores: number[] = [];
  const paper1Bests: number[] = [];
  const paper2Bests: number[] = [];

  for (const stat of allStats) {
    totalAttempts += stat.attempts;
    totalBest = Math.max(totalBest, stat.bestScorePercent);
    totalScores.push(stat.averageScorePercent);

    if (stat.paper === 1) {
      paper1Scores.push(stat.averageScorePercent);
      paper1Bests.push(stat.bestScorePercent);
    } else {
      paper2Scores.push(stat.averageScorePercent);
      paper2Bests.push(stat.bestScorePercent);
    }

    if (!sectionMap.has(stat.section)) {
      sectionMap.set(stat.section, { attempts: 0, scores: [], best: 0 });
    }
    const sec = sectionMap.get(stat.section)!;
    sec.attempts += stat.attempts;
    sec.scores.push(stat.averageScorePercent);
    sec.best = Math.max(sec.best, stat.bestScorePercent);
  }

  const avg = (nums: number[]) => (nums.length > 0 ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0);

  return {
    totalQuizzes: allStats.length,
    totalAttempts,
    overallBestPercent: totalBest,
    overallAveragePercent: avg(totalScores),
    paper1Stats: {
      attempts: paper1Scores.length,
      avgScore: avg(paper1Scores),
      bestScore: paper1Bests.length > 0 ? Math.max(...paper1Bests) : 0,
    },
    paper2Stats: {
      attempts: paper2Scores.length,
      avgScore: avg(paper2Scores),
      bestScore: paper2Bests.length > 0 ? Math.max(...paper2Bests) : 0,
    },
    sectionStats: Object.fromEntries(
      Array.from(sectionMap.entries()).map(([section, data]) => [
        section,
        { attempts: data.attempts, avgScore: avg(data.scores), bestScore: data.best },
      ]),
    ),
    recentlyAttempted: allStats.filter((s) => s.lastAttemptedAt).sort((a, b) => (b.lastAttemptedAt || "").localeCompare(a.lastAttemptedAt || "")).slice(0, 5),
    weakTopics: allStats.filter((s) => s.attempts > 0).sort((a, b) => a.averageScorePercent - b.averageScorePercent).slice(0, 5),
    strongTopics: allStats.filter((s) => s.attempts > 0).sort((a, b) => b.averageScorePercent - a.averageScorePercent).slice(0, 5),
  };
}