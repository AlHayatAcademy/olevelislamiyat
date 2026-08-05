# Contributing

## Before you start

Read [Architecture.md](./Architecture.md) for the big picture, then
[Developer-Guide.md](./Developer-Guide.md) for setup and conventions. If you're adding content
rather than code, go straight to [Content-Architecture.md](./Content-Architecture.md).

## Workflow

This repository currently uses a single `main` branch with no enforced PR process (see
[Developer-Guide.md](./Developer-Guide.md#branch-workflow) for the reasoning and the recommended
future state). Until that changes:

1. Make your change.
2. Run the full local check before considering it done:
   ```bash
   npm run lint && npm run typecheck && npm run test && npm run build
   ```
   Add `npm run test:e2e` if you touched navigation, forms, search, or a page template.
3. Commit with a clear, specific message — explain *why*, not just *what* (the diff already shows
   what changed).
4. Push to `main` (or open a PR if the project has since moved to that workflow — check
   `.github/workflows/ci.yml` for whether branch protection is active).

## Commit messages

Prefer messages that explain the reasoning, not just a restatement of the diff. "Add rate limiting
to /api/contact" plus a body explaining *why* (no rate limiting existed, what the risk was, what
the fix's actual guarantees and limitations are) is far more useful to a future reader than
"update contact route".

## Code review checklist

Whether reviewing your own change or someone else's:

- [ ] Does it preserve existing functionality? (Unless the change is explicitly meant to alter
      behavior — say so clearly if it does.)
- [ ] Does `npm run typecheck` pass with no new `any`?
- [ ] Are new content items covered by the relevant data-integrity test (see
      [Content-Architecture.md](./Content-Architecture.md#data-validation-rules))?
- [ ] Does a new shared component/page follow the conventions in
      [Developer-Guide.md](./Developer-Guide.md#coding-conventions) (named exports, `@/` alias
      for cross-directory imports, Tailwind utility classes)?
- [ ] If it touches accessibility-sensitive markup (forms, menus, dialogs), does it prefer native
      HTML over ARIA, and has it been checked with a keyboard (Tab, Escape) at minimum?
- [ ] Is there a test that would fail if this change were reverted?

## Reporting an issue

For content accuracy issues (a wrong fact, a mis-transcribed question), note the specific page URL
and what's wrong — content authoring rules and provenance requirements are in
[Content-Architecture.md](./Content-Architecture.md).

For a bug, include the URL, what you expected, what happened, and — if it's visual — a
screenshot. If it's a known, documented gap (check [Roadmap.md](./Roadmap.md)'s "Known open
issues" first), it may already be tracked.

## Style

- TypeScript strict mode, no `any` without a very good reason stated in a comment.
- Tailwind utility classes, no separate stylesheets per component.
- Named exports for components; PascalCase filenames matching the component name.
- No comments that just restate the code — only where the *why* isn't obvious from reading it.
- No speculative abstraction — extract a shared helper/component only once real duplication
  exists, not in anticipation of it.

See [Developer-Guide.md](./Developer-Guide.md#coding-conventions) for the full list.
