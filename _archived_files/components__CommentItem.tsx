'use client';

import { useState } from 'react';
import { DiscussionReply } from '@/lib/discussion-service';
import { toggleLikeReply, markHelpful, deleteReply } from '@/lib/discussion-service';
import { flagContent } from '@/lib/moderation-service';
import { UserAvatar } from './UserAvatar';
import { formatDistanceToNow } from 'date-fns';

interface CommentItemProps {
  reply: DiscussionReply;
  currentUserId: string;
  currentUserName: string;
  userRole: 'teacher' | 'student';
  classId: string;
  depth?: number;
  onDelete?: () => void;
  onReply?: () => void;
}

export function CommentItem({
  reply,
  currentUserId,
  currentUserName,
  userRole,
  classId,
  depth = 0,
  onDelete,
  onReply,
}: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(
    reply.likedBy?.includes(currentUserId) || false,
  );
  const [likeCount, setLikeCount] = useState(reply.likeCount || 0);
  const [isHelpful, setIsHelpful] = useState(reply.isHelpful || false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = reply.authorId === currentUserId;
  const isTeacher = userRole === 'teacher';
  const maxNestingDepth = depth < 2;

  const handleLike = async () => {
    try {
      await toggleLikeReply(reply.id, currentUserId);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      console.error('Failed to like reply:', err);
    }
  };

  const handleMarkHelpful = async () => {
    if (!isTeacher) return;
    try {
      await markHelpful(reply.id, userRole);
      setIsHelpful(!isHelpful);
    } catch (err) {
      console.error('Failed to mark helpful:', err);
    }
  };

  const handleDelete = async () => {
    if (!isAuthor && !isTeacher) return;
    try {
      setIsDeleting(true);
      await deleteReply(reply.id, currentUserId);
      onDelete?.();
    } catch (err) {
      console.error('Failed to delete reply:', err);
      setIsDeleting(false);
    }
  };

  const handleFlag = async (reason: string) => {
    try {
      await flagContent(
        reply.id,
        'reply',
        reason,
        '',
        currentUserId,
        currentUserName,
        classId,
      );
      setShowReportMenu(false);
      alert('Content flagged for review');
    } catch (err) {
      console.error('Failed to flag content:', err);
    }
  };

  if (reply.status === 'rejected') {
    return (
      <div className="opacity-50 bg-red-50 dark:bg-red-900/10 p-3 rounded text-sm text-red-600 dark:text-red-400">
        This comment was removed by a moderator.
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${depth > 0 ? 'ml-3 sm:ml-6 border-l border-slate-200 dark:border-slate-700 pl-3 sm:pl-4' : ''}`}>
      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-200 dark:border-slate-700">
        {/* Author header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <UserAvatar
              name={reply.authorName}
              email={reply.authorEmail}
              size="sm"
            />
            <div className="min-w-0">
              <p className="font-medium text-sm text-slate-900 dark:text-slate-100">
                {reply.authorName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatDistanceToNow(reply.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setShowReportMenu(!showReportMenu)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              title="More options"
            >
              ⋯
            </button>

            {showReportMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 whitespace-nowrap">
                {isAuthor && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Delete
                  </button>
                )}
                {!isAuthor && (
                  <>
                    <button
                      onClick={() => handleFlag('spam')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs"
                    >
                      Flag as spam
                    </button>
                    <button
                      onClick={() => handleFlag('offensive')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs"
                    >
                      Flag as offensive
                    </button>
                    <button
                      onClick={() => handleFlag('off-topic')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs"
                    >
                      Flag as off-topic
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Helpful indicator */}
        {isHelpful && (
          <div className="mt-2 inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
            ✓ Marked as helpful
          </div>
        )}

        {/* Content */}
        <p className="mt-3 text-slate-900 dark:text-slate-100 text-sm leading-relaxed break-words">
          {reply.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm transition-colors ${
              isLiked
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>{isLiked ? '👍' : '👍'}</span>
            <span>{likeCount}</span>
          </button>

          {maxNestingDepth && (
            <button
              onClick={onReply}
              className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <span>💬</span>
              <span>Reply</span>
            </button>
          )}

          {isTeacher && !isHelpful && reply.status === 'approved' && (
            <button
              onClick={handleMarkHelpful}
              className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <span>✓</span>
              <span>Mark Helpful</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
