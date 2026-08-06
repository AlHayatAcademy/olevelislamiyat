'use client';

import { useState, useRef, useEffect } from 'react';
import { answerQuestion, streamAnswer } from '@/lib/qa-service';
import { checkRateLimit } from '@/lib/ai-service';

interface QAInterfaceProps {
  classId: string;
  userId: string;
  userName: string;
  userEmail: string;
  onAnswered?: () => void;
}

const MAX_QUESTION_LENGTH = 500;

export function QAInterface({
  classId,
  userId,
  userName,
  userEmail,
  onAnswered,
}: QAInterfaceProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleAutoExpand = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(
        inputRef.current.scrollHeight,
        200,
      ) + 'px';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      setError(`Question exceeds maximum length (${MAX_QUESTION_LENGTH} characters)`);
      return;
    }

    // Check rate limit
    const canAsk = await checkRateLimit(userId);
    if (!canAsk) {
      setError('Daily question limit reached. Try again tomorrow or upgrade.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setAnswer('');
      setShowAnswer(true);
      setIsStreaming(true);

      // Stream answer
      const { topicIds, topicNames } = await streamAnswer(
        question,
        { userId, classId },
        (chunk) => {
          setAnswer((prev) => prev + chunk);
        },
      );

      setSources(topicNames);

      // Save Q&A record
      await answerQuestion(question, {
        userId,
        userEmail,
        userName,
        classId,
      });

      setQuestion('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
      setHasAsked(true);
      onAnswered?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to answer question. Please try again.',
      );
      setShowAnswer(false);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  // Auto-scroll to answer
  useEffect(() => {
    if (showAnswer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAnswer]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Ask AI Tutor
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Ask any question about Islamiyat and get instant answers
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Your Question
          </label>
          <textarea
            ref={inputRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onInput={handleAutoExpand}
            placeholder="Ask anything about Islamiyat... e.g., 'What is the meaning of Surah Al-Fatiha?'"
            maxLength={MAX_QUESTION_LENGTH}
            className="w-full min-h-[100px] p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {question.length} / {MAX_QUESTION_LENGTH}
            </div>
            {hasAsked && (
              <span className="text-xs text-green-600 dark:text-green-400">
                ✓ Question saved
              </span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? 'Getting answer...' : '✨ Ask'}
        </button>
      </form>

      {/* Answer Section */}
      {showAnswer && (
        <div ref={answerRef} className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
              {isStreaming ? 'AI Tutor is thinking...' : 'Answer'}
            </h3>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 min-h-[100px]">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-100 leading-relaxed">
                  {answer || (isStreaming && '⏳ Generating answer...')}
                </p>
              </div>
            </div>
          </div>

          {/* Sources */}
          {sources.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Related Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {sources.map((source, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                  >
                    📚 {source}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {!isStreaming && (
            <div className="flex gap-2 pt-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
                👍 Helpful
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
                📋 Copy
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
                💾 Save
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded">
        💡 Tip: Ask clear, specific questions for better answers. For example: "Explain the Five Pillars" is better than "Tell me about Islam"
      </div>
    </div>
  );
}
