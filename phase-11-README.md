# Phase 11: Educator Dashboard

## Overview

Complete teacher-facing system for managing classes, tracking student progress, and creating assignments.

**Requires**: Phase 10 (Authentication) ✅  
**Effort**: 3-4 weeks  
**Priority**: HIGH

## What's Included

### Services (`lib/class-service.ts`)
- `createClass()` - Teacher creates new class
- `getTeacherClasses()` - List teacher's classes
- `getClassDetails()` - Get class info with student count
- `enrollInClass()` - Student joins class with code
- `getClassEnrollments()` - List class students
- `createAssignment()` - Create quiz assignment
- `getClassAssignments()` - List assignments
- `getStudentProgress()` - Individual student stats
- `getClassProgress()` - All students progress
- `removeStudentFromClass()` - Drop student
- `deleteClass()` - Delete entire class

### Components

**TeacherDashboard.tsx**
- Class list sidebar
- Class overview stats
- Student progress table
- Class code display with copy
- Delete class button

**ClassEnrollment.tsx**
- Student join class form
- Class code input (6-character)
- Error handling
- Success redirect

### Database Schema (Firestore)

**classes** Collection
```json
{
  "name": "O Level Islamic Studies",
  "description": "Preparing for May 2024 exam",
  "code": "ABC123",
  "teacherId": "user_id",
  "subject": "Islamic Studies",
  "level": "O Level",
  "studentCount": 25,
  "activeAssignments": 3,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**class_enrollments** Collection
```json
{
  "classId": "class_id",
  "userId": "student_id",
  "userEmail": "student@example.com",
  "userName": "John Doe",
  "role": "student",
  "joinedAt": "2024-01-15T11:00:00Z",
  "status": "active"
}
```

**assignments** Collection
```json
{
  "classId": "class_id",
  "quizId": "quiz-2024-1",
  "quizTitle": "Paper 1 - Section A",
  "dueDate": "2024-02-20",
  "createdBy": "teacher_id",
  "createdAt": "2024-01-15T10:00:00Z",
  "description": "End of chapter assessment"
}
```

## Quick Setup

### 1. Copy Files
```bash
cp lib/class-service.ts → src/lib/
cp components/TeacherDashboard.tsx → src/components/
cp components/ClassEnrollment.tsx → src/components/
```

### 2. Create Routes

**`app/classes/page.tsx`** (Teacher view)
```typescript
"use client";
import { TeacherDashboard } from "@/components/TeacherDashboard";

export default function ClassesPage() {
  return <TeacherDashboard />;
}
```

**`app/enroll/page.tsx`** (Student join)
```typescript
"use client";
import { ClassEnrollment } from "@/components/ClassEnrollment";

export default function EnrollPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <ClassEnrollment />
    </div>
  );
}
```

### 3. Update Firestore Rules

Add to your Firestore Security Rules:

```firestore
// Classes - teachers can create/update, everyone can read
match /classes/{classId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null && request.resource.data.teacherId == request.auth.uid;
  allow update, delete: if request.auth.uid == resource.data.teacherId;
}

// Class enrollments - users can read their own, teachers can manage
match /class_enrollments/{enrollmentId} {
  allow read: if request.auth.uid == resource.data.userId || 
              resource.data.role == 'teacher';
  allow create: if request.auth.uid == request.resource.data.userId;
  allow update, delete: if request.auth.uid == resource.data.userId || 
                           request.auth.uid == resource.data.teacherId;
}

// Assignments - accessible by class members
match /assignments/{assignmentId} {
  allow read: if request.auth != null;
  allow create, update, delete: if request.auth.uid == resource.data.createdBy;
}
```

### 4. Update Navigation

Add to header navigation:

```typescript
// For teachers
<a href="/classes" className="...">Classes</a>

// For students
<a href="/enroll" className="...">Join Class</a>
```

### 5. Create Class Component (Optional)

**`components/CreateClassForm.tsx`**
```typescript
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClass } from "@/lib/class-service";

export function CreateClassForm() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newClass = await createClass(user.id, {
        name,
        subject,
        level,
      });
      console.log("Class created:", newClass);
      // Refresh classes list
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Class name"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        type="text"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="Level (e.g., O Level)"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
        Create Class
      </button>
    </form>
  );
}
```

## User Flows

### Teacher Flow
1. Teacher creates class → Gets unique class code
2. Teacher shares code with students
3. Teacher adds/removes students
4. Teacher creates assignments from quiz library
5. Dashboard shows student progress in real-time
6. Teacher can export grades/reports

### Student Flow
1. Student gets class code from teacher
2. Student goes to /enroll
3. Student enters class code
4. Student is added to class
5. Student sees assigned quizzes
6. Student takes quizzes
7. Progress appears in teacher dashboard

## Key Features

✅ **Class Management**
- Unique class codes
- Add/remove students
- Delete classes

✅ **Student Tracking**
- Average scores by student
- Quiz completion tracking
- Last activity timestamps
- Progress visualization

✅ **Assignment Creation**
- Link quizzes to classes
- Set due dates
- Track submissions

✅ **Analytics**
- Class-level statistics
- Individual student progress
- Performance trends

✅ **Teacher Tools**
- Copy class code easily
- View all students
- Drop underperforming students
- Export grades (future)

## Testing Checklist

- [ ] Teacher can create class
- [ ] Teacher sees unique class code
- [ ] Teacher can copy class code
- [ ] Student can join class with code
- [ ] Student appears in teacher dashboard
- [ ] Student quiz scores show in progress table
- [ ] Teacher can remove student
- [ ] Teacher can delete class
- [ ] Multiple classes work independently

## Common Use Cases

### Use Case 1: Setting Up a Class
```typescript
// Teacher creates class
const newClass = await createClass(teacherId, {
  name: "O Level Islamic Studies - Section A",
  subject: "Islamic Studies",
  level: "O Level",
  description: "Exam preparation for May 2024"
});

// Get the code: newClass.code (e.g., "ABC123")
// Share with students
```

### Use Case 2: Student Joins Class
```typescript
// Student enters code on /enroll
await enrollInClass(
  studentId,
  studentEmail,
  studentName,
  "ABC123"
);

// Student now appears in teacher's class
```

### Use Case 3: Tracking Progress
```typescript
// Teacher views class progress
const students = await getClassProgress(classId);

// Returns array of StudentProgress with:
// - averageScore
// - quizzesCompleted
// - lastActivity
```

## Performance Considerations

- **Class list**: Cache for 5 minutes
- **Student progress**: Real-time updates from quiz attempts
- **Pagination**: Load 50 students at a time (future enhancement)
- **Indexes**: Add Firestore index on `teacherId` field

## Future Enhancements

- [ ] Grade export to CSV/Excel
- [ ] Class-wide quiz assignments with due dates
- [ ] Per-student quiz recommendations
- [ ] Attendance tracking
- [ ] Class announcements/messaging
- [ ] Parent/guardian access
- [ ] Multiple teachers per class
- [ ] Class materials library
- [ ] Discussion forums per class
- [ ] Bulk student import

## Security Notes

- Teachers can only manage their own classes
- Students can only view their enrolled classes
- Firestore RLS policies enforce ownership
- Class codes are unique and 6-character
- Dropped students lose access

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Class code not found" | Verify code is exact (case-sensitive) |
| Students don't appear | Check class_enrollments collection exists |
| Progress not updating | Quiz attempts might not be synced to server |
| Can't delete class | Only teacher can delete their own classes |

## File Structure

```
Phase 11/
├── lib/
│   └── class-service.ts          # Class management
├── components/
│   ├── TeacherDashboard.tsx      # Teacher UI
│   └── ClassEnrollment.tsx       # Student join
├── app/
│   ├── classes/page.tsx          # Teacher view
│   └── enroll/page.tsx           # Student join
└── README.md                     # This file
```

## Next Phases

- **Phase 12**: Social Learning (study groups, forums)
- **Phase 13**: AI Learning Aids (Claude integration)
- **Phase 14**: Export & Reporting (grade export, certificates)

## Support

For Firebase Firestore docs: https://firebase.google.com/docs/firestore
