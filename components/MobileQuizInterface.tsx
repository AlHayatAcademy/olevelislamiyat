"use client";

import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useMobileNav, useHapticFeedback } from "@/hooks/useMobileNav";

interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "structured";
  options?: string[];
  correct?: string;
  marks?: number;
}

interface MobileQuizInterfaceProps {
  questions: Question[];
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  answers: Record<string, string>;
  isReview?: boolean;
}

export function MobileQuizInterface({
  questions,
  onAnswer,
  onNext,
  onPrevious,
  currentIndex,
  answers,
  isReview = false,
}: MobileQuizInterfaceProps) {
  const { detectSwipe, swipeCoordinates } = useMobileNav();
  const { triggerFeedback } = useHapticFeedback();
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;
  const currentAnswer = answers[currentQuestion.id];

  useEffect(() => {
    if (!swipeCoordinates) return;

    const swipe = detectSwipe();
    if (swipe.direction === "right" && !isFirstQuestion) {
      triggerFeedback("light");
      setSwipeDirection("right");
      onPrevious();
    } else if (swipe.direction === "left" && !isLastQuestion) {
      triggerFeedback("light");
      setSwipeDirection("left");
      onNext();
    }

    setTimeout(() => setSwipeDirection(null), 200);
  }, [swipeCoordinates, detectSwipe, isFirstQuestion, isLastQuestion, onNext, onPrevious, triggerFeedback]);

  const handleOptionSelect = (option: string) => {
    if (!isReview) {
      triggerFeedback("medium");
      onAnswer(currentQuestion.id, option);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 touch-none">
      {/* Progress indicator */}
      <div className="px-4 py-3 sm:px-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
          {currentQuestion.marks && (
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {currentQuestion.marks} marks
            </span>
          )}
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white leading-relaxed mb-6">
            {currentQuestion.text}
          </h2>

          {/* Multiple choice options */}
          {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option, idx) => {
                const optionLetter = String.fromCharCode(65 + idx);
                const isSelected = currentAnswer === option;
                const isCorrect = isReview && option === currentQuestion.correct;
                const isWrong = isReview && currentAnswer === option && option !== currentQuestion.correct;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isReview}
                    className={`
                      w-full p-4 sm:p-5 text-left rounded-lg border-2 transition-all
                      min-h-[56px] sm:min-h-[60px] flex items-center gap-3
                      ${
                        isWrong
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : isSelected
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                              : "border-slate-300 dark:border-slate-600 hover:border-blue-400 active:bg-blue-50 dark:active:bg-slate-800"
                      }
                      ${isReview ? "cursor-default" : "cursor-pointer active:scale-95"}
                    `}
                  >
                    <span
                      className={`
                        flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold
                        flex items-center justify-center text-sm
                        ${
                          isWrong
                            ? "bg-red-500 text-white"
                            : isCorrect
                              ? "bg-green-500 text-white"
                              : isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                        }
                      `}
                    >
                      {optionLetter}
                    </span>
                    <span className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Structured question - text input */}
          {currentQuestion.type === "structured" && (
            <textarea
              value={currentAnswer || ""}
              onChange={(e) => handleOptionSelect(e.target.value)}
              disabled={isReview}
              placeholder="Type your answer here..."
              className={`
                w-full p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                focus:border-blue-500 focus:outline-none min-h-[120px]
                text-base leading-relaxed
              `}
            />
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="px-4 py-4 sm:px-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className={`
              flex items-center justify-center gap-2 px-5 py-3 sm:py-4
              rounded-lg font-medium transition-all min-h-[56px]
              ${
                isFirstQuestion
                  ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  : "bg-white dark:bg-slate-700 text-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 active:bg-slate-100 dark:active:bg-slate-600"
              }
            `}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={onNext}
            disabled={isLastQuestion}
            className={`
              flex-1 flex items-center justify-center gap-2 px-5 py-3 sm:py-4
              rounded-lg font-medium transition-all min-h-[56px]
              ${
                isLastQuestion
                  ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
              }
            `}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Swipe hint on mobile */}
        {!isReview && (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
            💬 Swipe left/right to navigate
          </p>
        )}
      </div>
    </div>
  );
}
