# About / Legal / Resources Build — 3 August 2026

Scope of this build: About/Founder/Institute/Contact, legal pages (privacy, terms, copyright,
disclaimer, cambridge-disclaimer, accessibility), Notes/Resources/Online Classes/Teacher Resources,
sitemap, and site-wide + page-level structured data. Files owned by other concurrent agents
(`data/topics/*`, `data/references.ts`, `docs/build-status.md`, `data/quizzes.ts`, `app/quizzes/**`,
`app/revision/**`) were not touched, only read where needed (e.g. for the sitemap).

## Pages built / completed

- `app/about/page.tsx` — original mission/approach overview, grounded in `site-config.ts` only.
- `app/about/founder/page.tsx` — full founder profile with the verbatim bio, a graceful
  placeholder in place of a photo (no invented image path), and `Person` JSON-LD.
- `app/about/institute/page.tsx` — Al-Hayat Research Institute overview with real links to
  `institute.drimranhayat.com` and the academy page, pulled from `site-config.ts`.
- `app/contact/page.tsx` + `app/contact/ContactForm.tsx` — WhatsApp button, phone, email, a
  client-side enquiry form (four categories: online-class, resource, teacher-support,
  technical-support) that opens a pre-filled `mailto:` — honestly labelled as a mailto fallback
  with "Cloudflare Worker form coming soon" — plus a visible FAQ block with matching `FAQPage`
  JSON-LD.
- `app/privacy/page.tsx` — full privacy policy: no accounts/database, no Google Analytics,
  Cloudflare Web Analytics explicitly disabled by default, honest description of the mailto/
  WhatsApp contact flow.
- `app/terms/page.tsx` — full terms of use.
- `app/copyright/page.tsx` — copyright notice with the exact required line ("© 2026 Al-Hayat
  Research Institute of Social Sciences (SMC-Private) Limited. All rights reserved.") plus an
  original content-licence statement covering lessons, model answers, quizzes, diagrams, revision
  notes, references and teacher resources.
- `app/disclaimer/page.tsx` — general educational/religious-content disclaimer.
- `app/cambridge-disclaimer/page.tsx` — expanded, original independence explanation, keeping the
  required verbatim sentence.
- `app/accessibility/page.tsx` — accessibility statement describing only genuine practices in the
  build (skip-link, semantic HTML, keyboard nav, focus states, WCAG-oriented approach — no
  conformance claim).
- `app/notes/page.tsx` — rebuilt to import real syllabus sections and topics from `data/syllabus.ts`
  / `data/topics/index.ts` and link straight into the real lesson pages; no hardcoded fake list.
- `app/resources/page.tsx` — categorised hub (Notes, Mind Maps, Flashcards, Video Lessons, Exam
  Tips, Downloads, Revision Plans); available items link out for real, unbuilt items are labelled
  "Coming soon".
- `app/online-classes/page.tsx` — course overview, learning outcomes, teaching approach, founder
  summary, WhatsApp/email contact, FAQ (with `FAQPage` JSON-LD) — fees/schedule explicitly say
  "contact for current schedule and fees", no invented numbers.
- `app/teacher-resources/page.tsx` (new route) — categorised hub (lesson plans, worksheets,
  presentation outlines, rubrics, classroom activities, revision tests, homework, teaching
  strategies), all honestly labelled "Coming soon", with links to the real content that already
  exists (notes, model answers, quotes & references).

## SEO / structured data

- `app/sitemap.ts` rebuilt to generate real URLs from data: paper sections, every topic/lesson page,
  past-paper years and topical sections, model answers, reference categories, and quizzes (read
  from `data/quizzes.ts`), in addition to all static routes including the new
  `/teacher-resources`.
- `app/robots.ts` reviewed — already correct, left unchanged.
- `app/layout.tsx` — added site-wide `EducationalOrganization` JSON-LD sourced entirely from
  `site-config.ts`.
- `app/about/founder/page.tsx` — added `Person` JSON-LD using the verbatim bio.
- `app/contact/page.tsx` and `app/online-classes/page.tsx` — added `FAQPage` JSON-LD generated
  directly from the same array rendered as the visible FAQ, so schema and visible text always
  match.
- `docs/seo-architecture.md` and `docs/seo-checklist.md` created, documenting what's implemented
  and explicitly flagging canonical URLs and OG images as still pending.

## QA — commands actually run, full output

### `npm run lint`
```
> olevelislamiyat@0.1.0 lint
> eslint .

(no output — 0 errors, 0 warnings)
```

### `npm run typecheck`
```
> olevelislamiyat@0.1.0 typecheck
> tsc --noEmit

(no output — clean)
```

### `npm run build`
```
> olevelislamiyat@0.1.0 build
> next build

   ▲ Next.js 15.5.22
   Creating an optimized production build ...
 ✓ Compiled successfully in 2.8s
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (186/186)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app) ... [186 routes total, including /about, /about/founder, /about/institute, /contact,
/privacy, /terms, /copyright, /disclaimer, /cambridge-disclaimer, /accessibility, /notes,
/resources, /online-classes, /teacher-resources, plus all pre-existing paper-1/2, past-papers,
model-answers, quotes-references, quizzes and revision routes]

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```
Build exited 0, all 186 pages generated successfully, no errors or warnings.

## Not fabricated / honesty notes

- No invented statistics, testimonials, student counts, or founder awards/publications were added
  anywhere — only the verbatim bio and fields already present in `data/site-config.ts` are used.
- Online class fees/schedule are explicitly "contact us" rather than invented figures.
- Resources and Teacher Resources pages label unbuilt sections "Coming soon" rather than presenting
  placeholder content as real.
- Privacy policy accurately describes the current lack of a backend, disabled analytics, and the
  mailto-based contact flow, rather than describing aspirational functionality as live.

## Pending / out of scope for this build

- Canonical URL metadata and Open Graph/Twitter images (see `docs/seo-architecture.md`).
- Server-side enquiry form (Cloudflare Worker) — currently a client-side mailto fallback, as
  instructed.
- Mind Maps, Flashcards, Downloads, and all Teacher Resources categories — intentionally left as
  honest "Coming soon" placeholders pending real content production.
