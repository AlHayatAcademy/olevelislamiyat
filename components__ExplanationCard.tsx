'use client';

import { useState, useEffect } from 'react';
import { generateSimpleExplanation, generateDetailedExplanation, generateVisualDescription } from '@/lib/explanation-service';

interface ExplanationCardProps {
  topicId: string;
  topicName: string;
  topicContent: string;
  userId?: string;
  onRelatedTopic?: (topicId: string) => void;
}

type ExplanationStyle = 'simple' | 'detailed' | 'visual';

export function ExplanationCard({
  topicId,
  topicName,
  topicContent,
  userId,
  onRelatedTopic,
}: ExplanationCardProps) {
  const [activeStyle, setActiveStyle] = useState<ExplanationStyle>('simple');
  const [explanations, setExplanations] = useState<{
    simple?: string;
    detailed?: string;
    visual?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load explanation when style changes
  useEffect(() => {
    if (explanations[activeStyle]) {
      return; // Already loaded
    }

    loadExplanation();
  }, [activeStyle, topicId]);

  const loadExplanation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let explanation = '';

      if (activeStyle === 'simple') {
        explanation = await generateSimpleExplanation(topicId, topicContent, userId);
      } else if (activeStyle === 'detailed') {
        const detailed = await generateDetailedExplanation(topicId, topicContent, userId);
        explanation = detailed.explanation;
      } else if (activeStyle === 'visual') {
        explanation = await generateVisualDescription(topicId, topicContent, userId);
      }

      setExplanations((prev) => ({
        ...prev,
        [activeStyle]: explanation,
      }));
    } catch (err) {
      setError('Failed to generate explanation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const text = explanations[activeStyle] || '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentExplanation = explanations[activeStyle];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {topicName}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          🤖 AI-Generated Explanation
        </p>
      </div>

      {/* Style Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {(['simple', 'detailed', 'visual'] as const).map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeStyle === style
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {style === 'simple' && 'Simple'}
            {style === 'detailed' && 'Detailed'}
            {style === 'visual' && 'Visual'}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
          <span className="ml-3 text-slate-600 dark:text-slate-400">
            Generating {activeStyle} explanation...
          </span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          {error}
          <button
            onClick={loadExplanation}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Explanation Content */}
      {currentExplanation && !isLoading && (
        <div className="space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentExplanation}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                copied
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              👍 Helpful
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              💾 Save
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentExplanation && !isLoading && !error && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          Click a tab to generate explanation
        </div>
      )}
    </div>
  );
}
