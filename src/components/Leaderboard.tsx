'use client';

import { useState } from 'react';
import { LeaderboardEntry } from '@/lib/leaderboard-service';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  isLoading?: boolean;
  sortBy?: 'score' | 'progress' | 'streak';
  onSortChange?: (sortBy: 'score' | 'progress' | 'streak') => void;
}

export function Leaderboard({
  entries,
  currentUserId,
  isLoading = false,
  sortBy = 'score',
  onSortChange,
}: LeaderboardProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">
          No leaderboard data available yet
        </p>
      </div>
    );
  }

  // Get current user entry
  const currentUserEntry = entries.find((e) => e.userId === currentUserId);

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex gap-2 flex-wrap">
        {(['score', 'progress', 'streak'] as const).map((option) => (
          <button
            key={option}
            onClick={() => onSortChange?.(option)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              sortBy === option
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {option === 'score' && '📊 Score'}
            {option === 'progress' && '📈 Progress'}
            {option === 'streak' && '🔥 Streak'}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">
                Student
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                Score
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                Quizzes
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                Topics
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                Streak
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                Badges
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr
                key={entry.userId}
                className={`border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                  entry.userId === currentUserId
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <td className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                  {entry.rank === 1 && '🥇'}
                  {entry.rank === 2 && '🥈'}
                  {entry.rank === 3 && '🥉'}
                  {entry.rank > 3 && <span className="text-slate-500">#</span>}
                  {entry.rank}
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {entry.userName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {entry.userEmail}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm">
                    {entry.score}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-slate-900 dark:text-slate-100">
                  {entry.quizzesCompleted}
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-slate-900 dark:text-slate-100">
                  {entry.topicsCompleted}
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-slate-900 dark:text-slate-100">
                  {(entry.streak ?? 0) > 0 && '🔥'}
                  {entry.streak ?? 0} days
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-slate-900 dark:text-slate-100">
                  {(entry.badges?.length ?? 0) > 0 ? (
                    <span className="text-lg">{entry.badges?.length}</span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.userId}
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 ${
              entry.userId === currentUserId
                ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl font-bold w-8">
                {entry.rank === 1 && '🥇'}
                {entry.rank === 2 && '🥈'}
                {entry.rank === 3 && '🥉'}
                {entry.rank > 3 && entry.rank}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {entry.userName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {entry.userEmail}
                </p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {entry.score}%
                </div>
              </div>
            </div>

            <div
              className="cursor-pointer text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              onClick={() =>
                setExpanded(expanded === entry.userId ? null : entry.userId)
              }
            >
              {expanded === entry.userId ? '▼' : '▶'} Details
            </div>

            {expanded === entry.userId && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Quizzes
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {entry.quizzesCompleted}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Topics
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {entry.topicsCompleted}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Streak
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {(entry.streak ?? 0) > 0 && '🔥'}
                    {entry.streak ?? 0} days
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Badges
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {entry.badges?.length ?? 0}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current User Highlight */}
      {currentUserEntry && !entries.includes(currentUserEntry) && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Your Rank:</strong> #{currentUserEntry.rank} out of{' '}
            {entries.length} students
          </p>
        </div>
      )}
    </div>
  );
}
