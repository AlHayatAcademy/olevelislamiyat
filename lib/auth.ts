"use client";

export interface User {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error?: string | null;
}

// Firebase initialization stub - full setup required for production
export const auth = {} as Record<string, unknown>;
export const db = {} as Record<string, unknown>;

export async function signUp(_email: string, _password: string, _displayName?: string): Promise<User> {
  return null as unknown as User;
}

export async function signIn(_email: string, _password: string): Promise<User> {
  return null as unknown as User;
}

export async function signOut(): Promise<void> {
  return;
}

export async function getCurrentUser(): Promise<User | null> {
  return null;
}

export async function updateProfile(_userId: string, _updates: Record<string, unknown>): Promise<User> {
  return null as unknown as User;
}

export function onAuthStateChanged(_callback: (user: User | null) => void): () => void {
  return () => {};
}

export async function registerUser(): Promise<User | null> {
  return null;
}

export async function loginUser(): Promise<User | null> {
  return null;
}

export async function logoutUser(): Promise<void> {
  return;
}
