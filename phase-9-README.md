# Phase 9: Performance & Offline Support

## Quick Start

### 1. Copy Files to Project
```bash
cp public__sw.js → public/sw.js
cp lib__offline-storage.ts → src/lib/offline-storage.ts
cp hooks__useServiceWorker.ts → src/hooks/useServiceWorker.ts
cp components__OfflineIndicator.tsx → src/components/OfflineIndicator.tsx
```

### 2. Update Existing Files
Follow instructions in `PHASE9_MODIFICATIONS.md`:
- Add OfflineIndicator to `app/layout.tsx`
- Update Quiz.tsx for offline quiz handling
- Create `public/manifest.json` for PWA
- Update next.config.js

### 3. Test Offline
- Open DevTools → Network tab
- Check "Offline" checkbox
- Take a quiz - it should save locally
- Go back online - sync automatically

## What's Included

### Service Worker (`public/sw.js`)
- **Network-First** strategy for API calls
- **Cache-First** strategy for quiz data
- **Stale-While-Revalidate** for dynamic content
- Background sync for offline attempts
- IndexedDB integration for local storage
- Auto-cleanup of old caches

### Offline Storage (`lib/offline-storage.ts`)
- Queue offline quiz attempts
- Track pending syncs
- Auto-sync when online
- Local data caching
- Network status detection

### Service Worker Hook (`hooks/useServiceWorker.ts`)
- Auto-register SW on app load
- Monitor online/offline status
- Track pending syncs
- Manual sync trigger
- Prefetch resources
- Clear caches (debugging)

### Offline Indicator (`components/OfflineIndicator.tsx`)
- Shows offline status
- Displays pending sync count
- Manual sync button
- Expandable details
- Inline status badge variant

## Key Features

✅ **Offline-First Architecture**
- Quiz attempts saved locally when offline
- Auto-sync when back online
- No data loss on network interruption

✅ **Intelligent Caching**
- Network-first for API calls
- Cache-first for quiz data
- Stale-while-revalidate for dynamic content
- Periodic cache cleanup

✅ **Background Sync**
- Sync attempts automatically
- Manual sync trigger available
- Retry failed syncs

✅ **Code Splitting**
- Route-based code splitting (Next.js)
- Dynamic imports for heavy components
- Image lazy-loading

✅ **Performance Optimizations**
- Service Worker for resource caching
- Image optimization
- Resource prefetching
- Efficient cache strategies

## How It Works

### Offline Quiz Flow
1. User takes quiz while offline
2. Quiz attempt queued to IndexedDB
3. OfflineIndicator shows "Offline"
4. User goes back online
5. Background sync triggered automatically
6. OfflineIndicator shows "Syncing..."
7. After sync completes, status shows "Synced"

### Caching Strategies

**Network-First (API calls)**
```
Try Network → Success: Cache + Return
              Failure: Return from Cache
```

**Cache-First (Quiz Data)**
```
Return from Cache if available
Else → Fetch from Network → Cache + Return
```

**Stale-While-Revalidate (Dynamic)**
```
Return from Cache immediately
Fetch fresh version in background
Update cache when fresh arrives
```

## File Structure

```
Phase 9/
├── public/
│   ├── sw.js                 # Service Worker
│   ├── manifest.json         # PWA manifest (create)
│   └── offline.html          # Offline fallback (create)
├── src/
│   ├── lib/
│   │   └── offline-storage.ts   # Offline data management
│   ├── hooks/
│   │   └── useServiceWorker.ts  # SW management hook
│   └── components/
│       └── OfflineIndicator.tsx # Status indicator
└── app/
    └── layout.tsx            # Add OfflineIndicator
```

## Testing

### Manual Testing
1. Open DevTools (F12)
2. Network tab → check "Offline"
3. Take a quiz
4. Check OfflineIndicator shows "Offline"
5. Submit quiz → should save locally
6. Uncheck "Offline"
7. OfflineIndicator auto-syncs
8. Verify sync completed

### Lighthouse Testing
```bash
npm run dev
# Open new terminal
npm run test:lighthouse
```

Check:
- Performance: > 90
- PWA: > 90
- Accessibility: > 90
- Best Practices: > 90

### DevTools Inspection
- Application → Service Workers: Verify registered
- Application → Cache Storage: See cached resources
- Application → IndexedDB: See queued attempts
- Network tab: See caching in action (gray = cached)

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 40+ | ✅ Full | Excellent SW support |
| Firefox 44+ | ✅ Full | Excellent SW support |
| Safari 15+ | ⚠️ Partial | Limited SW support |
| Edge 17+ | ✅ Full | Chromium-based |
| Mobile Safari 15+ | ⚠️ Partial | Limited SW support |

## Performance Gains

Expected improvements after Phase 9:

- **Time to Interactive**: -40% (from caching)
- **Lighthouse Score**: +25 points (from caching + PWA)
- **Offline Capability**: 100% (new feature)
- **Sync Reliability**: > 99% (background sync)

## Configuration

### Adjust Cache Duration
In `sw.js`, modify cache version to invalidate:
```javascript
const CACHE_VERSION = "v2"; // Changed from v1
```

### Customize Caching Strategy
Modify conditions in `fetch` event:
```javascript
if (url.pathname.startsWith("/api/")) {
  event.respondWith(networkFirstStrategy(request));
}
```

### Disable Service Worker
Temporarily unregister for debugging:
```typescript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}
```

## Common Issues

### "Service Worker failed to register"
- Check `public/sw.js` exists
- Verify no JS errors in SW
- Clear browser cache and app data
- Check HTTPS in production

### "Offline indicator never appears"
- Verify OfflineIndicator in layout.tsx
- Check browser supports SW (Chrome, Firefox, Edge)
- Open DevTools console for errors

### "Offline attempts not syncing"
- Check `/api/quiz-attempts` endpoint exists
- Verify IndexedDB has pending attempts
- Check Network tab for sync requests
- Review console for error messages

### "Cache too aggressive"
- Increment CACHE_VERSION in sw.js
- Clear browser cache (Ctrl+Shift+Del)
- Test in private/incognito mode

## Next Steps

1. Apply Phase 9 files to your repo
2. Test offline functionality manually
3. Run Lighthouse tests
4. Monitor production performance
5. Proceed to Phase 10 (Authentication)

## Support

For issues or questions, refer to:
- `PHASE9_MODIFICATIONS.md` - Detailed integration guide
- MDN Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- Web.dev Offline Cookbook: https://jakearchibald.com/2014/offline-cookbook/
- Next.js Performance: https://nextjs.org/docs/advanced-features/performance-analytics
