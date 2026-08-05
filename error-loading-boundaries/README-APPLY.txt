How to apply this update
=========================

This ZIP adds TWO new files: app/error.tsx and app/loading.tsx

- app/error.tsx: a styled error screen (matches your existing 404 page's
  look) shown if a page throws a runtime error, with "Try again" and
  "Back to homepage" buttons.
- app/loading.tsx: a small spinner shown while a page segment is loading.

No existing files are changed - purely additive.

Steps:
1. In your local clone, on branch claude/olevel-islamiyat-site-xoo6l3
   (with the previous 3 updates already applied and pushed).
2. Copy app/error.tsx and app/loading.tsx from this ZIP into your repo's
   app/ folder.
3. In GitHub Desktop you should see 2 new files.
4. Commit with message: "Add root error.tsx and loading.tsx boundaries"
5. Push origin.
