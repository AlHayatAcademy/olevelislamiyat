"use client";

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
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  quizzesCompleted: number;
  averageScore: number;
  lastActivity?: Date;
}

export async function enrollInClass(_classCode: string, _userId: string, _userName: string, _userEmail: string) {
  return null;
}

export async function getClassesByTeacher(_teacherId: string): Promise<Class[]> {
  return [];
}

export async function getClassesByStudent(_userId: string): Promise<Class[]> {
  return [];
}

export async function getTeacherClasses(_teacherId: string): Promise<Class[]> {
  return [];
}

export async function getClassEnrollments(_classId: string): Promise<ClassEnrollment[]> {
  return [];
}

export async function getClassProgress(_classId: string): Promise<StudentProgress[]> {
  return [];
}

export async function deleteClass(_classId: string): Promise<void> {
  return;
}
