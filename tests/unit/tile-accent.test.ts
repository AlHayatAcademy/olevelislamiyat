import { describe, it, expect } from "vitest";
import { tileAccentClasses } from "@/lib/tile-accent";

const expectedAccents = ["green", "gold", "purple", "blue", "teal", "coral", "amber", "rose"] as const;

describe("tileAccentClasses", () => {
  it("defines all 8 expected accent colors", () => {
    expect(Object.keys(tileAccentClasses).sort()).toEqual([...expectedAccents].sort());
  });

  it("every accent has both a badge and badgeHover class string", () => {
    for (const accent of expectedAccents) {
      expect(tileAccentClasses[accent].badge.length).toBeGreaterThan(0);
      expect(tileAccentClasses[accent].badgeHover.length).toBeGreaterThan(0);
    }
  });

  it("each accent's classes reference its own color name (no copy-paste cross-wiring)", () => {
    for (const accent of expectedAccents) {
      expect(tileAccentClasses[accent].badge).toContain(`tile-${accent}`);
      expect(tileAccentClasses[accent].badgeHover).toContain(`tile-${accent}`);
    }
  });
});
