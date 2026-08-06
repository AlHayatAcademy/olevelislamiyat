# Phase 12: Social Learning & Peer Discussions

## Overview
Implement peer discussion forums with real-time comments, topic creation, moderation, and community engagement features to foster collaborative learning.

## Architecture

### Core Components
1. **Forum System** - Class-level forums with topic discussions
2. **Real-Time Comments** - Live comment threads with Firestore listeners
3. **User Profiles** - Student profiles with avatars and participation stats
4. **Moderation** - Teacher approval workflows and content moderation
5. **Mobile-First** - Touch-optimized for mobile devices
6. **Analytics** - Track engagement and discussion metrics

### Key Features

✅ **Class Forums**
- Browse all forum topics for a class
- Create new discussion topics
- Real-time comment threads
- Nested replies support

✅ **Real-Time Updates**
- Live comment rendering
- Instant notification on new replies
- User typing indicators
- Active participant list

✅ **User Engagement**
- User avatars with initials
- Participation badges
- Like/upvote system
- Helpful answer marking

✅ **Moderation**
- Teacher approval workflow
- Flag inappropriate content
- Delete/edit functionality
- Moderation dashboard

✅ **Mobile Optimized**
- Touch-friendly interface
- Swipe actions for mobile
- Optimized text input
- Responsive layout

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## Database Schema

```typescript
// discussions table
interface Discussion {
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
  tagIds: string[]; // quiz topics
  replyCount: number;
  viewCount: number;
  createdBy: 'teacher' | 'student';
}

// discussion_replies table
interface DiscussionReply {
  id: string;
  discussionId: string;
  parentReplyId?: string; // null for top-level reply
  classId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isApproved: boolean;
  status: 'pending' | 'approved' | 'rejected';
  isHelpful: boolean; // marked as helpful answer
  likeCount: number;
  likedBy: string[]; // array of user IDs
}

// discussion_engagement table
interface DiscussionEngagement {
  id: string;
  userId: string;
  discussionId: string;
  action: 'view' | 'reply' | 'like' | 'flag';
  createdAt: Timestamp;
}
```

## File Structure

```
src/
├── lib/
│   ├── discussion-service.ts      // Discussion CRUD operations
│   ├── moderation-service.ts      // Content moderation
│   └── engagement-service.ts      // Tracking user engagement
├── hooks/
│   ├── useDiscussions.ts          // Fetch discussions real-time
│   ├── useDiscussionReplies.ts    // Fetch replies with nesting
│   └── useEngagement.ts           // Track view/interaction
├── components/
│   ├── ForumPage.tsx              // Main forum container
│   ├── DiscussionList.tsx         // List of topics
│   ├── DiscussionThread.tsx       // Single discussion view
│   ├── CommentInput.tsx           // Reply/comment composer
│   ├── CommentItem.tsx            // Individual comment
│   ├── UserAvatar.tsx             // User avatar with initials
│   ├── ModerationPanel.tsx        // Teacher moderation UI
│   └── EngagementBadges.tsx       // Participation indicators
└── app/
    ├── classes/[id]/forum/page.tsx
    └── admin/moderation/page.tsx
```

## Key Services

### discussion-service.ts
```typescript
// Create discussion
createDiscussion(classId, title, content, userId, userName, email): Promise<string>

// Get discussions
getDiscussions(classId, filters?): Promise<Discussion[]>
getDiscussionById(discussionId): Promise<Discussion>

// Update discussion
updateDiscussion(discussionId, userId, data): Promise<void>
deleteDiscussion(discussionId, userId): Promise<void>

// Replies
addReply(discussionId, content, userId, userName, email, parentReplyId?): Promise<string>
getReplies(discussionId): Promise<DiscussionReply[]>
updateReply(replyId, userId, content): Promise<void>
deleteReply(replyId, userId): Promise<void>

// Engagement
likeReply(replyId, userId): Promise<void>
markHelpful(replyId, userId): Promise<void>
flagContent(contentId, reason, userId): Promise<void>
```

### moderation-service.ts
```typescript
// Approval workflows
getPendingDiscussions(classId): Promise<Discussion[]>
getPendingReplies(classId): Promise<DiscussionReply[]>

// Actions
approveContent(contentId, contentType): Promise<void>
rejectContent(contentId, reason): Promise<void>
removeContent(contentId, reason): Promise<void>

// Settings
setModerationMode(classId, mode): Promise<void>
getClassModerationSettings(classId): Promise<ModerationSettings>
```

### engagement-service.ts
```typescript
// Track engagement
trackView(discussionId, userId): Promise<void>
trackReply(discussionId, userId): Promise<void>

// Analytics
getEngagementStats(classId, userId): Promise<EngagementStats>
getClassEngagementMetrics(classId): Promise<ClassMetrics>
getTopContributors(classId, limit): Promise<User[]>
```

## Component Specs

### ForumPage.tsx
- Tab navigation: "Recent" | "Popular" | "My Topics" | "Unanswered"
- Search functionality
- Create new discussion button
- Filter by tags (quiz topics)
- Infinite scroll or pagination
- Mobile: collapsible filters

### DiscussionList.tsx
- Displays topics with:
  - Title and preview
  - Author avatar + name
  - Reply count
  - View count
  - Last activity timestamp
  - Tag badges
  - Pin indicator (for teacher)
- Sorting: Recent | Popular | Most Replies
- Mobile: card layout, full width

### DiscussionThread.tsx
- Full discussion content
- Author info with profile link
- Real-time reply count
- Create reply input (bottom sticky on mobile)
- Nested replies (max 2 levels)
- Like/flag buttons
- Edit/delete (if author)
- Teacher: approve/reject buttons

### CommentInput.tsx
- Rich text editor (basic formatting)
- Character limit indicator
- Submit/Cancel buttons
- Preview toggle
- Mobile: full-width, auto-expand on focus
- Keyboard: Ctrl+Enter to submit

### UserAvatar.tsx
- Circular avatar with initials
- Background color from hash (consistent per user)
- Fallback to default icon
- Size variants: xs (24px), sm (32px), md (40px), lg (56px)
- Clickable to profile

## Real-Time Features

### Firestore Listeners
```typescript
// Listen for new replies
onSnapshot(
  query(collection(db, 'discussion_replies'), 
    where('discussionId', '==', discussionId),
    orderBy('createdAt', 'asc')
  ),
  (snapshot) => setReplies(snapshot.docs.map(doc => doc.data()))
)

// Listen for discussion updates
onSnapshot(doc(db, 'discussions', discussionId), (doc) => {
  setDiscussion(doc.data())
})
```

### Typing Indicators
- Track active typists in Firestore
- Show "User is typing..." UI
- Auto-clear after 5s of inactivity

## Moderation Workflow

### Pre-Approval (Default)
1. Student creates discussion/reply
2. Status set to "pending"
3. Teacher reviews in moderation panel
4. Teacher approves/rejects
5. Content visible to class (if approved)

### Post-Approval (Optional)
1. Content visible immediately
2. Teacher can flag/remove later
3. Use for high-trust communities

### Flagging
- Students can flag inappropriate content
- Reason dropdown (spam, offensive, off-topic, etc.)
- Teacher notified in moderation panel
- Automatic removal after threshold

## Mobile Optimizations

- Touch-friendly reply buttons (min 44px)
- Swipe to edit/delete on mobile
- Fixed input at bottom of screen
- Auto-focus on compose
- Soft keyboard handling
- Scroll to latest reply on open

## Dark Mode
- All components support `dark:` prefixes
- Avatar colors contrast-checked
- Text readable in both modes
- Badges inherit theme

## Testing Checklist

- [ ] Create discussion as student
- [ ] Reply to discussion
- [ ] Nested replies working
- [ ] Real-time updates appear instantly
- [ ] Like/flag functionality
- [ ] Teacher moderation flow
- [ ] Edit/delete own content
- [ ] Mobile layout responsive
- [ ] Dark mode working
- [ ] Keyboard navigation
- [ ] Search functionality
- [ ] Filter by tags
- [ ] Pagination/infinite scroll
- [ ] Typing indicators
- [ ] Accessibility (ARIA labels)

## Performance Considerations

- Paginate replies (20 per load)
- Index on classId + createdAt
- Cache discussion list (5 min)
- Lazy load nested replies
- Debounce typing indicator (500ms)
- Optimize avatar rendering

## Security

- Firestore RLS: students can't edit others' content
- Teacher can always moderate
- Prevent SQL injection in search
- Rate limit API calls (10 req/s per user)
- Sanitize HTML input
- XSS protection via React escaping

## Success Metrics

- Daily Active Users in forum
- Average replies per discussion
- Time spent in forums
- Student satisfaction (survey)
- Teacher moderation load
- Spam/flagged content ratio

## Next Steps

1. Copy files to project
2. Update Firestore RLS for discussions collections
3. Add routes: `/classes/[id]/forum`
4. Test moderation workflow
5. Deploy and monitor engagement
6. Proceed to Phase 13 (AI Learning Aids)
