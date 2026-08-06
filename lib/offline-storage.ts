"use client";

import { QuizAttemptRecord } from "@/lib/quiz-analytics";

export interface OfflineAction {
  id: string;
  type: "quiz-attempt" | "progress-update";
  timestamp: string;
  data: unknown;
  synced: boolean;
  syncedAt?: string;
}

export async function queueOfflineAttempt(_attempt: QuizAttemptRecord & { quizId: string }): Promise<string> {
  const id = `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  console.log("[Offline] Queued quiz attempt (stub):", id);
  return id;
}

export async function getPendingSyncs(): Promise<OfflineAction[]> {
  return [];
}

export async function syncOfflineQuizAttempts(): Promise<{
  synced: number;
  failed: number;
}> {
  return { synced: 0, failed: 0 };
}

export async function markSyncComplete(_actionId: string): Promise<void> {
  console.log("[Offline] Marked as synced (stub):", _actionId);
}

export async function clearOfflineData(): Promise<void> {
  console.log("[Offline] Cleared all offline data (stub)");
}

export async function requestBackgroundSync(_tag: string): Promise<void> {
  console.log("[Offline] Background sync requested (stub):", _tag);
}

export async function getOfflineDataStats(): Promise<{
  pendingAttempts: number;
  pendingActions: number;
  cachedBytes: number;
}> {
  return { pendingAttempts: 0, pendingActions: 0, cachedBytes: 0 };
}

export function listenToNetworkChanges(_callback: (isOnline: boolean) => void): () => void {
  return () => {};
}
