"use client";

import Link from "next/link";
import { Clock, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { useMobileNav, useHapticFeedback } from "@/hooks/useMobileNav";

interface RevisionItem {
  quizId: string;
  title: string;
  topicTitle: string;
  paper: number;
  section: string;
  currentScore: number;
  lastAttemptedAt: string;
  daysAgo: number;
  daysUntilDue: number;
  dueDate: string;
  urgency: "overdue" | "due-soon" | "upcoming";
  reviewReason: "weak-topic" | "time-decay" | "mastery-check";
}

interface MobileRevisionQueueProps {
  overdueTopics: RevisionItem[];
  dueTodayTopics: RevisionItem[];
  nextInQueueTopics: RevisionItem[];
  totalTopics: number;
}

export function MobileRevisionQueue({
  overdueTopics,
  dueTodayTopics,
  nextInQueueTopics,
  totalTopics,
}: MobileRevisionQueueProps) {
  const { triggerFeedback } = useHapticFeedback();

  const handleItemClick = () => {
    triggerFeedback("light");
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "overdue":
        return "border-l-4 border-red-500 bg-red-50 dark:bg-red-950";
      case "due-soon":
        return "border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950";
      case "upcoming":
        return "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950";
      default:
        return "border-l-4 border-slate-300 dark:border-slate-600";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case "due-soon":
        return <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case "upcoming":
        return <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const RevisionCard = ({ item }: { item: RevisionItem }) => (
    <Link href={`/quiz/${item.quizId}`} onClick={handleItemClick}>
      <div
        className={`
          p-4 rounded-lg mb-3 cursor-pointer transition-all
          active:scale-95 active:opacity-80 ${getUrgencyColor(item.urgency)}
        `}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            {getUrgencyIcon(item.urgency)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base break-words">
                {item.title}
              </h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex-shrink-0">
                Paper {item.paper}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
              {item.topicTitle}
            </p>
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex gap-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Score: {item.currentScore}%
                </span>
              </div>
              {item.daysUntilDue >= 0 && (
                <span className="text-slate-600 dark:text-slate-400">
                  Due in {item.daysUntilDue}d
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-red-50 dark:bg-red-950 rounded-lg p-3 text-center">
          <div className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">
            {overdueTopics.length}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">Overdue</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-3 text-center">
          <div className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
            {dueTodayTopics.length}
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">Due Today</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3 text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {nextInQueueTopics.length}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">Upcoming</div>
        </div>
      </div>

      {/* Overdue section */}
      {overdueTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <AlertCircle size={20} />
            Overdue
          </h2>
          <div className="space-y-3">
            {overdueTopics.map((item) => (
              <RevisionCard key={item.quizId} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Due today section */}
      {dueTodayTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            <Clock size={20} />
            Due Today
          </h2>
          <div className="space-y-3">
            {dueTodayTopics.map((item) => (
              <RevisionCard key={item.quizId} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming section */}
      {nextInQueueTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            Upcoming
          </h2>
          <div className="space-y-3">
            {nextInQueueTopics.slice(0, 5).map((item) => (
              <RevisionCard key={item.quizId} item={item} />
            ))}
            {nextInQueueTopics.length > 5 && (
              <Link href="/revision-queue">
                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-center cursor-pointer active:scale-95 transition-all">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    +{nextInQueueTopics.length - 5} more topics
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {overdueTopics.length === 0 && dueTodayTopics.length === 0 && nextInQueueTopics.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            All caught up! Take another quiz to get started.
          </p>
        </div>
      )}

      {/* Link to full revision queue */}
      <Link
        href="/revision-queue"
        className="block mt-6 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center active:bg-blue-800 transition-all min-h-[56px] flex items-center justify-center"
      >
        View Full Revision Schedule
      </Link>
    </div>
  );
}
