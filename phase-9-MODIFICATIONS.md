# Phase 9: Performance & Offline Support Implementation Guide

## Files Created

### 1. `public/sw.js`
Service Worker for caching and offline support:
- **Static Cache** - Static assets cached on install
- **Network-First Strategy** - For API calls (try network, fallback to cache)
- **Cache-First Strategy** - For quiz data (try cache, fallback to network)
- **Stale-While-Revalidate** - For dynamic content (return cache, update background)
- **Background Sync** - Sync offline quiz attempts when back online
- **IndexedDB Integration** - Store pending attempts locally

### 2. `lib/offline-storage.ts`
Offline data management:
- `queueOfflineAttempt()` - Queue quiz attempts for sync
- `getPendingSyncs()` - Retrieve pending actions
- `syncOfflineQuizAttempts()` - Sync to server
- `cacheLocalData()` / `getCachedData()` - Local caching
- `requestBackgroundSync()` - Request background sync
- `isOnline()` / `listenToNetworkChanges()` - Network status

### 3. `hooks/useServiceWorker.ts`
Service Worker management:
- Register SW on app load
- Track online/offline status
- Handle sync with pending attempts
- Monitor sync progress
- Prefetch resources
- Clear caches (debugging)

### 4. `components/OfflineIndicator.tsx`
Visual indicator component:
- Shows offline status
- Displays pending sync count
- Manual sync button
- Expandable details panel
- `SyncStatusBadge` for inline status

## Modifications to Existing Files

### 1. Update `app/layout.tsx`
Add offline indicator and SW registration:

```typescript
import { OfflineIndicator } from "@/components/OfflineIndicator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <OfflineIndicator />
      </body>
    </html>
  );
}
```

### 2. Update `components/Quiz.tsx`
Handle offline quiz submissions:

```typescript
import { queueOfflineAttempt, isOnline } from "@/lib/offline-storage";

// In handleSubmit():
const handleSubmit = async () => {
  const attemptRecord = {
    quizId: quiz.id,
    timestamp: new Date().toISOString(),
    scorePercent,
    correctCount,
    totalCount: totalQuestions,
    answers: Object.fromEntries(
      quiz.questions.map((q) => [q.id, { type: q.type, correct: isQuestionCorrect(q, answers[q.id]) }]),
    ),
  };

  if (!isOnline()) {
    // Queue for sync
    await queueOfflineAttempt(attemptRecord);
    alert("Quiz saved locally. Will sync when back online.");
  } else {
    // Send to server immediately
    saveQuizAttempt(quiz.id, attemptRecord, ...);
  }
};
```

### 3. Update `app/layout.tsx` - Add Manifest
Ensure PWA manifest is linked:

```typescript
export const metadata: Metadata = {
  title: "O Level Islamiyat",
  manifest: "/manifest.json",
  // ... rest of metadata
};
```

### 4. Create `public/manifest.json`
PWA manifest for installability:

```json
{
  "name": "O Level Islamiyat",
  "short_name": "Islamiyat",
  "description": "Learn O Level Islamiyat with quizzes, analytics, and spaced repetition",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 5. Create `public/offline.html`
Offline fallback page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f3f4f6;
    }
    .container {
      text-align: center;
      padding: 20px;
    }
    h1 { color: #1f2937; }
    p { color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <h1>You're Offline</h1>
    <p>This page is not available offline. Please check your connection.</p>
  </div>
</body>
</html>
```

### 6. Update next.config.js
Enable service worker bundling:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  experimental: {
    // Enable concurrent rendering
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
```

### 7. Add to `package.json` scripts
Helpful development scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test:lighthouse": "lighthouse http://localhost:3000 --view",
    "test:pwa": "pwa-asset-generator public/logo.png public/icons --background '#2563eb'"
  }
}
```

## Code Splitting & Performance

### 1. Dynamic Imports for Heavy Components
```typescript
import dynamic from "next/dynamic";

const ProgressDashboard = dynamic(
  () => import("@/components/ProgressDashboard"),
  { loading: () => <Skeleton /> }
);
```

### 2. Route-Based Code Splitting
Next.js automatically code-splits at the route level with App Router.

### 3. Image Optimization
```typescript
import Image from "next/image";

export function Quiz({ questions }: QuizProps) {
  return (
    <div>
      {questions.map((q) => (
        <Image
          key={q.id}
          src={q.image}
          alt={q.text}
          width={400}
          height={300}
          quality={75}
          loading="lazy"
        />
      ))}
    </div>
  );
}
```

### 4. Preload Critical Resources
```typescript
// In app/layout.tsx
import { Preload } from "next/dist/server/lib/utils";

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          as="script"
          href="/quiz.js"
        />
        <link
          rel="prefetch"
          href="/api/quizzes"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Caching Strategies Explained

### Network-First (API Endpoints)
1. Try to fetch from network
2. If fails, return cached version
3. **Best for**: API calls, fresh data

### Cache-First (Quiz Data)
1. Return from cache if available
2. If not cached, fetch from network
3. **Best for**: Stable content (quizzes, past papers)

### Stale-While-Revalidate (Dynamic Content)
1. Return cache immediately
2. Fetch fresh version in background
3. Update cache with new version
4. **Best for**: Pages, content that can be slightly stale

## Testing & Validation

### Service Worker Testing
```typescript
// Test SW registration
describe("Service Worker", () => {
  it("should register service worker", async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");
    expect(registration).toBeDefined();
  });

  it("should cache assets on install", async () => {
    const cacheNames = await caches.keys();
    expect(cacheNames).toContain("static-v1");
  });
});
```

### Offline Testing
1. Open DevTools → Network tab
2. Check "Offline" checkbox
3. Navigate site - should work
4. Try submitting quiz offline
5. Go back online - sync should trigger

### Lighthouse Testing
```bash
npm run test:lighthouse
```

Check:
- Performance: > 90
- PWA: > 90
- Best Practices: > 90

## Troubleshooting

### SW not updating
- Clear browser cache and app data
- Unregister old SW: `await registration.unregister()`
- Check `updateViaCache: "none"` is set

### Offline attempts not syncing
- Check IndexedDB in DevTools
- Verify `/api/quiz-attempts` endpoint exists
- Check network tab for sync requests

### Caching too aggressive
- Adjust cache version (e.g., "v2")
- Clear caches manually: `await caches.delete(cacheName)`
- Use `no-store` on sensitive responses

## Performance Checklist

- [ ] Service Worker registered and working
- [ ] Offline indicator shows correctly
- [ ] Quiz attempts queue offline
- [ ] Auto-sync when back online
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse PWA > 90
- [ ] Time to Interactive < 2s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized and lazy-loaded
- [ ] Code splitting working (check DevTools)
- [ ] Cache invalidation working correctly

## Success Metrics

- Offline quiz completion: 100%
- Sync success rate: > 99%
- Time to Interactive: < 2s
- Lighthouse score: > 90 (all categories)
- Cache hit ratio: > 80%
- Sync latency: < 5s (on 4G)
