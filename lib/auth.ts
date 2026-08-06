"use client";

import {
  initializeApp,
  getApp,
  getApps,
} from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate config
if (!firebaseConfig.apiKey) {
  console.warn("[Firebase] Configuration missing. Auth will be disabled.");
}

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth functions
export async function signUp(
  email: string,
  password: string,
  displayName?: string,
): Promise<User> {
  try {
    // Create user with email/password
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = credential.user;

    // Update profile
    if (displayName) {
      await updateProfile(firebaseUser, { displayName });
    }

    // Create user document in Firestore
    const userDoc = {
      email,
      displayName: displayName || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", firebaseUser.uid), userDoc);

    console.log("[Firebase Auth] User signed up:", email);

    return {
      id: firebaseUser.uid,
      email,
      displayName,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    };
  } catch (error) {
    console.error("[Firebase Auth] Signup error:", error);
    throw error;
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = credential.user;

    // Get user document from Firestore
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userSnapshot = await getDoc(userDocRef);
    const userData = userSnapshot.data();

    console.log("[Firebase Auth] User signed in:", email);

    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      displayName: firebaseUser.displayName || userData?.displayName,
      createdAt: userData?.createdAt || new Date().toISOString(),
      updatedAt: userData?.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Firebase Auth] Sign in error:", error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
    console.log("[Firebase Auth] User signed out");
  } catch (error) {
    console.error("[Firebase Auth] Sign out error:", error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return null;
    }

    // Get user document from Firestore
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userSnapshot = await getDoc(userDocRef);
    const userData = userSnapshot.data();

    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      displayName: firebaseUser.displayName || userData?.displayName,
      createdAt: userData?.createdAt || new Date().toISOString(),
      updatedAt: userData?.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Firebase Auth] Get current user error:", error);
    return null;
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<User>,
): Promise<User> {
  try {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser || firebaseUser.uid !== userId) {
      throw new Error("User not authenticated");
    }

    // Update Firestore user document
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      displayName: data.displayName || "",
      updatedAt: new Date().toISOString(),
    });

    // Update Firebase Auth profile
    if (data.displayName) {
      await updateProfile(firebaseUser, { displayName: data.displayName });
    }

    console.log("[Firebase Auth] Profile updated:", userId);

    return {
      id: userId,
      email: firebaseUser.email || "",
      displayName: data.displayName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Firebase Auth] Update profile error:", error);
    throw error;
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/signin`,
      handleCodeInApp: true,
    });

    console.log("[Firebase Auth] Password reset email sent:", email);
  } catch (error) {
    console.error("[Firebase Auth] Reset password error:", error);
    throw error;
  }
}

// Listen for auth state changes
export function onAuthStateChanged(
  callback: (user: User | null) => void,
): () => void {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    try {
      // Get user document from Firestore
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.data();

      callback({
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || userData?.displayName,
        createdAt: userData?.createdAt || new Date().toISOString(),
        updatedAt: userData?.updatedAt || new Date().toISOString(),
      });
    } catch (error) {
      console.error("[Firebase Auth] Error fetching user data:", error);
      callback(null);
    }
  });

  return unsubscribe;
}
