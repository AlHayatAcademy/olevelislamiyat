'use client';

import { useState, useEffect } from 'react';
import {
  getStudentAnalytics,
  getPerformanceTrend,
  getQuizAttempts,
} from '@/lib/analytics-service';
import {
  exportStudentAnalyticsCSV,
  generateStudentReportHTML,
  downloadFile,
} from '@/lib/export-service';
import { StudentAnalytics, PerformanceTrend, QuizAnalyticsRecord } from '@/lib/analytics-service';

interface StudentDashboardProps {
  userId: string;
  classId: string;
  studentName: string;
}

export function StudentDashboard({
  userId,
  classId,
  studentName,
}: StudentDashboardProps) {
  const [analytics, setAnalytics] = useState<StudentAnalytics | null>(null);
  const [trend, setTrend] = useState<PerformanceTrend[]>([]);
  const [attempts, setAttempts] = useState<QuizAnalyticsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [analyticsData, trendData, attemptsData] = await Promise.all([
          getStudentAnalytics(userId, classId),
          getPerformanceTrend(userId, classId, 30),
          getQuizAttempts(userId, classId, 10),
        ]);

        setAnalytics(analyticsData);
        setTrend(trendData);
        setAttempts(attemptsData);
      } catch (err) {
        setError('Failed to load analytics');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId, classId]);

  const handleExportCSV = () => {
    if (!analytics) return;
    const csv = exportStudentAnalyticsCSV(analytics);
    downloadFile(csv, `student-analytics-${userId}.csv`, 'text/csv');
  };

  const handleExportPDF = () => {
    if (!analytics) return;
    const html = generateStudentReportHTML(studentName, analytics, attempts);
    downloadFile(html, `student-report-${userId}.html`, 'text/html');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
        {error || 'Failed to load analytics'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            My Progress
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your learning journey
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
          >
            📊 Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            📄 Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Score */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Average Score
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {analytics.averageScore}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Across {analytics.totalQuizzes} quizzes
          </div>
          <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${analytics.averageScore}%` }}
            />
          </div>
        </div>

        {/* Topics Completed */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Topics Mastered
          </div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
            {analytics.topicsCompleted}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Out of {analytics.topicsStarted} started
          </div>
          <div className="mt-4">
            <div className="text-sm">
              {analytics.topicsStarted > 0
                ? Math.round(
                    (analytics.topicsCompleted / analytics.topicsStarted) * 100,
                  )
                : 0}
              % completion
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Study Streak
          </div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">
            {analytics.currentStreak}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Days of consistent practice
          </div>
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            🔥 Keep it up!
          </div>
        </div>

        {/* Engagement Score */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Engagement
          </div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {analytics.engagementScore}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {analytics.engagementScore >= 80
              ? 'Excellent engagement'
              : analytics.engagementScore >= 60
                ? 'Good engagement'
                : 'Needs improvement'}
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      {trend.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Performance Trend (Last 30 Days)
          </h2>

          <div className="overflow-x-auto">
            <div className="space-y-2">
              {trend.map((point, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-slate-600 dark:text-slate-400">
                    {point.date}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 to-green-500 h-full flex items-center justify-center text-white text-xs font-bold transition-all"
                        style={{ width: `${point.score}%` }}
                      >
                        {point.score}%
                      </div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-slate-900 dark:text-slate-100">
                    {point.attemptCount} quiz{point.attemptCount !== 1 ? 'zes' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {attempts.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Recent Quiz Attempts
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-300">
                    Date
                  </th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-300">
                    Quiz
                  </th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-300">
                    Score
                  </th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-300">
                    Time
                  </th>
                  <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-300">
                    Attempt
                  </th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {attempt.timestamp?.toDate?.()?.toLocaleDateString() ||
                        'N/A'}
                    </td>
                    <td className="py-3 px-3 text-slate-900 dark:text-slate-100 font-medium">
                      {attempt.quizTitle}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-bold ${
                          attempt.percentage >= 80
                            ? 'bg-green-500'
                            : attempt.percentage >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                      >
                        {attempt.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {Math.round(attempt.timeSpent / 60)} min
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      #{attempt.attemptNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
          💡 Personalized Insights
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          {analytics.averageScore >= 80 && (
            <li>✓ Excellent performance! Keep up the great work.</li>
          )}
          {analytics.currentStreak >= 7 && (
            <li>✓ Amazing streak! Your consistency is paying off.</li>
          )}
          {analytics.topicsCompleted >= analytics.topicsStarted && (
            <li>✓ You&apos;ve completed all started topics. Time to challenge yourself!</li>
          )}
          {analytics.averageScore < 60 && (
            <li>⚠ Focus on understanding weak topics before moving forward.</li>
          )}
          {analytics.quizzesThisWeek === 0 && (
            <li>💪 Haven&apos;t studied this week yet. Let&apos;s get started!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
