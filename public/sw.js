// Service Worker for O Level Islamiyat Platform
// Handles caching, offline support, and background sync

const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const QUIZ_CACHE = `quiz-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

// Static assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/offline.html",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing Service Worker");
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[SW] Failed to cache some assets:", err);
        // Continue even if some assets fail to cache
        return Promise.resolve();
      });
    }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating Service Worker");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== QUIZ_CACHE &&
            cacheName !== API_CACHE
          ) {
            console.log("[SW] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - implement caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome extensions and other non-app requests
  if (url.protocol === "chrome-extension:") {
    return;
  }

  // Strategy: Network first, cache fallback for API calls
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request));
  }
  // Strategy: Cache first, network fallback for quiz data
  else if (url.pathname.startsWith("/quizzes/")) {
    event.respondWith(cacheFirstStrategy(request, QUIZ_CACHE));
  }
  // Strategy: Stale while revalidate for dynamic content
  else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network first strategy - try network, fall back to cache
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log("[SW] Network failed, trying cache:", request.url);
    const cached = await caches.match(request);
    return cached || createOfflineResponse();
  }
}

// Cache first strategy - try cache, fall back to network
async function cacheFirstStrategy(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("[SW] Cache miss and network failed:", request.url);
    return createOfflineResponse();
  }
}

// Stale while revalidate - return cache immediately, update in background
async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise.catch(() => createOfflineResponse());
}

// Create offline response
function createOfflineResponse() {
  return new Response(
    "<!DOCTYPE html><html><head><title>Offline</title></head><body>" +
      "<h1>You are offline</h1><p>This content is not available offline. Please check your connection.</p>" +
      "</body></html>",
    {
      headers: { "Content-Type": "text/html" },
      status: 503,
      statusText: "Service Unavailable",
    },
  );
}

// Background sync event - sync offline attempts when back online
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync event:", event.tag);

  if (event.tag === "sync-quiz-attempts") {
    event.waitUntil(syncOfflineQuizAttempts());
  }
});

// Sync offline quiz attempts with server
async function syncOfflineQuizAttempts() {
  try {
    const db = await openDB();
    const pendingAttempts = await getPendingAttempts(db);

    console.log(`[SW] Syncing ${pendingAttempts.length} offline attempts`);

    for (const attempt of pendingAttempts) {
      try {
        const response = await fetch("/api/quiz-attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attempt),
        });

        if (response.ok) {
          await markAtemptSynced(db, attempt.id);
          console.log("[SW] Synced attempt:", attempt.id);
        }
      } catch (error) {
        console.error("[SW] Failed to sync attempt:", error);
        throw error; // Retry on failure
      }
    }

    // Notify clients of successful sync
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_COMPLETE",
        attemptCount: pendingAttempts.length,
      });
    });
  } catch (error) {
    console.error("[SW] Sync failed:", error);
    throw error; // Retry
  }
}

// IndexedDB helpers
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OLevelIslamiyat", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("quiz-attempts")) {
        db.createObjectStore("quiz-attempts", { keyPath: "id" });
      }
    };
  });
}

async function getPendingAttempts(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("quiz-attempts", "readonly");
    const store = tx.objectStore("quiz-attempts");
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result.filter((a) => !a.synced));
  });
}

async function markAtemptSynced(db, attemptId) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("quiz-attempts", "readwrite");
    const store = tx.objectStore("quiz-attempts");
    const getRequest = store.get(attemptId);

    getRequest.onsuccess = () => {
      const attempt = getRequest.result;
      attempt.synced = true;
      const updateRequest = store.put(attempt);
      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}

// Handle messages from clients
self.addEventListener("message", (event) => {
  console.log("[SW] Message received:", event.data);

  if (event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      }),
    );
  }

  if (event.data.type === "CACHE_URLS") {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.addAll(event.data.urls).catch((err) => {
          console.warn("[SW] Failed to cache URLs:", err);
        });
      }),
    );
  }
});
