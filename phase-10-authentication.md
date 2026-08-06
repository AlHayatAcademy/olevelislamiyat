# Phase 10: User Authentication & Account System

## Overview
Implement user accounts, authentication, server-backed storage, and cross-device sync.

## Architecture

### 1. `lib/auth.ts` — Auth Client
```typescript
export async function signUp(email: string, password: string): Promise<User>
export async function signIn(email: string, password: string): Promise<User>
export async function signOut(): Promise<void>
export async function getCurrentUser(): Promise<User | null>
export async function updateProfile(data: Partial<User>): Promise<User>
```

### 2. Database Schema (Supabase/Firebase)
```sql
-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  display_name VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- quiz_attempts (migrated from localStorage)
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  quiz_id VARCHAR,
  timestamp TIMESTAMP,
  score_percent INTEGER,
  answers JSONB,
  created_at TIMESTAMP
);

-- learner_profile
CREATE TABLE learner_profile (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  search_filters JSONB,
  goal_score INTEGER,
  updated_at TIMESTAMP
);
```

### 3. `components/AuthForm.tsx`
Login/signup UI with email/password.

### 4. `components/ProtectedRoute.tsx`
Middleware for authenticated routes.

### 5. Migration Strategy
- Detect existing localStorage data on first login
- Auto-migrate local quiz attempts to server
- Merge local + server data if needed
- Keep localStorage in sync for offline

## Implementation Priority
CRITICAL - Foundation for multi-device support
