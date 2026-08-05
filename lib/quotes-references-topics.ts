// Support code for the "Browse by Topic" view on /quotes-references.
//
// This maps every syllabus subtopic (from data/syllabus.ts) to (a) a genuinely fitting
// Lucide icon for its content, and (b) the specific reference entries in data/references.ts
// that are tagged to it (matched by hand against the current 29-entry bank, since the
// `topic` field is free text and not guaranteed to exactly equal a subtopic title).
//
// Both maps are keyed by subtopic slug. Any subtopic not present in ICONS_BY_SLUG falls back
// to a keyword-based guess in `iconForSubtopic` below, so newly added syllabus subtopics (e.g.
// from an in-progress syllabus expansion) always render a sensible icon instead of erroring.

import {
  BadgeCheck,
  BookOpen,
  BookOpenText,
  Building2,
  Clock,
  Coins,
  Compass,
  Crown,
  Feather,
  Flag,
  Footprints,
  Gift,
  Handshake,
  HeartHandshake,
  Layers,
  Library,
  Link2,
  Megaphone,
  MessageCircle,
  MessageSquareWarning,
  Mountain,
  PenLine,
  PenTool,
  Quote,
  Scale,
  ScrollText,
  Shield,
  Sparkles,
  Sprout,
  Star,
  Sunrise,
  Swords,
  Users,
  type LucideIcon,
} from "lucide-react";
import { references } from "@/data/references";

// subtopic slug -> icon, deliberately chosen per topic's real content (not a repeating cycle).
const ICONS_BY_SLUG: Record<string, LucideIcon> = {
  // Paper 1 · Major Themes of the Qur'an
  "ayat-al-kursi": Crown, // the Throne Verse
  "al-anam-6-101-103": BookOpenText,
  "al-ikhlas-112": Star, // Allah's oneness
  "al-fatiha-1-7": Compass, // guidance
  "al-alaq-96-1-5": PenLine, // "taught by the pen"
  "al-zilzal-99-1-8": Sunrise, // the Last Day / earthquake
  "adam-al-baqarah-2-30-37": Sprout, // creation of humankind
  "isa-al-maidah-5-110": Feather,
  "muhammad-al-duha-93": BookOpenText,

  // Paper 1 · History and Importance of the Qur'an
  "first-revelation": Sparkles,
  "modes-of-revelation": Layers,
  "compilation-under-abu-bakr": ScrollText,
  "standardisation-under-uthman": BadgeCheck,
  "quran-as-source-of-law": Scale,

  // Paper 1 · Life and Importance of Prophet Muhammad (pbuh)
  "arabia-before-islam": Mountain,
  "first-revelation-event": Sparkles,
  hijrah: Footprints,
  "farewell-sermon": Megaphone,

  // Paper 1 · The First Islamic Community
  "mothers-of-the-faithful": HeartHandshake,
  "ten-blessed-companions": Users,
  "emigrants-and-helpers": Handshake,
  "four-caliphs-in-prophets-lifetime": Shield,
  "scribes-of-revelation": PenTool,
  "status-of-women": Users,

  // Paper 2 · Major Teachings in the Hadiths of the Prophet
  "shahadah-and-worship": MessageCircle,
  "sincerity-ikhlas": HeartHandshake,
  "fighting-against-evil": Swords,
  "serving-the-cause-of-allah": Flag,
  "charity-and-sharing": Gift,
  "social-ethical-responsibilities": Users,
  "enjoining-good-forbidding-evil": MessageSquareWarning,
  "rights-and-brotherhood": Handshake,

  // Paper 2 · History and Importance of the Hadiths
  "isnad-and-matn": Link2,
  "authentication-of-hadith": BadgeCheck,
  "compilation-stages": Layers,
  "six-authentic-books": Library,
  "importance-of-hadith": Quote,

  // Paper 2 · The Rightly Guided Caliphs
  "abu-bakr": Crown,
  umar: Shield,
  uthman: BookOpen,
  ali: Swords,

  // Paper 2 · The Articles of Faith and the Pillars of Islam
  "belief-in-allah": Star,
  "belief-in-angels": Feather,
  "belief-in-revealed-books": BookOpen,
  "belief-in-prophets": Users,
  "belief-in-predestination": Compass,
  "belief-in-resurrection": Sunrise,
  "shahadah-pillar": MessageCircle,
  salah: Clock,
  zakah: Coins,
  sawm: Sunrise,
  hajj: Building2,
};

/**
 * Fallback icon for any subtopic slug not covered above (e.g. new subtopics added while this
 * page was being built) — guessed from keywords in its title so it still reads as deliberate.
 */
export function iconForSubtopic(slug: string, title: string): LucideIcon {
  const known = ICONS_BY_SLUG[slug];
  if (known) return known;

  const t = title.toLowerCase();
  if (t.includes("jihad") || t.includes("struggle") || t.includes("fighting")) return Swords;
  if (t.includes("hadith")) return Quote;
  if (t.includes("qur'an") || t.includes("quran") || t.includes("surah") || t.includes("ayah")) return BookOpenText;
  if (t.includes("caliph")) return Crown;
  if (t.includes("companion") || t.includes("women") || t.includes("helper") || t.includes("emigrant")) return Users;
  if (t.includes("angel")) return Feather;
  if (t.includes("belief") || t.includes("faith") || t.includes("predestination")) return Star;
  if (t.includes("hajj") || t.includes("pilgrim")) return Building2;
  if (t.includes("prayer") || t.includes("salah")) return Clock;
  if (t.includes("charity") || t.includes("zakah")) return Coins;
  if (t.includes("fast") || t.includes("sawm")) return Sunrise;
  return BookOpen;
}

// subtopic slug -> ids of matching entries in data/references.ts, hand-matched against the
// current reference bank's `sectionSlug` + `topic` fields (topic is free text, so exact string
// equality isn't reliable — this mapping is the source of truth until more content is added).
const REFERENCE_IDS_BY_SUBTOPIC: Record<string, string[]> = {
  "ayat-al-kursi": ["ref-ayat-al-kursi"],
  "al-ikhlas-112": ["ref-al-ikhlas"],
  "al-alaq-96-1-5": ["ref-al-alaq"],
  "al-fatiha-1-7": ["ref-al-fatiha"],
  "al-zilzal-99-1-8": ["ref-al-zilzal"],
  "first-revelation": ["ref-seerah-first-revelation"],
  "farewell-sermon": ["ref-seerah-farewell-sermon"],
  "abu-bakr": ["ref-companion-abu-bakr"],
  umar: ["ref-companion-umar"],
  uthman: ["ref-companion-uthman"],
  ali: ["ref-companion-ali"],
  "mothers-of-the-faithful": ["ref-companion-khadija", "ref-companion-aisha"],
  "emigrants-and-helpers": ["ref-companion-bilal"],
  "shahadah-and-worship": [],
  "sincerity-ikhlas": ["ref-hadith-intentions"],
  "fighting-against-evil": ["ref-hadith-greater-jihad"],
  "social-ethical-responsibilities": ["ref-hadith-neighbour"],
  "charity-and-sharing": ["ref-hadith-charity-smile"],
  "belief-in-allah": ["ref-article-belief-in-allah"],
  "belief-in-angels": ["ref-article-belief-in-angels"],
  "belief-in-revealed-books": ["ref-article-belief-in-books"],
  "belief-in-prophets": ["ref-article-belief-in-prophets"],
  "belief-in-predestination": ["ref-article-predestination"],
  "belief-in-resurrection": ["ref-article-last-day"],
  "shahadah-pillar": ["ref-pillar-shahadah"],
  salah: ["ref-pillar-salah"],
  zakah: ["ref-pillar-zakah"],
  sawm: ["ref-pillar-sawm"],
  hajj: ["ref-pillar-hajj"],
};

export function getReferencesForSubtopic(subtopicSlug: string) {
  const ids = REFERENCE_IDS_BY_SUBTOPIC[subtopicSlug] ?? [];
  return ids
    .map((id) => references.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
}
