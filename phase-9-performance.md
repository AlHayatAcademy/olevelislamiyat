# Phase 9: Performance Optimization & Offline Support

## Overview
Implement Service Workers, caching strategies, code splitting, and offline-first architecture.

## Files to Create

### 1. `public/sw.js` — Service Worker
- Cache quiz data, analytics, recommendations
- Offline quiz attempt support (sync on reconnect)
- Network-first for fresh content, cache fallback for offline
- Periodic sync for background updates

### 2. `lib/offline-storage.ts`
```typescript
export async function syncOfflineQuizAttempts(): Promise<void>
export function queueOfflineAttempt(attempt: QuizAttemptRecord): void
export function getPendingSyncs(): OfflineAction[]
```

### 3. `hooks/useServiceWorker.ts`
- Register service worker on mount
- Handle offline/online transitions
- Show offline indicator
- Trigger sync when back online

### 4. `components/OfflineIndicator.tsx`
Visual indicator showing offline status and pending syncs.

## Modifications

- Add lazy loading to components
- Code split by route
- Compress images and static assets
- Implement resource hints (prefetch, preload)
- Cache API responses intelligently
- Monitor Core Web Vitals

## Implementation Priority
HIGH - Performance critical for user retention
