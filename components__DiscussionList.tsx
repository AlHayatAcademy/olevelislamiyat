'use client';

import { useState, useEffect } from 'react';
import { getDiscussions, Discussion } from '@/lib/discussion-service';
import { UserAvatar } from './UserAvatar';
import { formatDistanceToNow } from 'date-fns';

interface DiscussionListProps {
  classId: string;
  selectedDiscussionId?: string;
  onSelectDiscussion: (id: string) => void;
  refreshKey?: number;
}

type SortOption = 'recent' | 'popular' | 'mostReplies';
type FilterTab = 'all' | 'pinned' | 'unanswered';

export function DiscussionList({
  classId,
  selectedDiscussionId,
  onSelectDiscussion,
  refreshKey = 0,
}: DiscussionListProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        setIsLoading(true);
        const data = await getDiscussions(classId, {
          sortBy,
          status: 'approved',
          limit: 50,
        });

        let filtered = data;

        if (filterTab === 'pinned') {
          filtered = data.filter((d) => d.isPinned);
        } else if (filterTab === 'unanswered') {
          filtered = data.filter((d) => d.replyCount === 0);
        }

        setDiscussions(filtered);
        setError(null);
      } catch (err) {
        setError('Failed to load discussions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiscussions();
  }, [classId, sortBy, filterTab, refreshKey]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {(['all', 'pinned', 'unanswered'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              filterTab === tab
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {tab === 'all' && 'All'}
            {tab === 'pinned' && '📌 Pinned'}
            {tab === 'unanswered' && '❓ Unanswered'}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        {(['recent', 'popular', 'mostReplies'] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              sortBy === option
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {option === 'recent' && 'Recent'}
            {option === 'popular' && 'Popular'}
            {option === 'mostReplies' && 'Most Replies'}
          </button>
        ))}
      </div>

      {/* Discussion List */}
      <div className="space-y-2">
        {discussions.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No discussions yet. Be the first to start one!
          </div>
        ) : (
          discussions.map((discussion) => (
            <button
              key={discussion.id}
              onClick={() => onSelectDiscussion(discussion.id)}
              className={`
                w-full text-left p-3 sm:p-4 rounded-lg
                transition-all duration-200
                ${
                  selectedDiscussionId === discussion.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-400'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }
              `}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Pin indicator */}
                {discussion.isPinned && (
                  <div className="text-lg flex-shrink-0">📌</div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                      {discussion.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">
                    {discussion.content}
                  </p>

                  {/* Author and stats */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="font-medium">{discussion.authorName}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(discussion.createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <span>💬</span>
                      <span>{discussion.replyCount} replies</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <span>👁️</span>
                      <span>{discussion.viewCount} views</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {discussion.tagIds.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {discussion.tagIds.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {discussion.tagIds.length > 3 && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          +{discussion.tagIds.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
