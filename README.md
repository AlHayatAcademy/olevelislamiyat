# O Level Islamiyat

Free study resources for Cambridge O Level Islamiyat (2058) and IGCSE Islamiyat (0493): lessons,
past-paper questions, model answers, quizzes, and Qur'an/Hadith references — built with Next.js
and deployed on Cloudflare Workers.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Documentation

Start with [`docs/Architecture.md`](./docs/Architecture.md) for the big picture, then:

- [`docs/Developer-Guide.md`](./docs/Developer-Guide.md) — setup, commands, conventions
- [`docs/Content-Architecture.md`](./docs/Content-Architecture.md) — how to add lessons, questions, quizzes, references
- [`docs/Testing.md`](./docs/Testing.md) — Vitest, Playwright, CI
- [`docs/Deployment.md`](./docs/Deployment.md) — Cloudflare Workers deployment
- [`docs/Decision-Log.md`](./docs/Decision-Log.md) — why things are built the way they are
- [`docs/Roadmap.md`](./docs/Roadmap.md) — what's done, what's next
- [`docs/Contributing.md`](./docs/Contributing.md) — workflow and review checklist
- [`docs/Migration-History.md`](./docs/Migration-History.md) — significant structural changes
- [`docs/archive/`](./docs/archive/) — historical build-session logs, kept for project history

## License / attribution

This is an independent educational platform. It is not affiliated with or endorsed by Cambridge
International Education. See [`app/cambridge-disclaimer/page.tsx`](./app/cambridge-disclaimer)
and [`app/copyright/page.tsx`](./app/copyright) for the full disclaimer and copyright policy.
