import type { TileAccent } from "@/data/homepage-content";

// Static class strings (never composed via template literals) so Tailwind's
// JIT compiler can see and generate them at build time.
export const tileAccentClasses: Record<TileAccent, { badge: string; badgeHover: string }> = {
  green: {
    badge: "bg-tile-green/15 text-tile-green ring-1 ring-inset ring-tile-green/20",
    badgeHover: "group-hover:bg-tile-green group-hover:text-white",
  },
  gold: {
    badge: "bg-tile-gold/15 text-tile-gold ring-1 ring-inset ring-tile-gold/20",
    badgeHover: "group-hover:bg-tile-gold group-hover:text-white",
  },
  purple: {
    badge: "bg-tile-purple/15 text-tile-purple ring-1 ring-inset ring-tile-purple/20",
    badgeHover: "group-hover:bg-tile-purple group-hover:text-white",
  },
  blue: {
    badge: "bg-tile-blue/15 text-tile-blue ring-1 ring-inset ring-tile-blue/20",
    badgeHover: "group-hover:bg-tile-blue group-hover:text-white",
  },
  teal: {
    badge: "bg-tile-teal/15 text-tile-teal ring-1 ring-inset ring-tile-teal/20",
    badgeHover: "group-hover:bg-tile-teal group-hover:text-white",
  },
  coral: {
    badge: "bg-tile-coral/15 text-tile-coral ring-1 ring-inset ring-tile-coral/20",
    badgeHover: "group-hover:bg-tile-coral group-hover:text-white",
  },
  amber: {
    badge: "bg-tile-amber/15 text-tile-amber ring-1 ring-inset ring-tile-amber/20",
    badgeHover: "group-hover:bg-tile-amber group-hover:text-white",
  },
  rose: {
    badge: "bg-tile-rose/15 text-tile-rose ring-1 ring-inset ring-tile-rose/20",
    badgeHover: "group-hover:bg-tile-rose group-hover:text-white",
  },
};
