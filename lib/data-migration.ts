"use client";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/auth";
import { QuizAttemptRecord } from "@/lib/quiz-analytics";

export interface MigrationProgress {
  total: number;
  migrated: number;
  failed: number;
  inProgress: boolean;
}

/**
 * Migrate quiz attempts from localStorage to Firestore
 */
export async function migrateQuizAttemptsToServer(
  userId: string,
  onProgress?: (progress: MigrationProgress) => void,
): Promise<MigrationProgress> {
  const progress: MigrationProgress = {
    total: 0,
    migrated: 0,
    failed: 0,
    inProgress: true,
  };

  try {
    // Get all quiz attempts from localStorage
    const quizIds = Object.keys(localStorage).filter((key) =>
      key.startsWith("quiz-attempts-"),
    );

    progress.total = quizIds.length;

    if (progress.total === 0) {
      console.log("[Firebase Migration] No quiz attempts to migrate");
      progress.inProgress = false;
      onProgress?.(progress);
      return progress;
    }

    console.log(`[Firebase Migration] Starting migration of ${progress.total} quiz attempts`);

    // Migrate each quiz's attempts
    for (const key of quizIds) {
      try {
        const quizId = key.replace("quiz-attempts-", "");
        const attemptsJson = localStorage.getItem(key);

        if (!attemptsJson) continue;

        const attempts: QuizAttemptRecord[] = JSON.parse(attemptsJson);

        // Add attempts to Firestore
        const quizAttemptsRef = collection(db, "quiz_attempts");

        for (const attempt of attempts) {
          await addDoc(quizAttemptsRef, {
            userId,
            quizId,
            timestamp: attempt.timestamp,
            scorePercent: attempt.scorePercent,
            correctCount: attempt.correctCount,
            totalCount: attempt.totalCount,
            answers: attempt.answers,
            createdAt: Timestamp.now(),
          });
        }

        console.log(`[Firebase Migration] Migrated quiz ${quizId}: ${attempts.length} attempts`);
        progress.migrated++;
      } catch (error) {
        console.error(`[Firebase Migration] Error processing quiz:`, error);
        progress.failed++;
      }

      onProgress?.(progress);
    }

    // Migrate learner profile
    try {
      const searchFiltersJson = localStorage.getItem("search-filters");
      if (searchFiltersJson) {
        const searchFilters = JSON.parse(searchFiltersJson);

        const learnerProfileRef = doc(db, "learner_profile", userId);
        await setDoc(learnerProfileRef, {
          userId,
          searchFilters,
          goalScore: 75,
          updatedAt: Timestamp.now(),
        });

        console.log("[Firebase Migration] Migrated learner profile");
      }
    } catch (error) {
      console.warn("[Firebase Migration] Failed to migrate learner profile:", error);
    }

    progress.inProgress = false;
    console.log(
      `[Firebase Migration] Complete. Migrated: ${progress.migrated}, Failed: ${progress.failed}`,
    );
    onProgress?.(progress);

    return progress;
  } catch (error) {
    console.error("[Firebase Migration] Fatal error:", error);
    progress.inProgress = false;
    onProgress?.(progress);
    throw error;
  }
}

/**
 * Fetch quiz attempts from Firestore
 */
export async function fetchQuizAttemptsFromServer(userId: string): Promise<any[]> {
  try {
    const quizAttemptsRef = collection(db, "quiz_attempts");
    const q = query(quizAttemptsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const attempts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`[Firebase Migration] Fetched ${attempts.length} quiz attempts from server`);
    return attempts;
  } catch (error) {
    console.error("[Firebase Migration] Error fetching quiz attempts:", error);
    return [];
  }
}

/**
 * Sync quiz attempt to Firestore (called after quiz submission)
 */
export async function syncQuizAttemptToServer(
  userId: string,
  quizId: string,
  attempt: QuizAttemptRecord,
): Promise<boolean> {
  try {
    const quizAttemptsRef = collection(db, "quiz_attempts");

    await addDoc(quizAttemptsRef, {
      userId,
      quizId,
      timestamp: attempt.timestamp,
      scorePercent: attempt.scorePercent,
      correctCount: attempt.correctCount,
      totalCount: attempt.totalCount,
      answers: attempt.answers,
      createdAt: Timestamp.now(),
    });

    console.log("[Firebase Migration] Synced quiz attempt to server:", quizId);
    return true;
  } catch (error) {
    console.error("[Firebase Migration] Error syncing quiz attempt:", error);
    return false;
  }
}

/**
 * Get learner profile from Firestore
 */
export async function getLearnerProfile(userId: string): Promise<any | null> {
  try {
    const learnerProfileRef = doc(db, "learner_profile", userId);
    const profileSnapshot = await getDoc(learnerProfileRef);

    if (!profileSnapshot.exists()) {
      return null;
    }

    return profileSnapshot.data();
  } catch (error) {
    console.error("[Firebase Migration] Error fetching learner profile:", error);
    return null;
  }
}

/**
 * Update learner profile in Firestore
 */
export async function updateLearnerProfile(
  userId: string,
  data: Partial<any>,
): Promise<boolean> {
  try {
    const learnerProfileRef = doc(db, "learner_profile", userId);
    const profileSnapshot = await getDoc(learnerProfileRef);

    if (profileSnapshot.exists()) {
      // Update existing profile
      await updateDoc(learnerProfileRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } else {
      // Create new profile
      await setDoc(learnerProfileRef, {
        userId,
        ...data,
        updatedAt: Timestamp.now(),
      });
    }

    console.log("[Firebase Migration] Updated learner profile");
    return true;
  } catch (error) {
    console.error("[Firebase Migration] Error updating learner profile:", error);
    return false;
  }
}

/**
 * Clear local storage after successful migration
 */
export function clearLocalStorageAfterMigration(): void {
  try {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("quiz-attempts-"),
    );

    keys.forEach((key) => localStorage.removeItem(key));

    console.log(`[Firebase Migration] Cleared ${keys.length} quiz attempt entries from localStorage`);
  } catch (error) {
    console.warn("[Firebase Migration] Error clearing localStorage:", error);
  }
}
