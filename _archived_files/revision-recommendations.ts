"use client";

import { QuizStats } from "@/lib/quiz-analytics";
import { paper1Sections, paper2Sections } from "@/data/syllabus";

export interface RecommendedTopic {
  quizId: string;
  title: string;
  topicTitle: string;
  paper: 1 | 2;
  section: string;
  currentScore: number;
  attempts: number;
  urgency: "critical" | "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
  estimatedMinutes: number;
  reason: string;
  examImpact: "high" | "medium" | "low";
}

function getTopicDifficulty(score: number): "easy" | "medium" | "hard" {
  if (score >= 80) return "easy";
  if (score >= 50) return "medium";
  return "hard";
}

function getUrgency(
  score: number,
  attempts: number,
): "critical" | "high" | "medium" | "low" {
  if (score < 40) return "critical";
  if (score < 60 || attempts === 0) return "high";
  if (score < 75) return "medium";
  return "low";
}

function getExamImpact(section: string): "high" | "medium" | "low" {
  const highImpactSections = ["chapter-36-67", "seerah-muhammad", "hadith-methodology"];
  if (highImpactSections.includes(section)) return "high";
  if (section.includes("faith") || section.includes("community")) return "medium";
  return "low";
}

function estimateStudyTime(score: number, attempts: number): number {
  let baseTime = 20;
  if (score < 50) baseTime = 40;
  else if (score < 70) baseTime = 30;
  if (attempts === 0) baseTime += 15;
  return baseTime;
}

export function generateRevisionRecommendations(
  allStats: QuizStats[],
): RecommendedTopic[] {
  const recommendations: RecommendedTopic[] = allStats
    .filter((stat) => stat.attempts > 0)
    .map((stat) => {
      const urgency = getUrgency(stat.averageScorePercent, stat.attempts);
      const difficulty = getTopicDifficulty(stat.averageScorePercent);
      const estimatedMinutes = estimateStudyTime(
        stat.averageScorePercent,
        stat.attempts,
      );
      const examImpact = getExamImpact(stat.section);

      let reason = "";
      if (stat.averageScorePercent < 40) {
        reason = "Critical: This topic needs immediate focus to improve exam readiness.";
      } else if (stat.averageScorePercent < 60) {
        reason = "High priority: You're struggling with this topic. Practice will help.";
      } else if (stat.averageScorePercent < 75) {
        reason = "Medium priority: Good progress, but more practice will solidify knowledge.";
      } else if (stat.attempts < 2) {
        reason = "Limited practice: Complete another attempt to verify mastery.";
      } else {
        reason = "Low priority: Well mastered. Maintenance reviews only.";
      }

      return {
        quizId: stat.quizId,
        title: stat.title,
        topicTitle: stat.topicTitle,
        paper: stat.paper,
        section: stat.section,
        currentScore: stat.averageScorePercent,
        attempts: stat.attempts,
        urgency,
        difficulty,
        estimatedMinutes,
        reason,
        examImpact,
      };
    });

  return recommendations.sort((a, b) => {
    const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    if (a.examImpact !== b.examImpact) {
      const impactOrder = { high: 0, medium: 1, low: 2 };
      return impactOrder[a.examImpact] - impactOrder[b.examImpact];
    }
    return a.currentScore - b.currentScore;
  });
}

export function getTopicsNeedingWork(allStats: QuizStats[]): RecommendedTopic[] {
  const recommendations = generateRevisionRecommendations(allStats);
  return recommendations.filter(
    (t) => t.urgency === "critical" || t.urgency === "high",
  );
}

export function estimateTotalStudyTime(recommendations: RecommendedTopic[]): number {
  return recommendations.reduce((sum, topic) => sum + topic.estimatedMinutes, 0);
}

export function getStudyPathForPaper(
  allStats: QuizStats[],
  paper: 1 | 2,
): RecommendedTopic[] {
  const recommendations = generateRevisionRecommendations(allStats);
  return recommendations.filter((t) => t.paper === paper);
}

export function getRecommendationsByUrgency(allStats: QuizStats[]) {
  const recommendations = generateRevisionRecommendations(allStats);
  return {
    critical: recommendations.filter((t) => t.urgency === "critical"),
    high: recommendations.filter((t) => t.urgency === "high"),
    medium: recommendations.filter((t) => t.urgency === "medium"),
    low: recommendations.filter((t) => t.urgency === "low"),
  };
}
