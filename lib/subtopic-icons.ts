import {
  Puzzle,
  BookOpen,
  ScrollText,
  Users,
  Landmark,
  MessageSquareQuote,
  Crown,
  ListChecks,
  Sparkles,
  Feather,
  Mountain,
  Radio,
  BookMarked,
  BookCopy,
  Scale,
  MapPin,
  Compass,
  Mic,
  Heart,
  Star,
  Handshake,
  PenLine,
  UserRound,
  AlertTriangle,
  Shield,
  Flag,
  Gift,
  Megaphone,
  HeartHandshake,
  Link2,
  CheckCircle,
  Layers,
  Lightbulb,
  Hand,
  Clock,
  Coins,
  Moon,
  Sunrise,
  type LucideIcon,
} from "lucide-react";

// Section-level icon conventions, matched to the ones used on the /paper-1
// and /paper-2 hub pages (sectionIcons arrays) so the same section always
// reads with the same icon across the site.
export const paper1SectionIcons: Record<string, LucideIcon> = {
  "major-themes-of-the-quran": BookOpen,
  "history-of-the-quran": ScrollText,
  "life-of-prophet-muhammad": Users,
  "first-islamic-community": Landmark,
};

export const paper2SectionIcons: Record<string, LucideIcon> = {
  "major-teachings-of-hadith": MessageSquareQuote,
  "history-of-hadith": ScrollText,
  "rightly-guided-caliphs": Crown,
  "articles-of-faith-and-pillars": ListChecks,
};

// Subtopic-level icons, chosen to fit each topic's actual content. Falls back
// to the parent section's icon above when a subtopic isn't listed here.
export const subtopicIcons: Record<string, LucideIcon> = {
  // Paper 1 - Major Themes of the Qur'an
  "ayat-al-kursi": Crown,
  "al-anam-6-101-103": BookOpen,
  "al-ikhlas-112": Sparkles,
  "al-fatiha-1-7": BookOpen,
  "al-alaq-96-1-5": Feather,
  "al-zilzal-99-1-8": AlertTriangle,
  "adam-al-baqarah-2-30-37": UserRound,
  "isa-al-maidah-5-110": UserRound,
  "muhammad-al-duha-93": UserRound,
  // Paper 1 - History and Importance of the Qur'an
  "first-revelation": Mountain,
  "modes-of-revelation": Radio,
  "compilation-under-abu-bakr": BookMarked,
  "standardisation-under-uthman": BookCopy,
  "quran-as-source-of-law": Scale,
  // Paper 1 - Life and Importance of Prophet Muhammad (pbuh)
  "arabia-before-islam": MapPin,
  "first-revelation-event": Mountain,
  hijrah: Compass,
  "farewell-sermon": Mic,
  // Paper 1 - The First Islamic Community
  "mothers-of-the-faithful": Heart,
  "ten-blessed-companions": Star,
  "emigrants-and-helpers": Handshake,
  "four-caliphs-in-prophets-lifetime": Crown,
  "scribes-of-revelation": PenLine,
  "status-of-women": UserRound,
  // Paper 2 - Major Teachings in the Hadiths
  "shahadah-and-worship": Hand,
  "sincerity-ikhlas": Heart,
  "fighting-against-evil": Shield,
  "serving-the-cause-of-allah": Flag,
  "charity-and-sharing": Gift,
  "social-ethical-responsibilities": Users,
  "enjoining-good-forbidding-evil": Megaphone,
  "rights-and-brotherhood": HeartHandshake,
  // Paper 2 - History and Importance of the Hadiths
  "isnad-and-matn": Link2,
  "authentication-of-hadith": CheckCircle,
  "compilation-stages": Layers,
  "six-authentic-books": BookMarked,
  "importance-of-hadith": Lightbulb,
  // Paper 2 - The Rightly Guided Caliphs
  "abu-bakr": Crown,
  umar: Crown,
  uthman: Crown,
  ali: Crown,
  // Paper 2 - Articles of Faith and Pillars of Islam
  "belief-in-allah": Sparkles,
  "belief-in-angels": Feather,
  "belief-in-revealed-books": BookOpen,
  "belief-in-prophets": UserRound,
  "belief-in-predestination": Compass,
  "belief-in-resurrection": Sunrise,
  "shahadah-pillar": Hand,
  salah: Clock,
  zakah: Coins,
  sawm: Moon,
  hajj: MapPin,
};

/**
 * Resolve the best-matching icon for a given subtopic, falling back to its
 * parent section's icon, and finally to a generic placeholder icon.
 */
export function getSubtopicIcon(paper: 1 | 2, sectionSlug: string, subtopicSlug: string): LucideIcon {
  return (
    subtopicIcons[subtopicSlug] ??
    (paper === 1 ? paper1SectionIcons[sectionSlug] : paper2SectionIcons[sectionSlug]) ??
    Puzzle
  );
}
