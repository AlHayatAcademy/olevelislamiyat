"use client";

import { useEffect, useState } from "react";
import { WifiOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useServiceWorker } from "@/hooks/useServiceWorker";

export function OfflineIndicator() {
  const { isOnline, pendingSyncs, syncInProgress, handleSync, lastSyncTime } =
    useServiceWorker();
  const [showIndicator, setShowIndicator] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Show indicator if offline or has pending syncs
    setShowIndicator(!isOnline || pendingSyncs > 0);
  }, [isOnline, pendingSyncs]);

  if (!showIndicator) return null;

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 max-w-sm
        ${expanded ? "w-80" : "w-auto"}
      `}
    >
      {/* Compact indicator */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          w-full px-4 py-3 rounded-lg font-medium transition-all
          flex items-center justify-between gap-2
          ${
            !isOnline
              ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-200 border border-red-300 dark:border-red-700"
              : pendingSyncs > 0
                ? "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-200 border border-orange-300 dark:border-orange-700"
                : "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-200 border border-green-300 dark:border-green-700"
          }
        `}
      >
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <>
              <WifiOff size={18} />
              <span className="text-sm font-medium">Offline</span>
            </>
          ) : syncInProgress ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm font-medium">Syncing...</span>
            </>
          ) : pendingSyncs > 0 ? (
            <>
              <AlertCircle size={18} />
              <span className="text-sm font-medium">
                {pendingSyncs} pending
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">Synced</span>
            </>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="text-xs opacity-70 hover:opacity-100 transition-opacity"
        >
          {expanded ? "−" : "+"}
        </button>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div
          className={`
            mt-2 p-4 rounded-lg border bg-white dark:bg-slate-900
            ${
              !isOnline
                ? "border-red-300 dark:border-red-700"
                : "border-slate-200 dark:border-slate-700"
            }
          `}
        >
          {/* Status details */}
          <div className="mb-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Status:</span>
              <span
                className={`
                  font-medium
                  ${
                    isOnline
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                `}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            {pendingSyncs > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Pending:
                </span>
                <span className="font-medium text-orange-600 dark:text-orange-400">
                  {pendingSyncs} quiz attempt{pendingSyncs !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {lastSyncTime && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Last sync:
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {new Date(lastSyncTime).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>

          {/* Sync button */}
          {isOnline && pendingSyncs > 0 && (
            <button
              onClick={() => {
                handleSync();
                // Close after sync completes
                setTimeout(() => setExpanded(false), 2000);
              }}
              disabled={syncInProgress}
              className={`
                w-full py-2 px-3 rounded-md font-medium text-sm transition-all
                ${
                  syncInProgress
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
                }
              `}
            >
              {syncInProgress ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Syncing...
                </div>
              ) : (
                "Sync Now"
              )}
            </button>
          )}

          {/* Info message */}
          {!isOnline && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-950 rounded-md text-xs text-red-700 dark:text-red-200">
              Your quiz attempts will be saved locally and synced when you&apos;re back online.
            </div>
          )}

          {isOnline && pendingSyncs === 0 && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded-md text-xs text-green-700 dark:text-green-200">
              All quiz attempts synced successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Standalone component for displaying sync status badge
export function SyncStatusBadge() {
  const { isOnline, pendingSyncs, syncInProgress } = useServiceWorker();

  if (isOnline && pendingSyncs === 0) return null;

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
        ${
          !isOnline
            ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-200"
            : syncInProgress
              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-200"
              : "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-200"
        }
      `}
    >
      {!isOnline ? (
        <>
          <WifiOff size={14} />
          Offline
        </>
      ) : syncInProgress ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Syncing
        </>
      ) : (
        <>
          <AlertCircle size={14} />
          {pendingSyncs} pending
        </>
      )}
    </div>
  );
}
