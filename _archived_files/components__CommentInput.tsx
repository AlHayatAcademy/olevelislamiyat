'use client';

import { useState, useRef, useEffect } from 'react';
import { addReply } from '@/lib/discussion-service';

interface CommentInputProps {
  discussionId: string;
  userId: string;
  userName: string;
  userRole: 'teacher' | 'student';
  parentReplyId?: string;
  onReplyAdded?: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const MAX_LENGTH = 5000;

export function CommentInput({
  discussionId,
  userId,
  userName,
  userRole,
  parentReplyId,
  onReplyAdded,
  onCancel,
  autoFocus = false,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleAutoExpand = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        300,
      ) + 'px';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (content.length > MAX_LENGTH) {
      setError(`Comment exceeds maximum length (${MAX_LENGTH} characters)`);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await addReply(
        discussionId,
        content.trim(),
        userId,
        userName,
        userId + '@platform',
        userRole,
        parentReplyId,
      );

      setContent('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      onReplyAdded?.();
    } catch (err) {
      setError('Failed to submit comment');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-4 space-y-3"
    >
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
          Your comment
        </label>

        {showPreview ? (
          <div className="min-h-[100px] p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 whitespace-pre-wrap break-words">
            {content || 'No content'}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onInput={handleAutoExpand}
            placeholder="Share your thoughts, ask a question, or provide an answer..."
            className="w-full min-h-[100px] p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        )}

        {/* Character count */}
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {content.length} / {MAX_LENGTH} characters
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {/* Formatting help */}
      <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
        💡 Tip: Use clear language and stay on topic. Be respectful to others.
      </div>
    </form>
  );
}
