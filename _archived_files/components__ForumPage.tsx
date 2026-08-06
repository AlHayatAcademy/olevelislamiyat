'use client';

import { useState } from 'react';
import { createDiscussion } from '@/lib/discussion-service';
import { DiscussionList } from './DiscussionList';
import { DiscussionThread } from './DiscussionThread';

interface ForumPageProps {
  classId: string;
  className: string;
  currentUserId: string;
  currentUserName: string;
  userEmail: string;
  userRole: 'teacher' | 'student';
}

export function ForumPage({
  classId,
  className,
  currentUserId,
  currentUserName,
  userEmail,
  userRole,
}: ForumPageProps) {
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    string | null
  >(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!createTitle.trim() || !createContent.trim()) {
      setCreateError('Title and content are required');
      return;
    }

    try {
      setIsCreating(true);
      setCreateError(null);

      const discussionId = await createDiscussion(
        classId,
        createTitle,
        createContent,
        currentUserId,
        currentUserName,
        userEmail,
        userRole,
      );

      setCreateTitle('');
      setCreateContent('');
      setShowCreateForm(false);
      setRefreshKey((k) => k + 1);
      setSelectedDiscussionId(discussionId);
    } catch (err) {
      setCreateError('Failed to create discussion');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {className} Forum
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discuss topics, ask questions, and help each other learn.
        </p>
      </div>

      {/* Create Discussion Button */}
      {!showCreateForm && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-full sm:w-auto"
        >
          ➕ New Discussion
        </button>
      )}

      {/* Create Discussion Form */}
      {showCreateForm && (
        <form
          onSubmit={handleCreateDiscussion}
          className="mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Start a New Discussion
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={createTitle}
              onChange={(e) => setCreateTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Details
            </label>
            <textarea
              value={createContent}
              onChange={(e) => setCreateContent(e.target.value)}
              placeholder="Provide more context and details..."
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Error */}
          {createError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
              {createError}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? 'Posting...' : 'Post Discussion'}
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discussion List - Sidebar on desktop, full width on mobile */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)]">
            <DiscussionList
              classId={classId}
              selectedDiscussionId={selectedDiscussionId || undefined}
              onSelectDiscussion={setSelectedDiscussionId}
              refreshKey={refreshKey}
            />
          </div>
        </div>

        {/* Discussion Thread - Main content on desktop, full width on mobile when selected */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {selectedDiscussionId ? (
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <DiscussionThread
                discussionId={selectedDiscussionId}
                classId={classId}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                userEmail={userEmail}
                userRole={userRole}
                onReplyAdded={() => setRefreshKey((k) => k + 1)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[400px] bg-slate-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
              <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  Select a discussion to view
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                  or create a new one to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
