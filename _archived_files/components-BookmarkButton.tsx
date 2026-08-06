"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleBookmark, isBookmarked, type ContentRef } from "@/lib/learner-store";

interface BookmarkButtonProps {
  contentRef: ContentRef;
  className?: string;
}

/**
 * Toggleable bookmark button. Starts in an unbookmarked state during SSR/first paint (localStorage
 * isn't available on the server) and syncs to the real state on mount - a brief, harmless flash
 * rather than a hydration mismatch, since the server-rendered markup and the initial client render
 * are identical.
 */
export function BookmarkButton({ contentRef, className }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(contentRef));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef.type, contentRef.paper, contentRef.section, contentRef.slug]);

  function handleClick() {
    setBookmarked(toggleBookmark(contentRef));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={bookmarked}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        bookmarked
          ? "border-secondary bg-secondary/10 text-secondary hover:bg-secondary/15"
          : "border-border text-text-muted hover:border-primary hover:text-primary",
        className,
      )}
    >
      <Bookmark size={16} aria-hidden="true" fill={bookmarked ? "currentColor" : "none"} />
      {bookmarked ? "Bookmarked" : "Bookmark this lesson"}
    </button>
  );
}
