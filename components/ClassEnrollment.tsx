"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { enrollInClass } from "@/lib/class-service";

export function ClassEnrollment() {
  const router = useRouter();
  const { user } = useAuth();
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError("");
    setIsLoading(true);

    try {
      if (!classCode.trim()) {
        throw new Error("Please enter a class code");
      }

      await enrollInClass(user.id, user.email, user.displayName || user.email, classCode);

      console.log("✅ Enrolled in class successfully");
      router.push("/classes");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to enroll";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <LogIn className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            Join a Class
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-center mt-2">
            Enter the class code provided by your teacher
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleEnroll} className="space-y-4">
          <div>
            <label htmlFor="classCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Class Code
            </label>
            <input
              id="classCode"
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              placeholder="e.g., ABC123"
              maxLength={6}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Ask your teacher for the class code
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !classCode.trim()}
            className={`
              w-full py-3 px-4 rounded-lg font-medium transition-all
              flex items-center justify-center gap-2
              ${
                isLoading || !classCode.trim()
                  ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
              }
            `}
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            Join Class
          </button>
        </form>
      </div>
    </div>
  );
}
