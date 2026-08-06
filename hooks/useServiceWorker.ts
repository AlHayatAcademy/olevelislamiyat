"use client";

import { useEffect, useState, useCallback } from "react";
import {
  syncOfflineQuizAttempts,
  listenToNetworkChanges,
  requestBackgroundSync,
} from "@/lib/offline-storage";

interface ServiceWorkerStatus {
  isOnline: boolean;
  isSupported: boolean;
  isRegistered: boolean;
  pendingSyncs: number;
  lastSyncTime: string | null;
}

export function useServiceWorker() {
  const [status, setStatus] = useState<ServiceWorkerStatus>({
    isOnline: typeof window !== "undefined" ? navigator.onLine : true,
    isSupported:
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "caches" in window,
    isRegistered: false,
    pendingSyncs: 0,
    lastSyncTime: null,
  });

  const [syncInProgress, setSyncInProgress] = useState(false);

  // Register service worker on mount
  useEffect(() => {
    if (!status.isSupported || typeof window === "undefined") {
      console.log("[SW] Service Worker not supported");
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        console.log("[SW] Service Worker registered:", registration);

        setStatus((prev) => ({
          ...prev,
          isRegistered: true,
        }));

        // Listen for service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "activated" &&
                registration.active &&
                navigator.serviceWorker.controller
              ) {
                console.log("[SW] New version activated, reloading");
                // Optionally reload page for new version
                // window.location.reload();
              }
            });
          }
        });

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      } catch (error) {
        console.error("[SW] Registration failed:", error);
        setStatus((prev) => ({
          ...prev,
          isRegistered: false,
        }));
      }
    };

    registerServiceWorker();
  }, [status.isSupported]);

  // Listen for online/offline changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const unsubscribe = listenToNetworkChanges((isOnline) => {
      console.log("[SW] Network status changed:", isOnline ? "online" : "offline");

      setStatus((prev) => ({
        ...prev,
        isOnline,
      }));

      // Auto-sync when coming back online
      if (isOnline) {
        console.log("[SW] Back online, triggering sync");
        handleSync();
      }
    });

    return unsubscribe;
  }, []);

  // Listen for service worker messages
  useEffect(() => {
    if (!navigator.serviceWorker) return;

    const handleMessage = (event: MessageEvent) => {
      console.log("[SW] Message from worker:", event.data);

      if (event.data.type === "SYNC_COMPLETE") {
        setStatus((prev) => ({
          ...prev,
          lastSyncTime: new Date().toISOString(),
          pendingSyncs: Math.max(0, prev.pendingSyncs - event.data.attemptCount),
        }));

        console.log(`[SW] Sync complete: ${event.data.attemptCount} attempts synced`);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, []);

  // Manual sync function
  const handleSync = useCallback(async () => {
    if (syncInProgress || !status.isOnline) {
      console.log("[SW] Sync already in progress or offline");
      return;
    }

    setSyncInProgress(true);

    try {
      const result = await syncOfflineQuizAttempts();

      if (result.synced > 0) {
        setStatus((prev) => ({
          ...prev,
          lastSyncTime: new Date().toISOString(),
          pendingSyncs: Math.max(0, prev.pendingSyncs - result.synced),
        }));

        console.log(`[SW] Synced ${result.synced} attempts, ${result.failed} failed`);
      }

      // Request background sync for any remaining items
      if (result.failed > 0) {
        await requestBackgroundSync();
      }
    } catch (error) {
      console.error("[SW] Sync failed:", error);

      // Request background sync to retry
      await requestBackgroundSync();
    } finally {
      setSyncInProgress(false);
    }
  }, [status.isOnline, syncInProgress]);

  // Prefetch important resources
  const prefetchResources = useCallback(async (urls: string[]) => {
    if (!status.isSupported) return;

    try {
      const controller = navigator.serviceWorker.controller;
      if (controller) {
        controller.postMessage({
          type: "CACHE_URLS",
          urls,
        });
        console.log("[SW] Prefetch requested for:", urls.length, "URLs");
      }
    } catch (error) {
      console.error("[SW] Prefetch failed:", error);
    }
  }, [status.isSupported]);

  // Clear all caches (debugging)
  const clearCaches = useCallback(async () => {
    if (!status.isSupported) return;

    try {
      const controller = navigator.serviceWorker.controller;
      if (controller) {
        controller.postMessage({
          type: "CLEAR_CACHE",
        });
      }

      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));

      console.log("[SW] Caches cleared");
    } catch (error) {
      console.error("[SW] Cache clear failed:", error);
    }
  }, [status.isSupported]);

  return {
    ...status,
    syncInProgress,
    handleSync,
    prefetchResources,
    clearCaches,
  };
}

// Hook to detect if currently online with real-time updates
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
