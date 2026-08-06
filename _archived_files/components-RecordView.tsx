"use client";

import { useEffect } from "react";
import { recordView, type ContentRef } from "@/lib/learner-store";

/**
 * Invisible tracker: records a content view (for Recently Viewed / Continue Learning / progress)
 * on mount. Rendered inside an otherwise server-rendered page so only this one small client
 * component hydrates, not the whole page (see docs/Architecture.md#performance /
 * Phase 3.7 - minimal client JS).
 */
export function RecordView({ contentRef }: { contentRef: ContentRef }) {
  // Stringify to keep the effect's dependency stable across re-renders with an equivalent but
  // new object reference (the caller constructs contentRef fresh on every render).
  const key = JSON.stringify(contentRef);

  useEffect(() => {
    recordView(JSON.parse(key) as ContentRef);
  }, [key]);

  return null;
}
