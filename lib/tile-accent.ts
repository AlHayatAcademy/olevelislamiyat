import type { TileAccent } from "@/data/homepage-content";

// Static class strings (never composed via template literals) so Tailwind's
// JIT compiler can see and generate them at build time.
export const tileAccentClasses: Record<TileAccent, { badge: string; badgeHover: string }> = {
  green: {
    badge: "bg-tile-green/10 text-tile-green",
    badgeHover: "group-hover:bg-tile-green group-hover:text-white",
  },
  gold: {
    badge: "bg-tile-gold/10 text-tile-gold",
    badgeHover: "group-hover:bg-tile-gold group-hover:text-white",
  },
  purple: {
    badge: "bg-tile-purple/10 text-tile-purple",
    badgeHover: "group-hover:bg-tile-purple group-hover:text-white",
  },
  blue: {
    badge: "bg-tile-blue/10 text-tile-blue",
    badgeHover: "group-hover:bg-tile-blue group-hover:text-white",
  },
  teal: {
    badge: "bg-tile-teal/10 text-tile-teal",
    badgeHover: "group-hover:bg-tile-teal group-hover:text-white",
  },
};
