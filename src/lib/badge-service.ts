import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  awardedDate: Timestamp;
  metadata: {
    quizCount?: number;
    topic?: string;
    streakDays?: number;
    percentile?: number;
    score?: number;
  };
}

const BADGE_DEFINITIONS = {
  milestone_10: {
    name: '🥉 Getting Started',
    description: 'Completed 10 quizzes',
    rarity: 'common' as Rarity,
    icon: '🥉',
  },
  milestone_25: {
    name: '🥈 Committed',
    description: 'Completed 25 quizzes',
    rarity: 'rare' as Rarity,
    icon: '🥈',
  },
  milestone_50: {
    name: '🥇 Dedicated',
    description: 'Completed 50 quizzes',
    rarity: 'epic' as Rarity,
    icon: '🥇',
  },
  milestone_100: {
    name: '👑 Master Learner',
    description: 'Completed 100 quizzes',
    rarity: 'legendary' as Rarity,
    icon: '👑',
  },
  mastery_topic: {
    name: '📚 Topic Master',
    description: '80%+ on all questions in topic',
    rarity: 'rare' as Rarity,
    icon: '📚',
  },
  mastery_subject: {
    name: '🎓 Subject Expert',
    description: '80%+ average in class',
    rarity: 'epic' as Rarity,
    icon: '🎓',
  },
  mastery_perfect: {
    name: '🔥 Perfect Score',
    description: '100% on a quiz',
    rarity: 'epic' as Rarity,
    icon: '🔥',
  },
  streak_7: {
    name: '🔥 Consistent',
    description: '7-day study streak',
    rarity: 'rare' as Rarity,
    icon: '🔥',
  },
  streak_14: {
    name: '💪 Unstoppable',
    description: '14-day study streak',
    rarity: 'epic' as Rarity,
    icon: '💪',
  },
  streak_30: {
    name: '⚡ Legendary',
    description: '30-day study streak',
    rarity: 'legendary' as Rarity,
    icon: '⚡',
  },
  performance_top10: {
    name: '⭐ Top 10%',
    description: 'Highest scorer in class',
    rarity: 'epic' as Rarity,
    icon: '⭐',
  },
  performance_rising: {
    name: '📈 Rising Star',
    description: 'Biggest improvement week-over-week',
    rarity: 'rare' as Rarity,
    icon: '📈',
  },
  performance_speedster: {
    name: '🎯 Speedster',
    description: 'Fastest quiz completion',
    rarity: 'rare' as Rarity,
    icon: '🎯',
  },
};

export async function awardBadge(
  userId: string,
  badgeType: BadgeType,
  badgeKey: string,
  metadata: any = {}
): Promise<Badge | null> {
  try {
    // Check if user already has this badge
    const existing = await query(
      collection(db, 'badges'),
      where('userId', '==', userId),
      where('name', '==', BADGE_DEFINITIONS[badgeKey as keyof typeof BADGE_DEFINITIONS]?.name)
    );

    const existingSnapshot = await getDocs(existing);
    if (existingSnapshot.size > 0) {
      return null; // Badge already awarded
    }

    const badgeDef =
      BADGE_DEFINITIONS[badgeKey as keyof typeof BADGE_DEFINITIONS];

    if (!badgeDef) {
      console.error(`Unknown badge key: ${badgeKey}`);
      return null;
    }

    const badgeId = doc(collection(db, 'badges')).id;
    const badge: Badge = {
      id: badgeId,
      userId,
      badgeType,
      name: badgeDef.name,
      description: badgeDef.description,
      icon: badgeDef.icon,
      rarity: badgeDef.rarity,
      awardedDate: Timestamp.now(),
      metadata,
    };

    await setDoc(doc(db, 'badges', badgeId), badge);
    return badge;
  } catch (error) {
    console.error('Error awarding badge:', error);
    return null;
  }
}

export async function getUserBadges(userId: string): Promise<Badge[]> {
  try {
    const q = query(collection(db, 'badges'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Badge);
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }
}

export async function getBadgesForClass(classId: string): Promise<Badge[]> {
  try {
    const q = query(
      collection(db, 'badges'),
      where('metadata.classId', '==', classId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Badge);
  } catch (error) {
    console.error('Error fetching class badges:', error);
    return [];
  }
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
  const awardedBadges: Badge[] = [];

  try {
    // Milestone badges
    if (totalQuizzes === 10) {
      const badge = await awardBadge(
        userId,
        'milestone',
        'milestone_10',
        { quizCount: 10 }
      );
      if (badge) awardedBadges.push(badge);
    }
    if (totalQuizzes === 25) {
      const badge = await awardBadge(
        userId,
        'milestone',
        'milestone_25',
        { quizCount: 25 }
      );
      if (badge) awardedBadges.push(badge);
    }
    if (totalQuizzes === 50) {
      const badge = await awardBadge(
        userId,
        'milestone',
        'milestone_50',
        { quizCount: 50 }
      );
      if (badge) awardedBadges.push(badge);
    }
    if (totalQuizzes === 100) {
      const badge = await awardBadge(
        userId,
        'milestone',
        'milestone_100',
        { quizCount: 100 }
      );
      if (badge) awardedBadges.push(badge);
    }

    // Mastery badges
    for (const [topic, score] of Object.entries(topicScores)) {
      if (score >= 80) {
        const badge = await awardBadge(
          userId,
          'mastery',
          'mastery_topic',
          { topic, score }
        );
        if (badge) awardedBadges.push(badge);
      }
    }

    // Streak badges
    if (currentStreak === 7) {
      const badge = await awardBadge(
        userId,
        'streak',
        'streak_7',
        { streakDays: 7 }
      );
      if (badge) awardedBadges.push(badge);
    }
    if (currentStreak === 14) {
      const badge = await awardBadge(
        userId,
        'streak',
        'streak_14',
        { streakDays: 14 }
      );
      if (badge) awardedBadges.push(badge);
    }
    if (currentStreak === 30) {
      const badge = await awardBadge(
        userId,
        'streak',
        'streak_30',
        { streakDays: 30 }
      );
      if (badge) awardedBadges.push(badge);
    }

    // Performance badges
    if (classRank === 1) {
      const badge = await awardBadge(
        userId,
        'performance',
        'performance_top10',
        { percentile: Math.round((1 / classSize) * 100) }
      );
      if (badge) awardedBadges.push(badge);
    }

    return awardedBadges;
  } catch (error) {
    console.error('Error checking badge eligibility:', error);
    return awardedBadges;
  }
}

export async function getBadgeDetails(badgeId: string): Promise<Badge | null> {
  try {
    const snapshot = await getDoc(doc(db, 'badges', badgeId));
    return snapshot.exists() ? (snapshot.data() as Badge) : null;
  } catch (error) {
    console.error('Error fetching badge details:', error);
    return null;
  }
}

export async function getUserBadgeCount(userId: string): Promise<number> {
  try {
    const q = query(collection(db, 'badges'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting badge count:', error);
    return 0;
  }
}

export async function getBadgesByRarity(
  userId: string,
  rarity: Rarity
): Promise<Badge[]> {
  try {
    const q = query(
      collection(db, 'badges'),
      where('userId', '==', userId),
      where('rarity', '==', rarity)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Badge);
  } catch (error) {
    console.error('Error fetching badges by rarity:', error);
    return [];
  }
}

export async function getBadgesByType(
  userId: string,
  badgeType: BadgeType
): Promise<Badge[]> {
  try {
    const q = query(
      collection(db, 'badges'),
      where('userId', '==', userId),
      where('badgeType', '==', badgeType)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Badge);
  } catch (error) {
    console.error('Error fetching badges by type:', error);
    return [];
  }
}
