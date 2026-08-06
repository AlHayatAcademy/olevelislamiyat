import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';

export interface EngagementRecord {
  id: string;
  userId: string;
  userName: string;
  contentId: string;
  contentType: 'discussion' | 'reply';
  classId: string;
  action: 'view' | 'reply' | 'like' | 'flag';
  createdAt: Timestamp;
}

export interface UserEngagementStats {
  userId: string;
  userName: string;
  totalDiscussions: number;
  totalReplies: number;
  totalLikes: number;
  totalViews: number;
  lastActivity: Timestamp | null;
  rank: number;
}

export interface ClassEngagementMetrics {
  classId: string;
  totalEngagements: number;
  activeUsers: number;
  totalDiscussions: number;
  totalReplies: number;
  averageRepliesPerDiscussion: number;
  mostActiveUser: UserEngagementStats | null;
  topContributors: UserEngagementStats[];
}

// Track view
export async function trackView(
  discussionId: string,
  userId: string,
  userName: string,
  classId: string,
): Promise<void> {
  await addDoc(collection(db, 'discussion_engagement'), {
    userId,
    userName,
    contentId: discussionId,
    contentType: 'discussion',
    classId,
    action: 'view',
    createdAt: Timestamp.now(),
  });
}

// Track reply
export async function trackReply(
  discussionId: string,
  userId: string,
  userName: string,
  classId: string,
): Promise<void> {
  await addDoc(collection(db, 'discussion_engagement'), {
    userId,
    userName,
    contentId: discussionId,
    contentType: 'discussion',
    classId,
    action: 'reply',
    createdAt: Timestamp.now(),
  });
}

// Track like
export async function trackLike(
  replyId: string,
  userId: string,
  userName: string,
  classId: string,
): Promise<void> {
  await addDoc(collection(db, 'discussion_engagement'), {
    userId,
    userName,
    contentId: replyId,
    contentType: 'reply',
    classId,
    action: 'like',
    createdAt: Timestamp.now(),
  });
}

// Track flag
export async function trackFlag(
  contentId: string,
  contentType: 'discussion' | 'reply',
  userId: string,
  userName: string,
  classId: string,
): Promise<void> {
  await addDoc(collection(db, 'discussion_engagement'), {
    userId,
    userName,
    contentId,
    contentType,
    classId,
    action: 'flag',
    createdAt: Timestamp.now(),
  });
}

// Get user engagement stats
export async function getUserEngagementStats(
  userId: string,
  classId?: string,
): Promise<UserEngagementStats | null> {
  let q;

  if (classId) {
    q = query(
      collection(db, 'discussion_engagement'),
      where('userId', '==', userId),
      where('classId', '==', classId),
    );
  } else {
    q = query(
      collection(db, 'discussion_engagement'),
      where('userId', '==', userId),
    );
  }

  const snapshot = await getDocs(q);
  const engagements = snapshot.docs.map((doc) =>
    doc.data(),
  ) as EngagementRecord[];

  if (engagements.length === 0) return null;

  const userName = engagements[0].userName;
  const stats = {
    userId,
    userName,
    totalDiscussions: engagements.filter(
      (e) => e.action === 'reply' && e.contentType === 'discussion',
    ).length,
    totalReplies: engagements.filter(
      (e) => e.action === 'reply' && e.contentType === 'reply',
    ).length,
    totalLikes: engagements.filter((e) => e.action === 'like').length,
    totalViews: engagements.filter((e) => e.action === 'view').length,
    lastActivity:
      engagements.length > 0
        ? engagements[engagements.length - 1].createdAt
        : null,
    rank: 0,
  };

  return stats;
}

// Get top contributors in class
export async function getTopContributors(
  classId: string,
  limitCount: number = 10,
): Promise<UserEngagementStats[]> {
  const q = query(
    collection(db, 'discussion_engagement'),
    where('classId', '==', classId),
    orderBy('createdAt', 'desc'),
    limit(10000), // Get all, then aggregate
  );

  const snapshot = await getDocs(q);
  const engagements = snapshot.docs.map((doc) =>
    doc.data(),
  ) as EngagementRecord[];

  // Aggregate by user
  const userStats = new Map<string, UserEngagementStats>();

  engagements.forEach((engagement) => {
    const existing = userStats.get(engagement.userId) || {
      userId: engagement.userId,
      userName: engagement.userName,
      totalDiscussions: 0,
      totalReplies: 0,
      totalLikes: 0,
      totalViews: 0,
      lastActivity: engagement.createdAt,
      rank: 0,
    };

    if (engagement.action === 'reply' && engagement.contentType === 'discussion') {
      existing.totalDiscussions++;
    } else if (
      engagement.action === 'reply' &&
      engagement.contentType === 'reply'
    ) {
      existing.totalReplies++;
    } else if (engagement.action === 'like') {
      existing.totalLikes++;
    } else if (engagement.action === 'view') {
      existing.totalViews++;
    }

    existing.lastActivity = engagement.createdAt;
    userStats.set(engagement.userId, existing);
  });

  // Sort by total engagement (weighted)
  const sorted = Array.from(userStats.values()).sort((a, b) => {
    const scoreA =
      a.totalDiscussions * 2 +
      a.totalReplies * 1.5 +
      a.totalLikes * 0.5 +
      a.totalViews * 0.1;
    const scoreB =
      b.totalDiscussions * 2 +
      b.totalReplies * 1.5 +
      b.totalLikes * 0.5 +
      b.totalViews * 0.1;
    return scoreB - scoreA;
  });

  // Add ranks
  sorted.forEach((stat, index) => {
    stat.rank = index + 1;
  });

  return sorted.slice(0, limitCount);
}

// Get class engagement metrics
export async function getClassEngagementMetrics(
  classId: string,
): Promise<ClassEngagementMetrics> {
  const q = query(
    collection(db, 'discussion_engagement'),
    where('classId', '==', classId),
  );

  const snapshot = await getDocs(q);
  const engagements = snapshot.docs.map((doc) =>
    doc.data(),
  ) as EngagementRecord[];

  const uniqueUsers = new Set(engagements.map((e) => e.userId));

  const discussions = engagements.filter(
    (e) => e.contentType === 'discussion' && e.action === 'reply',
  ).length;

  const replies = engagements.filter(
    (e) => e.contentType === 'reply' && e.action === 'reply',
  ).length;

  const topContributors = await getTopContributors(classId, 5);

  return {
    classId,
    totalEngagements: engagements.length,
    activeUsers: uniqueUsers.size,
    totalDiscussions: discussions,
    totalReplies: replies,
    averageRepliesPerDiscussion:
      discussions > 0 ? Math.round((replies / discussions) * 10) / 10 : 0,
    mostActiveUser: topContributors.length > 0 ? topContributors[0] : null,
    topContributors,
  };
}

// Get user ranking in class
export async function getUserRankingInClass(
  userId: string,
  classId: string,
): Promise<number | null> {
  const contributors = await getTopContributors(classId, 1000);
  const user = contributors.find((c) => c.userId === userId);
  return user ? user.rank : null;
}

// Get recent activity
export async function getRecentActivity(
  classId: string,
  limitCount: number = 20,
) {
  const q = query(
    collection(db, 'discussion_engagement'),
    where('classId', '==', classId),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as EngagementRecord[];
}

// Get daily activity trend
export async function getDailyActivityTrend(
  classId: string,
  days: number = 7,
) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const q = query(
    collection(db, 'discussion_engagement'),
    where('classId', '==', classId),
  );

  const snapshot = await getDocs(q);
  const engagements = snapshot.docs
    .map((doc) => doc.data() as EngagementRecord)
    .filter((e) => e.createdAt.toDate() >= cutoffDate);

  // Group by day
  const dailyStats = new Map<string, number>();

  engagements.forEach((engagement) => {
    const date = engagement.createdAt.toDate().toISOString().split('T')[0];
    dailyStats.set(date, (dailyStats.get(date) || 0) + 1);
  });

  // Convert to sorted array
  return Array.from(dailyStats.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
