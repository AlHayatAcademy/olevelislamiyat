"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw, CheckCircle2, XCircle, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Quiz as QuizData, QuizQuestion } from "@/data/quizzes";

interface QuizProps {
  quiz: QuizData;
}

// Answer shapes stored per question, keyed by question id.
type StoredAnswer =
  | { type: "multiple-choice"; selectedIndex: number }
  | { type: "true-false"; selectedValue: boolean }
  | { type: "matching"; selectedRight: string[] }; // parallel to shuffled pairs' left order

interface StoredProgress {
  answers: Record<string, StoredAnswer>;
  bestScorePercent: number;
  lastAttemptPercent: number;
  attempts: number;
}

function storageKey(quizId: string) {
  return `olevelislamiyat:quiz:${quizId}`;
}

function loadProgress(quizId: string): StoredProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(quizId));
    if (!raw) return null;
    return JSON.parse(raw) as StoredProgress;
  } catch {
    return null;
  }
}

function saveProgress(quizId: string, progress: StoredProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(quizId), JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private browsing, quota) — fail silently.
  }
}

function isQuestionAnswered(answer: StoredAnswer | undefined): boolean {
  if (!answer) return false;
  if (answer.type === "matching") return answer.selectedRight.every((v) => v !== "");
  return true;
}

function isQuestionCorrect(question: QuizQuestion, answer: StoredAnswer | undefined): boolean {
  if (!answer) return false;
  if (question.type === "multiple-choice" && answer.type === "multiple-choice") {
    return answer.selectedIndex === question.correctIndex;
  }
  if (question.type === "true-false" && answer.type === "true-false") {
    return answer.selectedValue === question.correctAnswer;
  }
  if (question.type === "matching" && answer.type === "matching") {
    return question.pairs.every((pair, i) => answer.selectedRight[i] === pair.right);
  }
  return false;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  // Simple deterministic shuffle so re-renders don't reshuffle mid-attempt.
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Quiz({ quiz }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, StoredAnswer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [bestScorePercent, setBestScorePercent] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const progress = loadProgress(quiz.id);
    if (progress) {
      setBestScorePercent(progress.bestScorePercent);
      setAttempts(progress.attempts);
    }
  }, [quiz.id]);

  const totalQuestions = quiz.questions.length;

  const answeredCount = useMemo(
    () => quiz.questions.filter((q) => isQuestionAnswered(answers[q.id])).length,
    [quiz.questions, answers],
  );

  const correctCount = useMemo(
    () => quiz.questions.filter((q) => isQuestionCorrect(q, answers[q.id])).length,
    [quiz.questions, answers],
  );

  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const allAnswered = answeredCount === totalQuestions;

  function setAnswer(questionId: string, answer: StoredAnswer) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
    const newAttempts = attempts + 1;
    const newBest = bestScorePercent === null ? scorePercent : Math.max(bestScorePercent, scorePercent);
    setAttempts(newAttempts);
    setBestScorePercent(newBest);
    saveProgress(quiz.id, {
      answers,
      bestScorePercent: newBest,
      lastAttemptPercent: scorePercent,
      attempts: newAttempts,
    });
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setReviewMode(false);
  }

  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  if (submitted && !reviewMode) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8" role="status" aria-live="polite">
        <div className="flex items-center gap-2 text-secondary">
          <ListChecks size={22} aria-hidden="true" />
          <h2 className="font-heading text-xl font-semibold text-text">Quiz complete</h2>
        </div>
        <p className="mt-4 text-4xl font-bold font-heading text-primary">
          {correctCount} / {totalQuestions}
        </p>
        <p className="mt-1 text-text-muted">You scored {scorePercent}% on this attempt.</p>
        {bestScorePercent !== null && (
          <p className="mt-1 text-sm text-text-muted">
            Best score so far: {bestScorePercent}% &middot; Attempts: {attempts}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-heading font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <RotateCcw size={18} aria-hidden="true" />
            Retry quiz
          </button>
          <button
            type="button"
            onClick={() => setReviewMode(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-2.5 font-heading font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Review answers
          </button>
          <Link
            href={`/paper-${quiz.paper}/${quiz.section}/${quiz.topicSlug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-heading font-semibold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Revisit the lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>
            {submitted ? "Reviewing answers" : `${answeredCount} of ${totalQuestions} answered`}
          </span>
          {submitted && (
            <span className="font-semibold text-primary">
              Score: {correctCount} / {totalQuestions} ({scorePercent}%)
            </span>
          )}
        </div>
        <div
          role="progressbar"
          aria-valuenow={submitted ? 100 : progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-soft"
        >
          <div
            className="h-full rounded-full bg-secondary transition-all duration-300"
            style={{ width: `${submitted ? 100 : progressPercent}%` }}
          />
        </div>
      </div>

      <ol className="space-y-6">
        {quiz.questions.map((question, index) => (
          <li key={question.id}>
            <QuestionBlock
              question={question}
              index={index}
              answer={answers[question.id]}
              submitted={submitted}
              onAnswer={(a) => setAnswer(question.id, a)}
            />
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            Submit answers
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Retry quiz
            </button>
            <button
              type="button"
              onClick={() => setReviewMode(false)}
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 font-heading font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Back to summary
            </button>
          </>
        )}
        {!submitted && !allAnswered && (
          <p className="self-center text-sm text-text-muted">
            Answer all {totalQuestions} questions to submit.
          </p>
        )}
      </div>
    </div>
  );
}

interface QuestionBlockProps {
  question: QuizQuestion;
  index: number;
  answer: StoredAnswer | undefined;
  submitted: boolean;
  onAnswer: (answer: StoredAnswer) => void;
}

function QuestionBlock({ question, index, answer, submitted, onAnswer }: QuestionBlockProps) {
  const correct = submitted && isQuestionCorrect(question, answer);
  const incorrect = submitted && !isQuestionCorrect(question, answer);

  return (
    <fieldset
      className={cn(
        "rounded-xl border bg-surface p-5",
        submitted && correct && "border-success",
        submitted && incorrect && "border-error",
        !submitted && "border-border",
      )}
    >
      <legend className="px-1 font-heading text-base font-semibold text-text">
        {index + 1}. {question.question}
      </legend>

      {question.type === "multiple-choice" && (
        <McqOptions question={question} answer={answer} submitted={submitted} onAnswer={onAnswer} />
      )}
      {question.type === "true-false" && (
        <TrueFalseOptions question={question} answer={answer} submitted={submitted} onAnswer={onAnswer} />
      )}
      {question.type === "matching" && (
        <MatchingOptions question={question} answer={answer} submitted={submitted} onAnswer={onAnswer} />
      )}

      {submitted && (
        <div
          className={cn(
            "mt-4 flex gap-2 rounded-lg p-3 text-sm",
            correct ? "bg-success/10 text-success" : "bg-error/10 text-error",
          )}
          role="status"
        >
          {correct ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          ) : (
            <XCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          )}
          <div>
            <p className="font-semibold">{correct ? "Correct" : "Not quite"}</p>
            <p className="mt-1 text-text">{question.explanation}</p>
          </div>
        </div>
      )}
    </fieldset>
  );
}

function McqOptions({
  question,
  answer,
  submitted,
  onAnswer,
}: {
  question: Extract<QuizQuestion, { type: "multiple-choice" }>;
  answer: StoredAnswer | undefined;
  submitted: boolean;
  onAnswer: (a: StoredAnswer) => void;
}) {
  const selectedIndex = answer?.type === "multiple-choice" ? answer.selectedIndex : undefined;
  return (
    <div className="mt-3 space-y-2">
      {question.options.map((option, i) => {
        const isSelected = selectedIndex === i;
        const isCorrectOption = i === question.correctIndex;
        return (
          <label
            key={i}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition-colors",
              !submitted && isSelected && "border-primary bg-surface-soft",
              !submitted && !isSelected && "border-border hover:border-primary",
              submitted && isCorrectOption && "border-success bg-success/10",
              submitted && isSelected && !isCorrectOption && "border-error bg-error/10",
              submitted && !isSelected && !isCorrectOption && "border-border opacity-70",
            )}
          >
            <input
              type="radio"
              name={question.id}
              value={i}
              checked={isSelected ?? false}
              disabled={submitted}
              onChange={() => onAnswer({ type: "multiple-choice", selectedIndex: i })}
              className="h-4 w-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            <span className="text-text">{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function TrueFalseOptions({
  question,
  answer,
  submitted,
  onAnswer,
}: {
  question: Extract<QuizQuestion, { type: "true-false" }>;
  answer: StoredAnswer | undefined;
  submitted: boolean;
  onAnswer: (a: StoredAnswer) => void;
}) {
  const selectedValue = answer?.type === "true-false" ? answer.selectedValue : undefined;
  const options: { label: string; value: boolean }[] = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];
  return (
    <div className="mt-3 flex gap-3">
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        const isCorrectOption = opt.value === question.correctAnswer;
        return (
          <label
            key={opt.label}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors",
              !submitted && isSelected && "border-primary bg-surface-soft",
              !submitted && !isSelected && "border-border hover:border-primary",
              submitted && isCorrectOption && "border-success bg-success/10",
              submitted && isSelected && !isCorrectOption && "border-error bg-error/10",
              submitted && !isSelected && !isCorrectOption && "border-border opacity-70",
            )}
          >
            <input
              type="radio"
              name={question.id}
              value={String(opt.value)}
              checked={isSelected ?? false}
              disabled={submitted}
              onChange={() => onAnswer({ type: "true-false", selectedValue: opt.value })}
              className="h-4 w-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            <span className="text-text">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function MatchingOptions({
  question,
  answer,
  submitted,
  onAnswer,
}: {
  question: Extract<QuizQuestion, { type: "matching" }>;
  answer: StoredAnswer | undefined;
  submitted: boolean;
  onAnswer: (a: StoredAnswer) => void;
}) {
  // Shuffle right-hand options once per question (deterministic by question id length as seed).
  const seed = useMemo(
    () => question.pairs.reduce((acc, p) => acc + p.right.length, question.id.length),
    [question],
  );
  const shuffledRightOptions = useMemo(
    () => shuffle(question.pairs.map((p) => p.right), seed),
    [question.pairs, seed],
  );
  const selectedRight = answer?.type === "matching" ? answer.selectedRight : question.pairs.map(() => "");

  function updatePair(pairIndex: number, value: string) {
    const next = [...selectedRight];
    next[pairIndex] = value;
    onAnswer({ type: "matching", selectedRight: next });
  }

  return (
    <div className="mt-3 space-y-2">
      {question.pairs.map((pair, i) => {
        const selection = selectedRight[i] ?? "";
        const isCorrect = selection === pair.right;
        return (
          <div key={pair.left} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <label htmlFor={`${question.id}-${i}`} className="w-full text-sm font-medium text-text sm:w-1/3">
              {pair.left}
            </label>
            <select
              id={`${question.id}-${i}`}
              value={selection}
              disabled={submitted}
              onChange={(e) => updatePair(i, e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-2/3",
                !submitted && "border-border",
                submitted && isCorrect && "border-success bg-success/10",
                submitted && !isCorrect && "border-error bg-error/10",
              )}
            >
              <option value="" disabled>
                Select a match&hellip;
              </option>
              {shuffledRightOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
