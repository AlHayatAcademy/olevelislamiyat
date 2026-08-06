"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  User,
  AuthState,
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updateProfile,
  onAuthStateChanged,
} from "@/lib/auth";

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Check auth state on mount
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initAuth = async () => {
      try {
        // Listen for auth changes
        unsubscribe = onAuthStateChanged((user) => {
          setState((prev) => ({
            ...prev,
            user,
            isLoading: false,
          }));
        });

        // Initial check
        const user = await getCurrentUser();
        setState((prev) => ({
          ...prev,
          user,
          isLoading: false,
        }));
      } catch (error) {
        console.error("[AuthProvider] Init error:", error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Auth initialization failed",
          isLoading: false,
        }));
      }
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleSignUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const user = await signUp(email, password, displayName);
        setState((prev) => ({ ...prev, user, isLoading: false }));
        return user;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Signup failed";
        setState((prev) => ({ ...prev, error: message, isLoading: false }));
        throw error;
      }
    },
    [],
  );

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const user = await signIn(email, password);
        setState((prev) => ({ ...prev, user, isLoading: false }));
        return user;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Sign in failed";
        setState((prev) => ({ ...prev, error: message, isLoading: false }));
        throw error;
      }
    },
    [],
  );

  const handleSignOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await signOut();
      setState((prev) => ({ ...prev, user: null, isLoading: false }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign out failed";
      setState((prev) => ({ ...prev, error: message, isLoading: false }));
      throw error;
    }
  }, []);

  const handleUpdateProfile = useCallback(async (data: Partial<User>) => {
    if (!state.user) throw new Error("No user logged in");

    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const updatedUser = await updateProfile(state.user.id, data);
      setState((prev) => ({ ...prev, user: updatedUser, isLoading: false }));
      return updatedUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Profile update failed";
      setState((prev) => ({ ...prev, error: message, isLoading: false }));
      throw error;
    }
  }, [state.user]);

  const value: AuthContextType = {
    ...state,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
