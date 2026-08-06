# Phase 12: Social Learning & Communities

## Overview
Enable peer collaboration, study groups, discussion forums, and community learning features.

## Features

### 1. Study Groups
```typescript
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  topic: string;
  members: User[];
  created_by: string;
  created_at: string;
  is_public: boolean;
}
```

- Create public/private study groups by topic
- Invite friends or join public groups
- Shared quiz attempts and group scores
- Group chat/discussion

### 2. Discussion Forums by Topic
- Thread-based discussions per topic
- Up/downvote helpful answers
- Mark solutions
- Teacher participation and verification badges

### 3. Peer Review System
- Students submit quiz explanations
- Peers provide feedback
- Teachers can endorse quality explanations
- Gamification (reputation points)

### 4. Leaderboards (Optional)
- Topic-specific leaderboards (regional, school, class)
- Weekly/monthly challenges
- Achievements to unlock
- Privacy-respecting (opt-in)

### 5. Notifications
- Peer study group invites
- Reply to forum posts
- Comments on shared attempts
- New group members

## Database Tables

```sql
CREATE TABLE study_groups (
  id UUID PRIMARY KEY,
  name VARCHAR,
  topic_slug VARCHAR,
  creator_id UUID REFERENCES users(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP
);

CREATE TABLE group_members (
  group_id UUID REFERENCES study_groups(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP
);

CREATE TABLE forum_threads (
  id UUID PRIMARY KEY,
  topic_slug VARCHAR,
  title VARCHAR,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP
);

CREATE TABLE forum_posts (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES forum_threads(id),
  author_id UUID REFERENCES users(id),
  content TEXT,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP
);
```

## Implementation Priority
MEDIUM - Enhances engagement and learning
