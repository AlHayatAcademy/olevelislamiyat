How to apply this update
=========================

This ZIP adds ONE new file: .github/workflows/ci.yml

It sets up a GitHub Actions pipeline that automatically runs on every push
to "main" and every pull request:
  1. npm ci          (install dependencies from package-lock.json)
  2. npm run lint
  3. npm run typecheck
  4. npm run build

It does NOT deploy anything - your existing manual Cloudflare deploy
process is untouched. This just catches broken builds before they land.

Steps:
1. In your local clone of the olevelislamiyat repo, on branch
   claude/olevel-islamiyat-site-xoo6l3 (make sure the previous
   data/questions/ split has already been applied and pushed).
2. Create the folder .github/workflows/ in your repo root if it doesn't
   exist, and copy ci.yml from this ZIP into it.
3. In GitHub Desktop you should see 1 new file:
   .github/workflows/ci.yml
4. Commit with message: "Add CI workflow: lint, typecheck, build on push/PR"
5. Push origin.

After pushing, you'll see a new "Actions" tab appear on the GitHub repo
page, and it will run automatically on this push and on future PRs.
