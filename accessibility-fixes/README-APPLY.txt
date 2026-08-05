How to apply this update
=========================

This ZIP updates TWO existing files: components/Header.tsx and
components/Quiz.tsx. No visual/UI changes - same look, same behavior for
mouse/touch users. The fixes are for keyboard and screen-reader users:

- Header: the desktop dropdown menu and mobile slide-in menu can no
  longer be Tabbed into while closed/hidden, and Escape now closes
  whichever menu is open.
- Quiz: multiple-choice and true/false answer options now show a visible
  focus ring when navigated to with the keyboard (they had none before).

Steps:
1. In your local clone, on branch claude/olevel-islamiyat-site-xoo6l3
   (with the previous 4 updates already applied and pushed).
2. REPLACE your existing components/Header.tsx and components/Quiz.tsx
   with the ones in this ZIP (just overwrite both files).
3. In GitHub Desktop you should see 2 modified files.
4. Commit with message:
   "Accessibility fixes: focus-trap hidden menus, restore radio focus rings"
5. Push origin.

I tested locally (npm run build + npm run start + curl) and confirmed
the homepage and a quiz page both still render correctly.
