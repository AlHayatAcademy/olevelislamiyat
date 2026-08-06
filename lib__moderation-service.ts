import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface ContentFlag {
  id: string;
  contentId: string;
  contentType: 'discussion' | 'reply';
  classId: string;
  reason: string;
  details?: string;
  reportedBy: string;
  reportedByName: string;
  createdAt: Timestamp;
  status: 'pending' | 'resolved' | 'dismissed';
  resolvedBy?: string;
  resolution?: string;
}

export interface ModerationSettings {
  classId: string;
  requireApproval: boolean;
  autoRemoveAfterFlags: number;
  moderators: string[];
  bannedUsers: string[];
  updatedAt: Timestamp;
}

// Get pending discussions for teacher
export async function getPendingDiscussions(classId: string) {
  const q = query(
    collection(db, 'discussions'),
    where('classId', '==', classId),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get pending replies for teacher
export async function getPendingReplies(classId: string) {
  const q = query(
    collection(db, 'discussion_replies'),
    where('classId', '==', classId),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Approve discussion
export async function approveDiscussion(
  discussionId: string,
  teacherId: string,
): Promise<void> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Discussion not found');

  await updateDoc(docRef, {
    status: 'approved',
    isApproved: true,
    updatedAt: Timestamp.now(),
  });
}

// Reject discussion
export async function rejectDiscussion(
  discussionId: string,
  reason: string,
  teacherId: string,
): Promise<void> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Discussion not found');

  await updateDoc(docRef, {
    status: 'rejected',
    isApproved: false,
    rejectionReason: reason,
    updatedAt: Timestamp.now(),
  });
}

// Approve reply
export async function approveReply(
  replyId: string,
  teacherId: string,
): Promise<void> {
  const docRef = doc(db, 'discussion_replies', replyId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Reply not found');

  await updateDoc(docRef, {
    status: 'approved',
    isApproved: true,
    updatedAt: Timestamp.now(),
  });
}

// Reject reply
export async function rejectReply(
  replyId: string,
  reason: string,
  teacherId: string,
): Promise<void> {
  const docRef = doc(db, 'discussion_replies', replyId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Reply not found');

  await updateDoc(docRef, {
    status: 'rejected',
    isApproved: false,
    rejectionReason: reason,
    updatedAt: Timestamp.now(),
  });
}

// Remove content (soft delete)
export async function removeContent(
  contentId: string,
  contentType: 'discussion' | 'reply',
  reason: string,
): Promise<void> {
  const collectionName =
    contentType === 'discussion' ? 'discussions' : 'discussion_replies';
  const docRef = doc(db, collectionName, contentId);

  await updateDoc(docRef, {
    isRemoved: true,
    removalReason: reason,
    removedAt: Timestamp.now(),
  });
}

// Flag content (students report)
export async function flagContent(
  contentId: string,
  contentType: 'discussion' | 'reply',
  reason: string,
  details: string,
  userId: string,
  userName: string,
  classId: string,
): Promise<string> {
  // Get content to get classId if not provided
  const collectionName =
    contentType === 'discussion' ? 'discussions' : 'discussion_replies';
  const docRef = doc(db, collectionName, contentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Content not found');

  const contentClassId = docSnap.data().classId;

  // Create flag record
  const flagRef = await collection(db, 'content_flags').add({
    contentId,
    contentType,
    classId: contentClassId,
    reason,
    details,
    reportedBy: userId,
    reportedByName: userName,
    createdAt: Timestamp.now(),
    status: 'pending',
  });

  // Increment flag count on content
  const flagCount = docSnap.data().flagCount || 0;
  await updateDoc(docRef, {
    flagCount: flagCount + 1,
    flaggedBy: [
      ...(docSnap.data().flaggedBy || []),
      { userId, reason, timestamp: Timestamp.now() },
    ],
  });

  return flagRef.id;
}

// Get flagged content
export async function getFlaggedContent(classId: string) {
  const q = query(
    collection(db, 'content_flags'),
    where('classId', '==', classId),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ContentFlag[];
}

// Resolve flag
export async function resolveFlag(
  flagId: string,
  resolution: string,
  teacherId: string,
): Promise<void> {
  const docRef = doc(db, 'content_flags', flagId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Flag not found');

  const flag = docSnap.data() as ContentFlag;

  await updateDoc(docRef, {
    status: 'resolved',
    resolution,
    resolvedBy: teacherId,
    resolvedAt: Timestamp.now(),
  });
}

// Dismiss flag
export async function dismissFlag(
  flagId: string,
  teacherId: string,
): Promise<void> {
  const docRef = doc(db, 'content_flags', flagId);

  await updateDoc(docRef, {
    status: 'dismissed',
    resolvedBy: teacherId,
    resolvedAt: Timestamp.now(),
  });
}

// Set class moderation mode
export async function setModerationMode(
  classId: string,
  requireApproval: boolean,
): Promise<void> {
  const docRef = doc(db, 'moderation_settings', classId);

  await updateDoc(docRef, {
    requireApproval,
    updatedAt: Timestamp.now(),
  });
}

// Get moderation settings
export async function getModerationSettings(
  classId: string,
): Promise<ModerationSettings | null> {
  const docRef = doc(db, 'moderation_settings', classId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    classId,
    ...docSnap.data(),
  } as ModerationSettings;
}

// Ban user from class forums
export async function banUserFromForums(
  classId: string,
  userId: string,
  reason: string,
): Promise<void> {
  const docRef = doc(db, 'moderation_settings', classId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Moderation settings not found');

  const bannedUsers = docSnap.data().bannedUsers || [];

  if (!bannedUsers.includes(userId)) {
    await updateDoc(docRef, {
      bannedUsers: [...bannedUsers, userId],
      updatedAt: Timestamp.now(),
    });
  }
}

// Unban user from class forums
export async function unbanUserFromForums(
  classId: string,
  userId: string,
): Promise<void> {
  const docRef = doc(db, 'moderation_settings', classId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Moderation settings not found');

  const bannedUsers = docSnap.data().bannedUsers || [];

  await updateDoc(docRef, {
    bannedUsers: bannedUsers.filter((id: string) => id !== userId),
    updatedAt: Timestamp.now(),
  });
}

// Check if user is banned
export async function isUserBanned(
  classId: string,
  userId: string,
): Promise<boolean> {
  const settings = await getModerationSettings(classId);
  if (!settings) return false;

  return settings.bannedUsers.includes(userId);
}

// Get moderation stats
export async function getModerationStats(classId: string) {
  const pending = await getPendingDiscussions(classId);
  const pendingReplies = await getPendingReplies(classId);
  const flags = await getFlaggedContent(classId);

  return {
    pendingDiscussions: pending.length,
    pendingReplies: pendingReplies.length,
    flaggedContent: flags.length,
    total: pending.length + pendingReplies.length + flags.length,
  };
}
