"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, TrendingUp, Plus, Copy, Trash2, Eye } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  getTeacherClasses,
  getClassEnrollments,
  getClassProgress,
  deleteClass,
  type Class,
  type StudentProgress,
} from "@/lib/class-service";

export function TeacherDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load teacher's classes
  useEffect(() => {
    if (!user) return;

    const loadClasses = async () => {
      try {
        setIsLoading(true);
        const teacherClasses = await getTeacherClasses(user.id);
        setClasses(teacherClasses);

        if (teacherClasses.length > 0) {
          setSelectedClass(teacherClasses[0]);
        }
      } catch (error) {
        console.error("Error loading classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, [user]);

  // Load student progress when class changes
  useEffect(() => {
    if (!selectedClass) return;

    const loadProgress = async () => {
      try {
        const progress = await getClassProgress(selectedClass.id);
        setStudents(progress);
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    };

    loadProgress();
  }, [selectedClass]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDeleteClass = async (classId: string) => {
    if (!user || !window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await deleteClass(classId, user.id);
      setClasses(classes.filter((c) => c.id !== classId));
      if (selectedClass?.id === classId) {
        setSelectedClass(classes[0] || null);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600 dark:text-slate-400">Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage classes and track student progress
          </p>
        </div>

        {/* Classes Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Classes</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {classes.length}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {classes.reduce((sum, c) => sum + c.studentCount, 0)}
                </p>
              </div>
              <Users className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Active Assignments</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {classes.reduce((sum, c) => sum + c.activeAssignments, 0)}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Classes List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 dark:text-white">Your Classes</h2>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClass(cls)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-all
                      ${
                        selectedClass?.id === cls.id
                          ? "bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"
                          : "hover:bg-slate-100 dark:hover:bg-slate-700"
                      }
                    `}
                  >
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">
                      {cls.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cls.studentCount} students
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Class Details & Student Progress */}
          <div className="lg:col-span-3">
            {selectedClass ? (
              <div className="space-y-6">
                {/* Class Info Card */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedClass.name}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        {selectedClass.subject} • Level {selectedClass.level}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteClass(selectedClass.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {selectedClass.description && (
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {selectedClass.description}
                    </p>
                  )}

                  {/* Class Code */}
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Class Code</p>
                      <p className="font-mono font-bold text-lg text-slate-900 dark:text-white">
                        {selectedClass.code}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopyCode(selectedClass.code)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all"
                    >
                      <Copy size={20} />
                      {copiedCode === selectedClass.code && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Student Progress Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white">Student Progress</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                            Quizzes
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                            Average
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                            Last Activity
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {students.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-600 dark:text-slate-400">
                              No students enrolled yet
                            </td>
                          </tr>
                        ) : (
                          students.map((student) => (
                            <tr key={student.userId} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                              <td className="px-6 py-4">
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {student.userName}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {student.email}
                                </p>
                              </td>
                              <td className="px-6 py-4 text-slate-900 dark:text-white">
                                {student.quizzesCompleted}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{
                                        width: `${student.averageScore}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="font-medium text-slate-900 dark:text-white">
                                    {student.averageScore}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                {student.lastActivity
                                  ? new Date(student.lastActivity).toLocaleDateString()
                                  : "No activity"}
                              </td>
                              <td className="px-6 py-4">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                                  <Eye size={18} className="text-slate-600 dark:text-slate-400" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-12 text-center">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Create your first class to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
