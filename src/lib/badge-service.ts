export type BadgeType = 'milestone' | 'mastery' | 'streak' | 'performance';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  userId: string;
  badgeType: BadgeType;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  awardedDate: Date;
  metadata: {
    quizCount?: number;
    topic?: string;
    streakDays?: number;
    percentile?: number;
    score?: number;
  };
}

export async function awardBadge(
  userId: string,
  badgeType: BadgeType,
  badgeKey: string,
  metadata: Record<string, unknown> = {}
): Promise<Badge | null> {
  return null;
}

export async function getUserBadges(userId: string): Promise<Badge[]> {
  return [];
}

export async function getBadgesForClass(classId: string): Promise<Badge[]> {
  return [];
}

export async function checkBadgeEligibility(
  userId: string,
  classId: string,
  totalQuizzes: number,
  topicScores: { [key: string]: number },
  currentStreak: number,
  classRank: number,
  classSize: number
): Promise<Badge[]> {
  return [];
}

export async function getBadgeDetails(badgeId: string): Promise<Badge | null> {
  return null;
}

export async function getUserBadgeCount(userId: string): Promise<number> {
  return 0;
}

export async function getBadgesByRarity(
  userId: string,
  rarity: Rarity
): Promise<Badge[]> {
  return [];
}

export async function getBadgesByType(
  userId: string,
  badgeType: BadgeType
): Promise<Badge[]> {
  return [];
}
