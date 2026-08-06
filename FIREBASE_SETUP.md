# Phase 10: Firebase Authentication & Account System - Setup Guide

## Why Firebase?

✅ **No Pausing** - Free tier never pauses (unlike Supabase)  
✅ **Fast Setup** - Ready in ~20 minutes  
✅ **Generous Free Tier** - Supports learning & small apps  
✅ **Real-time Capabilities** - Built-in listeners for live data  
✅ **Easy Scaling** - Auto-scales to production  

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Create project"
3. Project name: `olevelislamiyat`
4. Accept Firebase terms
5. Skip Google Analytics (optional)
6. Click "Create project"
7. Wait for provisioning (~2 minutes)

## Step 2: Enable Authentication

1. Left sidebar → **Authentication**
2. Click **"Get Started"**
3. Under "Sign-in method", click **Email/Password**
4. Toggle **"Enable"**
5. Click **"Save"**

Your users can now signup/signin with email and password.

## Step 3: Create Firestore Database

1. Left sidebar → **Firestore Database**
2. Click **"Create database"**
3. Choose location closest to your users
4. Security rules: **Start in test mode** (we'll update later)
5. Click **"Create"**

Wait ~1 minute for Firestore to initialize.

## Step 4: Get Firebase Credentials

1. Click gear icon (Settings) → **Project Settings**
2. Scroll to "Your apps" section
3. Click **"</>"** (Web) to create web app
4. App nickname: `olevelislamiyat-web`
5. Check "Also set up Firebase Hosting" (optional)
6. Click **"Register app"**
7. Copy the config object:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 5: Create Firestore Collections & Security Rules

In Firebase Console:

1. Go to **Firestore Database**
2. Click **"Rules"** tab
3. Replace default rules with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }

    // Users can only access their own user document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Users can create and read their own quiz attempts
    match /quiz_attempts/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    // Users can read and write their own learner profile
    match /learner_profile/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

4. Click **"Publish"**

These rules ensure users can only access their own data.

## Step 6: Environment Variables

Create `.env.local`:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 7: Install Dependencies

```bash
npm install firebase
```

## Step 8: Copy Phase 10 Files

```bash
# Copy authentication files (Firebase versions)
cp lib__auth.ts → src/lib/auth.ts
cp lib__data-migration.ts → src/lib/data-migration.ts
cp lib__auth-context.tsx → src/lib/auth-context.tsx
cp components__AuthForm.tsx → src/components/AuthForm.tsx
```

## Step 9: Update App Layout

In `app/layout.tsx`:

```typescript
import { AuthProvider } from "@/lib/auth-context";
import { DataMigration } from "@/components/DataMigration";

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <AuthProvider>
          <DataMigration />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Step 10: Create Auth Routes

### `app/auth/page.tsx`
```typescript
"use client";
import { AuthForm } from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <AuthForm />
    </div>
  );
}
```

### `app/auth/signin/page.tsx`
```typescript
"use client";
import { AuthForm } from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm mode="signin" />
    </div>
  );
}
```

### `app/auth/signup/page.tsx`
```typescript
"use client";
import { AuthForm } from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm mode="signup" />
    </div>
  );
}
```

## Step 11: Create DataMigration Component

Create `components/DataMigration.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { migrateQuizAttemptsToServer, clearLocalStorageAfterMigration } from "@/lib/data-migration";

export function DataMigration() {
  const { user } = useAuth();
  const [migrationDone, setMigrationDone] = useState(false);

  useEffect(() => {
    if (!user || migrationDone) return;

    const performMigration = async () => {
      try {
        const progress = await migrateQuizAttemptsToServer(user.id);

        if (progress.migrated > 0) {
          clearLocalStorageAfterMigration();
          console.log("✅ Data migration complete!");
        }

        setMigrationDone(true);
      } catch (error) {
        console.error("❌ Migration error:", error);
        setMigrationDone(true);
      }
    };

    performMigration();
  }, [user, migrationDone]);

  return null;
}
```

## Step 12: Update Quiz Component

In `components/Quiz.tsx`, add server sync:

```typescript
import { useAuth } from "@/lib/auth-context";
import { syncQuizAttemptToServer } from "@/lib/data-migration";

export function Quiz() {
  const { user } = useAuth();

  const handleSubmit = async () => {
    // ... existing submission logic

    // Sync to server if logged in
    if (user) {
      const synced = await syncQuizAttemptToServer(
        user.id,
        quiz.id,
        attemptRecord,
      );

      if (synced) {
        console.log("✅ Quiz synced to Firebase");
      }
    }
  };
}
```

## Step 13: Redirect Unauthenticated Users

Update `app/page.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Your dashboard here
  return (
    <div>
      <h1>Welcome, {user.displayName || user.email}!</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

## Firestore Collections Structure

After setup, your Firestore will have these collections:

### `users` Collection
Documents will be auto-created with format:
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### `quiz_attempts` Collection
```json
{
  "userId": "firebase_uid_123",
  "quizId": "quiz-2024-1",
  "timestamp": "2024-01-15T11:00:00Z",
  "scorePercent": 85,
  "correctCount": 17,
  "totalCount": 20,
  "answers": {...},
  "createdAt": "2024-01-15T11:00:00Z"
}
```

### `learner_profile` Collection
```json
{
  "userId": "firebase_uid_123",
  "searchFilters": {...},
  "goalScore": 75,
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Testing the Setup

### 1. Test Signup
- Go to `http://localhost:3000/auth/signup`
- Create account with test@example.com / password
- Check Firebase Console → Authentication → Users

### 2. Test Data Migration
- Take a quiz while logged out (saves to localStorage)
- Sign in
- Data should auto-migrate to Firestore
- Check Firestore → `quiz_attempts` collection

### 3. Test Quiz Sync
- Take a quiz while logged in
- Check Firestore → `quiz_attempts` collection for new document

### 4. Test Cross-Device
- Sign in on different browser/device
- Quiz history should appear
- All data synced

## Firebase Emulator (Optional Local Testing)

For local testing without internet:

```bash
npm install -D firebase-tools
firebase login
firebase init emulators
firebase emulators:start
```

Then add to `.env.local`:
```bash
FIREBASE_EMULATOR_HOST=localhost:9099
```

## Production Deployment

### Before Deploying:

1. **Upgrade Firestore** (if needed):
   - Go to Firestore Settings
   - Switch to "Pay as you go" if you expect >50k daily reads

2. **Enable Additional Providers** (optional):
   - Google Sign-in
   - GitHub Sign-in
   - Others in Authentication → Sign-in method

3. **Set up Email Provider** (for password resets):
   - Authentication → Templates
   - Customize "Password reset" email template
   - Add your branding/logo

4. **Configure CORS**:
   - In Firebase Hosting settings
   - Add your production domain

### Deploy to Vercel:

1. Add environment variables in Vercel project settings
2. Deploy: `vercel deploy`
3. Test auth on production URL

## Troubleshooting

### "Firebase configuration missing"
- Check `.env.local` has all 6 Firebase variables
- Verify exact variable names
- Restart dev server: `npm run dev`

### "Auth fails with error"
- Check Firebase Authentication is enabled
- Verify email/password provider is toggled on
- Check Firestore rules are published

### "Permission denied" in Firestore
- Check Firestore Rules tab
- Verify rules are published (blue checkmark)
- Check `userId` field exists in quiz_attempts docs

### "Data not syncing"
- Verify user is logged in
- Check browser console for errors
- Verify Firestore collections exist
- Check network tab for failed requests

### "Too many simultaneous connections"
- Firebase free tier limit: 100 concurrent connections
- This rarely occurs unless you have many active users
- Upgrade to paid if needed

## Security Checklist

- [ ] `.env.local` added to `.gitignore`
- [ ] Firestore Rules reviewed and published
- [ ] Email/Password authentication enabled
- [ ] No hardcoded credentials in code
- [ ] HTTPS enforced in production
- [ ] Regular backups scheduled (Firebase does auto-backups)
- [ ] Password reset email template configured

## Next Steps

1. ✅ Create Firebase project
2. ✅ Set up Authentication & Firestore
3. ✅ Copy Phase 10 files
4. ✅ Configure environment variables
5. ✅ Test signup/signin locally
6. ✅ Deploy to production

Done! Your app now has:
- User accounts with email/password
- Automatic data migration from localStorage
- Cross-device quiz sync
- Secure Firestore storage
- Zero pausing on free tier
