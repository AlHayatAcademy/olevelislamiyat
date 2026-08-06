"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface AuthFormProps {
  mode?: "signin" | "signup";
  onSuccess?: () => void;
}

export function AuthForm({ mode = "signin", onSuccess }: AuthFormProps) {
  const router = useRouter();
  const auth = useAuth();

  const [formMode, setFormMode] = useState<"signin" | "signup">(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (formMode === "signin") {
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await auth.signIn(email, password);
        console.log("[AuthForm] Signed in successfully");

        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else {
        // Signup
        if (!email || !password || !confirmPassword) {
          throw new Error("All fields are required");
        }

        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }

        await auth.signUp(email, password, displayName);
        console.log("[AuthForm] Signed up successfully");

        // Optionally auto-sign in or redirect to login
        setFormMode("signin");
        setPassword("");
        setConfirmPassword("");
        setError(""); // Clear for next attempt
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
      console.error("[AuthForm] Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {formMode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {formMode === "signin"
            ? "Welcome back to O Level Islamiyat"
            : "Join thousands of students preparing for O Level Islamiyat"}
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Display name (signup only) */}
          {formMode === "signup" && (
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={formMode === "signin" ? "Your password" : "At least 8 characters"}
                className="w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm password (signup only) */}
          {formMode === "signup" && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 px-4 rounded-lg font-medium transition-all
              flex items-center justify-center gap-2
              ${
                isLoading
                  ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
              }
            `}
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {formMode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Form mode toggle */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            {formMode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setFormMode(formMode === "signin" ? "signup" : "signin");
                setError("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {formMode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Forgot password link (signin only) */}
        {formMode === "signin" && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="text-sm text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Forgot password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
