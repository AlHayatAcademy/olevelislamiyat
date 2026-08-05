How to apply this update
=========================

This ZIP contains the new data/questions/ folder (per-year split files)
that replaces the old single data/questions.ts file.

Steps:
1. In your local clone of the olevelislamiyat repo, make sure you are on
   branch: claude/olevel-islamiyat-site-xoo6l3
2. DELETE the old file:  data/questions.ts
3. Unzip this archive and copy the "data/questions" folder from it into
   your repo's "data/" folder (so you end up with data/questions/2021.ts,
   2022.ts, 2023.ts, 2024.ts, 2025.ts, index.ts, types.ts).
4. In GitHub Desktop, you should see:
   - data/questions.ts marked as deleted
   - 7 new files under data/questions/ marked as added
5. Commit with message: "Split data/questions.ts into per-year files"
6. Push origin.

That's it - no other files in the repo need to change.
