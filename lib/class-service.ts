"use client";

import { db } from "@/lib/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";

export interface Class {
  id: string;
  name: string;
  description?: string;
  code: string;
  teacherId: string;
  subject: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  studentCount: number;
  activeAssignments: number;
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  userId: string;
  userEmail: string;
  userName: string;
  role: "student" | "teacher";
  joinedAt: string;
  status: "active" | "dropped";
}

export interface Assignment {
  id: string;
  classId: string;
  quizId: string;
  quizTitle: string;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  description?: string;
  totalPoints?: number;
}

export interface StudentProgress {
  classId: string;
  userId: string;
  userName: string;
  email: string;
  averageScore: number;
  quizzesCompleted: number;
  lastActivity: string;
  assignmentScores: {
    [quizId: string]: {
      score: number;
      submittedAt: string;
    };
  };
}

/**
 * Create a new class
 */
export async function createClass(
  teacherId: string,
  classData: {
    name: string;
    description?: string;
    subject: string;
    level: string;
  },
): Promise<Class> {
  try {
    // Generate unique class code
    const classCode = generateClassCode();

    const classRef = await addDoc(collection(db, "classes"), {
      name: classData.name,
      description: classData.description || "",
      code: classCode,
      teacherId,
      subject: classData.subject,
      level: classData.level,
      studentCount: 0,
      activeAssignments: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    // Add teacher as class member
    await addDoc(collection(db, "class_enrollments"), {
      classId: classRef.id,
      userId: teacherId,
      role: "teacher",
      joinedAt: Timestamp.now(),
      status: "active",
    });

    console.log("[Class Service] Class created:", classRef.id);

    return {
      id: classRef.id,
      name: classData.name,
      description: classData.description,
      code: classCode,
      teacherId,
      subject: classData.subject,
      level: classData.level,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      studentCount: 0,
      activeAssignments: 0,
    };
  } catch (error) {
    console.error("[Class Service] Error creating class:", error);
    throw error;
  }
}

/**
 * Get all classes for a teacher
 */
export async function getTeacherClasses(teacherId: string): Promise<Class[]> {
  try {
    const classesRef = collection(db, "classes");
    const q = query(classesRef, where("teacherId", "==", teacherId));
    const snapshot = await getDocs(q);

    const classes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Class[];

    console.log(`[Class Service] Fetched ${classes.length} classes for teacher`);
    return classes;
  } catch (error) {
    console.error("[Class Service] Error fetching classes:", error);
    return [];
  }
}

/**
 * Get class details with student count
 */
export async function getClassDetails(classId: string): Promise<Class | null> {
  try {
    const classDoc = await getDoc(doc(db, "classes", classId));

    if (!classDoc.exists()) {
      return null;
    }

    // Get student count
    const enrollmentsRef = collection(db, "class_enrollments");
    const q = query(
      enrollmentsRef,
      where("classId", "==", classId),
      where("role", "==", "student"),
      where("status", "==", "active"),
    );
    const snapshot = await getDocs(q);

    const classData = classDoc.data();

    return {
      id: classId,
      ...classData,
      studentCount: snapshot.size,
      createdAt: classData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: classData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    } as Class;
  } catch (error) {
    console.error("[Class Service] Error fetching class details:", error);
    return null;
  }
}

/**
 * Enroll a student in a class using class code
 */
export async function enrollInClass(
  userId: string,
  userEmail: string,
  userName: string,
  classCode: string,
): Promise<boolean> {
  try {
    // Find class by code
    const classesRef = collection(db, "classes");
    const q = query(classesRef, where("code", "==", classCode));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Class code not found");
    }

    const classDoc = snapshot.docs[0];
    const classId = classDoc.id;

    // Check if already enrolled
    const enrollmentsRef = collection(db, "class_enrollments");
    const enrollQ = query(
      enrollmentsRef,
      where("classId", "==", classId),
      where("userId", "==", userId),
    );
    const enrollSnapshot = await getDocs(enrollQ);

    if (!enrollSnapshot.empty) {
      throw new Error("Already enrolled in this class");
    }

    // Add enrollment
    await addDoc(collection(db, "class_enrollments"), {
      classId,
      userId,
      userEmail,
      userName,
      role: "student",
      joinedAt: Timestamp.now(),
      status: "active",
    });

    console.log("[Class Service] Student enrolled:", userId);
    return true;
  } catch (error) {
    console.error("[Class Service] Error enrolling in class:", error);
    throw error;
  }
}

/**
 * Get class enrollments (students)
 */
export async function getClassEnrollments(classId: string): Promise<ClassEnrollment[]> {
  try {
    const enrollmentsRef = collection(db, "class_enrollments");
    const q = query(
      enrollmentsRef,
      where("classId", "==", classId),
      where("role", "==", "student"),
      where("status", "==", "active"),
    );
    const snapshot = await getDocs(q);

    const enrollments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      joinedAt: doc.data().joinedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as ClassEnrollment[];

    console.log(`[Class Service] Fetched ${enrollments.length} enrollments`);
    return enrollments;
  } catch (error) {
    console.error("[Class Service] Error fetching enrollments:", error);
    return [];
  }
}

/**
 * Create assignment for class
 */
export async function createAssignment(
  classId: string,
  quizId: string,
  quizTitle: string,
  dueDate: string,
  createdBy: string,
): Promise<Assignment> {
  try {
    const assignmentRef = await addDoc(collection(db, "assignments"), {
      classId,
      quizId,
      quizTitle,
      dueDate,
      createdBy,
      createdAt: Timestamp.now(),
      description: "",
    });

    console.log("[Class Service] Assignment created:", assignmentRef.id);

    return {
      id: assignmentRef.id,
      classId,
      quizId,
      quizTitle,
      dueDate,
      createdBy,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Class Service] Error creating assignment:", error);
    throw error;
  }
}

/**
 * Get class assignments
 */
export async function getClassAssignments(classId: string): Promise<Assignment[]> {
  try {
    const assignmentsRef = collection(db, "assignments");
    const q = query(assignmentsRef, where("classId", "==", classId));
    const snapshot = await getDocs(q);

    const assignments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as Assignment[];

    console.log(`[Class Service] Fetched ${assignments.length} assignments`);
    return assignments;
  } catch (error) {
    console.error("[Class Service] Error fetching assignments:", error);
    return [];
  }
}

/**
 * Get student progress in class
 */
export async function getStudentProgress(
  classId: string,
  userId: string,
): Promise<StudentProgress | null> {
  try {
    // Get student info
    const enrollmentsRef = collection(db, "class_enrollments");
    const enrollQ = query(
      enrollmentsRef,
      where("classId", "==", classId),
      where("userId", "==", userId),
    );
    const enrollSnapshot = await getDocs(enrollQ);

    if (enrollSnapshot.empty) {
      return null;
    }

    const enrollment = enrollSnapshot.docs[0].data();

    // Get quiz attempts for this student
    const attemptsRef = collection(db, "quiz_attempts");
    const attemptsQ = query(attemptsRef, where("userId", "==", userId));
    const attemptsSnapshot = await getDocs(attemptsQ);

    let totalScore = 0;
    let attemptCount = 0;
    let lastActivity = "";

    const attempts = attemptsSnapshot.docs.map((doc) => doc.data());

    if (attempts.length > 0) {
      totalScore = attempts.reduce((sum, a) => sum + (a.scorePercent || 0), 0);
      attemptCount = attempts.length;
      lastActivity = attempts[0].timestamp || new Date().toISOString();
    }

    return {
      classId,
      userId,
      userName: enrollment.userName,
      email: enrollment.userEmail,
      averageScore: attemptCount > 0 ? Math.round(totalScore / attemptCount) : 0,
      quizzesCompleted: attemptCount,
      lastActivity,
      assignmentScores: {},
    };
  } catch (error) {
    console.error("[Class Service] Error fetching student progress:", error);
    return null;
  }
}

/**
 * Get all student progress for a class
 */
export async function getClassProgress(classId: string): Promise<StudentProgress[]> {
  try {
    const enrollments = await getClassEnrollments(classId);
    const progressList: StudentProgress[] = [];

    for (const enrollment of enrollments) {
      const progress = await getStudentProgress(classId, enrollment.userId);
      if (progress) {
        progressList.push(progress);
      }
    }

    return progressList.sort((a, b) => b.averageScore - a.averageScore);
  } catch (error) {
    console.error("[Class Service] Error fetching class progress:", error);
    return [];
  }
}

/**
 * Generate unique class code
 */
function generateClassCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Remove student from class
 */
export async function removeStudentFromClass(
  classId: string,
  userId: string,
): Promise<boolean> {
  try {
    const enrollmentsRef = collection(db, "class_enrollments");
    const q = query(
      enrollmentsRef,
      where("classId", "==", classId),
      where("userId", "==", userId),
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Enrollment not found");
    }

    const enrollmentDoc = snapshot.docs[0];
    await updateDoc(enrollmentDoc.ref, {
      status: "dropped",
    });

    console.log("[Class Service] Student removed from class");
    return true;
  } catch (error) {
    console.error("[Class Service] Error removing student:", error);
    throw error;
  }
}

/**
 * Delete class (teacher only)
 */
export async function deleteClass(classId: string, teacherId: string): Promise<boolean> {
  try {
    // Verify teacher ownership
    const classDoc = await getDoc(doc(db, "classes", classId));
    if (!classDoc.exists() || classDoc.data().teacherId !== teacherId) {
      throw new Error("Unauthorized to delete this class");
    }

    await deleteDoc(doc(db, "classes", classId));

    console.log("[Class Service] Class deleted");
    return true;
  } catch (error) {
    console.error("[Class Service] Error deleting class:", error);
    throw error;
  }
}
