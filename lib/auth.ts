"use client";

export interface User {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error?: string;
}

// Firebase initialization stub - full setup required for production
export const auth = {} as Record<string, unknown>;
export const db = {} as Record<string, unknown>;

export async function signUp(_email: string, _password: string) {
  return null;
}

export async function signIn(_email: string, _password: string) {
  return null;
}

export async function signOut() {
  return null;
}

export async function getCurrentUser() {
  return null;
}

export async function updateProfile(_updates: Record<string, unknown>) {
  return null;
}

export function onAuthStateChanged(_callback: (user: User | null) => void) {
  return () => {};
}

export async function registerUser() {
  return null;
}

export async function loginUser() {
  return null;
}

export async function logoutUser() {
  return null;
}
