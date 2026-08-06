# Phase 11: Educator Dashboard - Setup Guide

## Prerequisites

- Phase 10 (Firebase Auth) ✅ implemented
- Firestore database ready ✅
- User authentication working ✅

## Step 1: Update Firestore Security Rules

In Firebase Console → Firestore Database → Rules:

Replace existing rules with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }

    // Users (existing)
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Quiz attempts (existing)
    match /quiz_attempts/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }

    // Learner profile (existing)
    match /learner_profile/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Classes - NEW
    match /classes/{classId} {
      // Teachers: can read/create/update/delete their own classes
      allow read, write: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.teacherId;
      allow update, delete: if request.auth.uid == resource.data.teacherId;
    }

    // Class enrollments - NEW
    match /class_enrollments/{enrollmentId} {
      // Students: can read their own enrollments
      allow read: if request.auth.uid == resource.data.userId;
      // Teachers: can read all enrollments for their classes
      allow read: if request.auth != null;
      // Students: can join classes
      allow create: if request.auth.uid == request.resource.data.userId;
      // Teachers: can remove students
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }

    // Assignments - NEW
    match /assignments/{assignmentId} {
      // Everyone can read assignments
      allow read: if request.auth != null;
      // Teachers can create assignments
      allow create: if request.auth.uid == request.resource.data.createdBy;
      // Teachers can update/delete their assignments
      allow update, delete: if request.auth.uid == resource.data.createdBy;
    }
  }
}
```

Click **Publish** to save.

## Step 2: Copy Files

```bash
# Copy service layer
cp lib/class-service.ts → src/lib/

# Copy components
cp components/TeacherDashboard.tsx → src/components/
cp components/ClassEnrollment.tsx → src/components/
```

## Step 3: Create Routes

### Teacher Classes Page

Create `app/classes/page.tsx`:

```typescript
"use client";

import { useAuth } from "@/lib/auth-context";
import { TeacherDashboard } from "@/components/TeacherDashboard";

export default function ClassesPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <TeacherDashboard />;
}
```

### Student Enrollment Page

Create `app/enroll/page.tsx`:

```typescript
"use client";

import { useAuth } from "@/lib/auth-context";
import { ClassEnrollment } from "@/components/ClassEnrollment";

export default function EnrollPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <ClassEnrollment />
    </div>
  );
}
```

## Step 4: Add Navigation Links

Update your header/navigation to include:

```typescript
// In app/layout.tsx or Header component
import Link from "next/link";

export function Navigation() {
  return (
    <nav>
      {/* For teachers */}
      <Link href="/classes" className="...">
        📚 Classes
      </Link>

      {/* For students */}
      <Link href="/enroll" className="...">
        ➕ Join Class
      </Link>
    </nav>
  );
}
```

## Step 5: Create Class Creation Component (Optional but Recommended)

Create `components/CreateClassModal.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createClass } from "@/lib/class-service";

export function CreateClassModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError("");
    setIsLoading(true);

    try {
      await createClass(user.id, { name, subject, level, description });
      
      // Reset form
      setName("");
      setSubject("");
      setLevel("");
      setDescription("");
      setIsOpen(false);

      // Refresh page or list
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create class");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus size={20} />
        Create Class
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Create New Class
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Class Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Islamic Studies - Section A"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Islamic Studies"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Level *
              </label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="e.g., O Level"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional class description"
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !name || !subject || !level}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500"
            >
              {isLoading ? "Creating..." : "Create Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

Add to TeacherDashboard header:

```typescript
import { CreateClassModal } from "@/components/CreateClassModal";

// In TeacherDashboard JSX:
<div className="flex items-center justify-between mb-8">
  <div>
    <h1>Teacher Dashboard</h1>
  </div>
  <CreateClassModal />
</div>
```

## Step 6: Test the Setup

### Test Teacher Flow
1. Go to `/classes`
2. Click "Create Class"
3. Fill in: Class Name, Subject, Level
4. Click "Create Class"
5. Copy the class code that appears

### Test Student Flow
1. (Different user) Go to `/enroll`
2. Enter the class code
3. Click "Join Class"
4. Should redirect to `/classes`
5. Student should now appear in teacher's dashboard

## Step 7: Add Grade Export (Optional Future Enhancement)

In `lib/class-service.ts`, add:

```typescript
export async function exportClassGrades(classId: string): Promise<string> {
  try {
    const students = await getClassProgress(classId);
    
    // Convert to CSV format
    const headers = "Student,Email,Average Score,Quizzes Completed\n";
    const rows = students
      .map((s) => `${s.userName},${s.email},${s.averageScore}%,${s.quizzesCompleted}`)
      .join("\n");
    
    return headers + rows;
  } catch (error) {
    console.error("Error exporting grades:", error);
    throw error;
  }
}
```

## Database Structure Summary

Three new Firestore collections:

1. **classes** - Class metadata and settings
2. **class_enrollments** - Student memberships
3. **assignments** - Quiz assignments with due dates

Plus existing collections:
- **users** - User profiles
- **quiz_attempts** - Quiz submissions
- **learner_profile** - User preferences

## Performance Tips

- **Pagination**: Load 50 students at a time for large classes
- **Caching**: Cache teacher's class list for 5 minutes
- **Indexes**: Add Firestore index on `classes.teacherId` and `class_enrollments.classId`
- **Lazy loading**: Load student progress on-demand

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Permission denied" | Check Firestore rules are published |
| Students don't appear | Verify `class_enrollments` collection |
| Can't create class | Check teacher ID is set correctly |
| Class code not working | Verify code is 6 characters and exact |

## Next Steps

1. ✅ Update Firestore Security Rules
2. ✅ Copy Phase 11 files
3. ✅ Create routes
4. ✅ Add navigation links
5. Test teacher creating class
6. Test student enrolling
7. Verify progress tracking works
8. Deploy to production

## Success Indicators

- ✅ Teachers can create classes
- ✅ Unique class codes generated
- ✅ Students can join with code
- ✅ Progress appears in real-time
- ✅ No permission errors
