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

interface DB {
  transaction(
    storeName: string,
    mode: IDBTransactionMode,
  ): IDBTransaction;
  close(): void;
}

// Open IndexedDB
async function openDB(): Promise<DB> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OLevelIslamiyat", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as DB);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains("quiz-attempts")) {
        db.createObjectStore("quiz-attempts", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("offline-actions")) {
        const store = db.createObjectStore("offline-actions", { keyPath: "id" });
        store.createIndex("synced", "synced", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }

      if (!db.objectStoreNames.contains("cached-data")) {
        db.createObjectStore("cached-data", { keyPath: "key" });
      }
    };
  });
}

// Queue offline quiz attempt
export async function queueOfflineAttempt(
  attempt: QuizAttemptRecord & { quizId: string },
): Promise<string> {
  const db = await openDB();
  const id = `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return new Promise((resolve, reject) => {
    const tx = db.transaction("offline-actions", "readwrite");
    const store = tx.objectStore("offline-actions");

    const action: OfflineAction = {
      id,
      type: "quiz-attempt",
      timestamp: new Date().toISOString(),
      data: attempt,
      synced: false,
    };

    const request = store.add(action);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      console.log("[Offline] Queued quiz attempt:", id);
      resolve(id);
    };
  });
}

// Get pending syncs
export async function getPendingSyncs(): Promise<OfflineAction[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("offline-actions", "readonly");
    const store = tx.objectStore("offline-actions");
    const index = store.index("synced");
    const request = index.getAll(false);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const actions = request.result as OfflineAction[];
      console.log(`[Offline] Found ${actions.length} pending syncs`);
      resolve(actions);
    };
  });
}

// Sync offline quiz attempts to server
export async function syncOfflineQuizAttempts(): Promise<{
  synced: number;
  failed: number;
}> {
  const pendingAttempts = await getPendingSyncs();

  if (pendingAttempts.length === 0) {
    console.log("[Offline] No pending attempts to sync");
    return { synced: 0, failed: 0 };
  }

  console.log(`[Offline] Starting sync of ${pendingAttempts.length} attempts`);

  let synced = 0;
  let failed = 0;

  for (const action of pendingAttempts) {
    try {
      if (action.type === "quiz-attempt") {
        const response = await fetch("/api/quiz-attempts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.data),
        });

        if (response.ok) {
          await markActionSynced(action.id);
          synced++;
          console.log("[Offline] Synced attempt:", action.id);
        } else {
          failed++;
          console.error("[Offline] Failed to sync attempt:", action.id, response.status);
        }
      }
    } catch (error) {
      failed++;
      console.error("[Offline] Sync error:", error);
    }
  }

  console.log(`[Offline] Sync complete. Synced: ${synced}, Failed: ${failed}`);
  return { synced, failed };
}

// Mark action as synced
async function markActionSynced(actionId: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("offline-actions", "readwrite");
    const store = tx.objectStore("offline-actions");
    const getRequest = store.get(actionId);

    getRequest.onsuccess = () => {
      const action = getRequest.result as OfflineAction;
      action.synced = true;
      action.syncedAt = new Date().toISOString();

      const updateRequest = store.put(action);
      updateRequest.onerror = () => reject(updateRequest.error);
      updateRequest.onsuccess = () => resolve();
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}

// Clear all offline data (for testing/debugging)
export async function clearOfflineData(): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(["offline-actions", "cached-data"], "readwrite");

    tx.objectStore("offline-actions").clear();
    tx.objectStore("cached-data").clear();

    tx.onerror = () => reject(tx.error);
    tx.oncomplete = () => {
      console.log("[Offline] Cleared all offline data");
      resolve();
    };
  });
}

// Cache data locally
export async function cacheLocalData(key: string, data: unknown): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("cached-data", "readwrite");
    const store = tx.objectStore("cached-data");

    const request = store.put({
      key,
      data,
      timestamp: new Date().toISOString(),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Retrieve cached data
export async function getCachedData(key: string): Promise<unknown | null> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("cached-data", "readonly");
    const store = tx.objectStore("cached-data");
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? result.data : null);
    };
  });
}

// Request background sync
export async function requestBackgroundSync(tag: string = "sync-quiz-attempts"): Promise<void> {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register(tag);
      console.log("[Offline] Background sync requested:", tag);
    } catch (error) {
      console.warn("[Offline] Background sync not available:", error);
    }
  }
}

// Check if online
export function isOnline(): boolean {
  if (typeof window === "undefined") return true;
  return navigator.onLine;
}

// Listen for online/offline changes
export function listenToNetworkChanges(
  callback: (online: boolean) => void,
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}
