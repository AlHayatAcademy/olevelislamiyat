'use client';

import { useState, useEffect } from 'react';
import {
  getDiscussionById,
  getReplies,
  incrementViewCount,
  Discussion,
  DiscussionReply,
} from '@/lib/discussion-service';
import { trackView } from '@/lib/engagement-service';
import { UserAvatar } from './UserAvatar';
import { CommentItem } from './CommentItem';
import { CommentInput } from './CommentInput';
import { formatDistanceToNow } from 'date-fns';

interface DiscussionThreadProps {
  discussionId: string;
  classId: string;
  currentUserId: string;
  currentUserName: string;
  userEmail: string;
  userRole: 'teacher' | 'student';
  onReplyAdded?: () => void;
}

export function DiscussionThread({
  discussionId,
  classId,
  currentUserId,
  currentUserName,
  userEmail,
  userRole,
  onReplyAdded,
}: DiscussionThreadProps) {
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [replies, setReplies] = useState<DiscussionReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  // Load discussion and replies
  useEffect(() => {
    const loadThread = async () => {
      try {
        setIsLoading(true);

        // Track view
        trackView(discussionId, currentUserId, currentUserName, classId).catch(
          console.error,
        );

        // Increment view count
        await incrementViewCount(discussionId);

        // Get discussion
        const disc = await getDiscussionById(discussionId);
        if (!disc) throw new Error('Discussion not found');
        setDiscussion(disc);

        // Get replies
        const repliesList = await getReplies(discussionId, {
          status: 'approved',
        });
        setReplies(repliesList);

        setError(null);
      } catch (err) {
        setError('Failed to load discussion');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadThread();
  }, [discussionId, currentUserId, currentUserName, classId]);

  const handleReplyAdded = () => {
    onReplyAdded?.();
    setReplyingToId(null);

    // Reload replies
    getReplies(discussionId, { status: 'approved' })
      .then(setReplies)
      .catch(console.error);

    // Reload discussion to get updated reply count
    getDiscussionById(discussionId)
      .then((d) => d && setDiscussion(d))
      .catch(console.error);
  };

  const handleReplyDelete = () => {
    // Reload replies
    getReplies(discussionId, { status: 'approved' })
      .then(setReplies)
      .catch(console.error);

    // Reload discussion to get updated reply count
    getDiscussionById(discussionId)
      .then((d) => d && setDiscussion(d))
      .catch(console.error);
  };

  // Group replies by parent
  const buildReplyTree = () => {
    const topLevelReplies: (DiscussionReply & { children: DiscussionReply[] })[] =
      [];

    replies.forEach((reply) => {
      if (!reply.parentReplyId) {
        topLevelReplies.push({ ...reply, children: [] });
      }
    });

    // Add child replies
    replies.forEach((reply) => {
      if (reply.parentReplyId) {
        const parent = topLevelReplies.find(
          (r) => r.id === reply.parentReplyId,
        );
        if (parent) {
          parent.children.push(reply);
        }
      }
    });

    return topLevelReplies;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !discussion) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
        {error || 'Discussion not found'}
      </div>
    );
  }

  const replyTree = buildReplyTree();

  return (
    <div className="space-y-6">
      {/* Discussion Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          {discussion.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <UserAvatar
            name={discussion.authorName}
            email={discussion.authorEmail}
            size="md"
          />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {discussion.authorName}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {formatDistanceToNow(discussion.createdAt.toDate(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
          <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-100 break-words">
            {discussion.content}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>💬</span>
            <span>{discussion.replyCount} replies</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>👁️</span>
            <span>{discussion.viewCount} views</span>
          </div>
        </div>
      </div>

      {/* Replies Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {discussion.replyCount} {discussion.replyCount === 1 ? 'Reply' : 'Replies'}
        </h2>

        {replyTree.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No replies yet. Be the first to respond!
          </div>
        ) : (
          <div className="space-y-4">
            {replyTree.map((reply) => (
              <div key={reply.id}>
                <CommentItem
                  reply={reply}
                  currentUserId={currentUserId}
                  currentUserName={currentUserName}
                  userRole={userRole}
                  classId={classId}
                  depth={0}
                  onDelete={handleReplyDelete}
                  onReply={() => setReplyingToId(reply.id)}
                />

                {/* Nested replies */}
                {reply.children.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {reply.children.map((childReply) => (
                      <CommentItem
                        key={childReply.id}
                        reply={childReply}
                        currentUserId={currentUserId}
                        currentUserName={currentUserName}
                        userRole={userRole}
                        classId={classId}
                        depth={1}
                        onDelete={handleReplyDelete}
                        onReply={() => setReplyingToId(childReply.id)}
                      />
                    ))}
                  </div>
                )}

                {/* Nested reply input */}
                {replyingToId === reply.id && (
                  <div className="mt-4 ml-3 sm:ml-6">
                    <CommentInput
                      discussionId={discussionId}
                      userId={currentUserId}
                      userName={currentUserName}
                      userRole={userRole}
                      parentReplyId={reply.id}
                      onReplyAdded={handleReplyAdded}
                      onCancel={() => setReplyingToId(null)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top-level reply input */}
      {replyingToId === null && (
        <div className="sticky bottom-0 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pt-4 pb-2 sm:sticky-0">
          <CommentInput
            discussionId={discussionId}
            userId={currentUserId}
            userName={currentUserName}
            userRole={userRole}
            onReplyAdded={handleReplyAdded}
          />
        </div>
      )}
    </div>
  );
}
