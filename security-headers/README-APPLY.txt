How to apply this update
=========================

This ZIP updates ONE existing file: next.config.ts

It adds baseline security headers (Content-Security-Policy,
X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy, Strict-Transport-Security) applied to every route.
No UI/content changes, no functionality changes - purely response headers.

Steps:
1. In your local clone, on branch claude/olevel-islamiyat-site-xoo6l3
   (with the previous two updates - data/questions split and the CI
   workflow - already applied and pushed).
2. REPLACE your existing next.config.ts with the one in this ZIP
   (just overwrite the file).
3. In GitHub Desktop you should see 1 modified file: next.config.ts
4. Commit with message:
   "Add baseline security headers (CSP, HSTS, frame/sniff/referrer/permissions)"
5. Push origin.

I tested locally (npm run build + npm run start + curl) and confirmed the
headers are served correctly and the homepage, topic pages, quizzes,
search, past-paper question pages, and the contact page all still load
fine (HTTP 200).
