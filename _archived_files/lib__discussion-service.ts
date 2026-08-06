import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Discussion {
  id: string;
  classId: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPinned: boolean;
  isApproved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  tagIds: string[];
  replyCount: number;
  viewCount: number;
  createdBy: 'teacher' | 'student';
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  parentReplyId?: string;
  classId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isApproved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  isHelpful: boolean;
  likeCount: number;
  likedBy: string[];
}

export interface DiscussionFilters {
  sortBy?: 'recent' | 'popular' | 'mostReplies';
  tagIds?: string[];
  status?: 'all' | 'pending' | 'approved' | 'rejected';
  authorId?: string;
  limit?: number;
  pageSize?: number;
}

// Create discussion
export async function createDiscussion(
  classId: string,
  title: string,
  content: string,
  userId: string,
  userName: string,
  email: string,
  userRole: 'teacher' | 'student',
  tagIds: string[] = [],
): Promise<string> {
  const discussionRef = await addDoc(collection(db, 'discussions'), {
    classId,
    title,
    content,
    authorId: userId,
    authorName: userName,
    authorEmail: email,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    isPinned: false,
    isApproved: userRole === 'teacher' ? true : false,
    status: userRole === 'teacher' ? 'approved' : 'pending',
    tagIds,
    replyCount: 0,
    viewCount: 0,
    createdBy: userRole,
  });

  return discussionRef.id;
}

// Get discussions for class
export async function getDiscussions(
  classId: string,
  filters: DiscussionFilters = {},
): Promise<Discussion[]> {
  const {
    sortBy = 'recent',
    tagIds = [],
    status = 'approved',
    limit: resultLimit = 20,
  } = filters;

  let q = query(
    collection(db, 'discussions'),
    where('classId', '==', classId),
  );

  // Add status filter
  if (status !== 'all') {
    q = query(
      collection(db, 'discussions'),
      where('classId', '==', classId),
      where('status', '==', status),
    );
  }

  // Apply sorting
  if (sortBy === 'recent') {
    q = query(q, orderBy('createdAt', 'desc'), limit(resultLimit));
  } else if (sortBy === 'popular') {
    q = query(q, orderBy('viewCount', 'desc'), limit(resultLimit));
  } else if (sortBy === 'mostReplies') {
    q = query(q, orderBy('replyCount', 'desc'), limit(resultLimit));
  }

  const snapshot = await getDocs(q);
  let discussions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Discussion[];

  // Filter by tags if provided
  if (tagIds.length > 0) {
    discussions = discussions.filter((d) =>
      tagIds.some((tag) => d.tagIds.includes(tag)),
    );
  }

  return discussions;
}

// Get single discussion
export async function getDiscussionById(
  discussionId: string,
): Promise<Discussion | null> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Discussion;
}

// Increment view count
export async function incrementViewCount(discussionId: string): Promise<void> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const currentViews = docSnap.data().viewCount || 0;
    await updateDoc(docRef, {
      viewCount: currentViews + 1,
    });
  }
}

// Update discussion
export async function updateDiscussion(
  discussionId: string,
  userId: string,
  data: Partial<Discussion>,
): Promise<void> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Discussion not found');

  const discussion = docSnap.data() as Discussion;

  // Only author or teacher can edit
  if (discussion.authorId !== userId && discussion.createdBy !== 'teacher') {
    throw new Error('Unauthorized');
  }

  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

// Delete discussion (cascade to replies)
export async function deleteDiscussion(
  discussionId: string,
  userId: string,
): Promise<void> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Discussion not found');

  const discussion = docSnap.data() as Discussion;

  // Only author or admin can delete
  if (discussion.authorId !== userId) {
    throw new Error('Unauthorized');
  }

  // Delete all replies
  const repliesSnap = await getDocs(
    query(
      collection(db, 'discussion_replies'),
      where('discussionId', '==', discussionId),
    ),
  );

  const batch = writeBatch(db);
  repliesSnap.docs.forEach((doc) => batch.delete(doc.ref));
  batch.delete(docRef);

  await batch.commit();
}

// Pin discussion (teachers only)
export async function togglePin(
  discussionId: string,
  userId: string,
  userRole: string,
): Promise<void> {
  if (userRole !== 'teacher') throw new Error('Only teachers can pin');

  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Discussion not found');

  const currentPin = docSnap.data().isPinned || false;
  await updateDoc(docRef, { isPinned: !currentPin });
}

// Add reply to discussion
export async function addReply(
  discussionId: string,
  content: string,
  userId: string,
  userName: string,
  email: string,
  userRole: 'teacher' | 'student',
  parentReplyId?: string,
): Promise<string> {
  const docRef = doc(db, 'discussions', discussionId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Discussion not found');

  const discussion = docSnap.data() as Discussion;

  const replyRef = await addDoc(
    collection(db, 'discussion_replies'),
    {
      discussionId,
      parentReplyId: parentReplyId || null,
      classId: discussion.classId,
      content,
      authorId: userId,
      authorName: userName,
      authorEmail: email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isApproved: userRole === 'teacher' ? true : false,
      status: userRole === 'teacher' ? 'approved' : 'pending',
      isHelpful: false,
      likeCount: 0,
      likedBy: [],
    },
  );

  // Increment reply count
  await updateDoc(docRef, {
    replyCount: (discussion.replyCount || 0) + 1,
  });

  return replyRef.id;
}

// Get replies for discussion
export async function getReplies(
  discussionId: string,
  filters?: { status?: string; sortBy?: 'recent' | 'popular' },
): Promise<DiscussionReply[]> {
  const { status = 'approved', sortBy = 'recent' } = filters || {};

  let q = query(
    collection(db, 'discussion_replies'),
    where('discussionId', '==', discussionId),
  );

  if (status !== 'all') {
    q = query(
      collection(db, 'discussion_replies'),
      where('discussionId', '==', discussionId),
      where('status', '==', status),
    );
  }

  if (sortBy === 'recent') {
    q = query(q, orderBy('createdAt', 'asc'));
  } else if (sortBy === 'popular') {
    q = query(q, orderBy('likeCount', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DiscussionReply[];
}

// Update reply
export async function updateReply(
  replyId: string,
  userId: string,
  content: string,
): Promise<void> {
  const docRef = doc(db, 'discussion_replies', replyId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Reply not found');

  const reply = docSnap.data() as DiscussionReply;

  if (reply.authorId !== userId) throw new Error('Unauthorized');

  await updateDoc(docRef, {
    content,
    updatedAt: Timestamp.now(),
  });
}

// Delete reply
export async function deleteReply(
  replyId: string,
  userId: string,
): Promise<void> {
  const docRef = doc(db, 'discussion_replies', replyId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Reply not found');

  const reply = docSnap.data() as DiscussionReply;

  if (reply.authorId !== userId) throw new Error('Unauthorized');

  // Decrement discussion reply count
  const discussionRef = doc(db, 'discussions', reply.discussionId);
  const discussionSnap = await getDoc(discussionRef);

  if (discussionSnap.exists()) {
    const currentCount = discussionSnap.data().replyCount || 0;
    await updateDoc(discussionRef, {
      replyCount: Math.max(0, currentCount - 1),
    });
  }

  await deleteDoc(docRef);
}

// Like reply
export async function toggleLikeReply(
  replyId: string,
  userId: string,
): Promise<void> {
  const docRef = doc(db, 'discussion_replies', replyId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Reply not found');

  const reply = docSnap.data() as DiscussionReply;
  const likedBy = reply.likedBy || [];
  const hasLiked = likedBy.includes(userId);

  await updateDoc(docRef, {
    likedBy: hasLiked
      ? likedBy.filter((id) => id !== userId)
      : [...likedBy, userId],
    likeCount: hasLiked
      ? Math.max(0, (reply.likeCount || 0) - 1)
      : (reply.likeCount || 0) + 1,
  });
}

// Mark as helpful (teachers)
export async function markHelpful(
  replyId: string,
  userRole: string,
): Promise<void> {
  if (userRole !== 'teacher') throw new Error('Only teachers can mark helpful');

  const docRef = doc(db, 'discussion_replies', replyId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error('Reply not found');

  const reply = docSnap.data() as DiscussionReply;
  await updateDoc(docRef, {
    isHelpful: !reply.isHelpful,
  });
}

// Get user's discussions
export async function getUserDiscussions(
  userId: string,
  limit: number = 10,
): Promise<Discussion[]> {
  const q = query(
    collection(db, 'discussions'),
    where('authorId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limit),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Discussion[];
}
