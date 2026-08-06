'use client';

import { useState, useEffect } from 'react';
import {
  getPendingDiscussions,
  getPendingReplies,
} from '@/lib/moderation-service';
import {
  approveDiscussion,
  approveReply,
  rejectDiscussion,
  rejectReply,
} from '@/lib/moderation-service';
import {
  getFlaggedContent,
  resolveFlag,
  dismissFlag,
} from '@/lib/moderation-service';
import { getModerationStats } from '@/lib/moderation-service';
import { UserAvatar } from './UserAvatar';
import { formatDistanceToNow } from 'date-fns';

interface ModerationPanelProps {
  classId: string;
}

type Tab = 'pending-discussions' | 'pending-replies' | 'flagged';

export function ModerationPanel({ classId }: ModerationPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('pending-discussions');
  const [pendingDiscussions, setPendingDiscussions] = useState<any[]>([]);
  const [pendingReplies, setPendingReplies] = useState<any[]>([]);
  const [flaggedContent, setFlaggedContent] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [showRejectForm, setShowRejectForm] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const [discussions, replies, flags, modStats] = await Promise.all([
        getPendingDiscussions(classId),
        getPendingReplies(classId),
        getFlaggedContent(classId),
        getModerationStats(classId),
      ]);

      setPendingDiscussions(discussions);
      setPendingReplies(replies);
      setFlaggedContent(flags);
      setStats(modStats);
      setError(null);
    } catch (err) {
      setError('Failed to load moderation data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [classId]);

  const handleApproveDiscussion = async (discussionId: string) => {
    try {
      setProcessingId(discussionId);
      await approveDiscussion(discussionId, '');
      await loadData();
    } catch (err) {
      console.error('Failed to approve:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectDiscussion = async (
    discussionId: string,
    reason: string,
  ) => {
    try {
      setProcessingId(discussionId);
      await rejectDiscussion(discussionId, reason, '');
      await loadData();
      setShowRejectForm(null);
      setRejectionReason('');
    } catch (err) {
      console.error('Failed to reject:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleApproveReply = async (replyId: string) => {
    try {
      setProcessingId(replyId);
      await approveReply(replyId, '');
      await loadData();
    } catch (err) {
      console.error('Failed to approve:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectReply = async (replyId: string, reason: string) => {
    try {
      setProcessingId(replyId);
      await rejectReply(replyId, reason, '');
      await loadData();
      setShowRejectForm(null);
      setRejectionReason('');
    } catch (err) {
      console.error('Failed to reject:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleResolveFlag = async (
    flagId: string,
    resolution: string,
  ) => {
    try {
      setProcessingId(flagId);
      await resolveFlag(flagId, resolution, '');
      await loadData();
    } catch (err) {
      console.error('Failed to resolve:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDismissFlag = async (flagId: string) => {
    try {
      setProcessingId(flagId);
      await dismissFlag(flagId, '');
      await loadData();
    } catch (err) {
      console.error('Failed to dismiss:', err);
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {stats.pendingDiscussions}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-500">
              Pending Discussions
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {stats.pendingReplies}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-500">
              Pending Replies
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">
              {stats.flaggedContent}
            </div>
            <div className="text-sm text-red-600 dark:text-red-500">
              Flagged Content
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['pending-discussions', 'pending-replies', 'flagged'] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              {tab === 'pending-discussions' && 'Discussions'}
              {tab === 'pending-replies' && 'Replies'}
              {tab === 'flagged' && 'Flagged'}
            </button>
          ),
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Pending Discussions */}
        {activeTab === 'pending-discussions' && (
          <div className="space-y-3">
            {pendingDiscussions.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                No pending discussions
              </p>
            ) : (
              pendingDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {discussion.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <UserAvatar
                      name={discussion.authorName}
                      email={discussion.authorEmail}
                      size="sm"
                    />
                    <span className="text-slate-600 dark:text-slate-400">
                      {discussion.authorName} •{' '}
                      {formatDistanceToNow(discussion.createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {showRejectForm === discussion.id ? (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <input
                        type="text"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Reason for rejection..."
                        className="w-full px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleRejectDiscussion(discussion.id, rejectionReason)
                          }
                          disabled={processingId === discussion.id}
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
                        >
                          Confirm Reject
                        </button>
                        <button
                          onClick={() => {
                            setShowRejectForm(null);
                            setRejectionReason('');
                          }}
                          className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleApproveDiscussion(discussion.id)}
                        disabled={processingId === discussion.id}
                        className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setShowRejectForm(discussion.id)}
                        disabled={processingId === discussion.id}
                        className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Pending Replies */}
        {activeTab === 'pending-replies' && (
          <div className="space-y-3">
            {pendingReplies.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                No pending replies
              </p>
            ) : (
              pendingReplies.map((reply) => (
                <div
                  key={reply.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3"
                >
                  <p className="text-slate-900 dark:text-slate-100">
                    {reply.content}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <UserAvatar
                      name={reply.authorName}
                      email={reply.authorEmail}
                      size="sm"
                    />
                    <span className="text-slate-600 dark:text-slate-400">
                      {reply.authorName} •{' '}
                      {formatDistanceToNow(reply.createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {showRejectForm === reply.id ? (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <input
                        type="text"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Reason for rejection..."
                        className="w-full px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleRejectReply(reply.id, rejectionReason)
                          }
                          disabled={processingId === reply.id}
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
                        >
                          Confirm Reject
                        </button>
                        <button
                          onClick={() => {
                            setShowRejectForm(null);
                            setRejectionReason('');
                          }}
                          className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleApproveReply(reply.id)}
                        disabled={processingId === reply.id}
                        className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setShowRejectForm(reply.id)}
                        disabled={processingId === reply.id}
                        className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Flagged Content */}
        {activeTab === 'flagged' && (
          <div className="space-y-3">
            {flaggedContent.length === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                No flagged content
              </p>
            ) : (
              flaggedContent.map((flag: any) => (
                <div
                  key={flag.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-red-200 dark:border-red-800 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-red-700 dark:text-red-400">
                        {flag.reason}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Reported by {flag.reportedByName} •{' '}
                        {formatDistanceToNow(flag.createdAt.toDate(), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>

                  {flag.details && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {flag.details}
                    </p>
                  )}

                  <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() =>
                        handleResolveFlag(
                          flag.id,
                          'Content removed for violating community guidelines',
                        )
                      }
                      disabled={processingId === flag.id}
                      className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
                    >
                      Remove Content
                    </button>
                    <button
                      onClick={() => handleDismissFlag(flag.id)}
                      disabled={processingId === flag.id}
                      className="px-4 py-1 text-sm border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
