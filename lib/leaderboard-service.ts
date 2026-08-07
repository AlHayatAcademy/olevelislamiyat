export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  quizzesCompleted: number;
  averageScore: number;
  userEmail?: string;
  topicsCompleted?: number;
  streak?: number;
  badges?: string[];
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return [];
}

export async function getUserRank(userId: string): Promise<number | null> {
  return null;
}

export async function getTopScores(): Promise<LeaderboardEntry[]> {
  return [];
}

export async function getMostImproved(): Promise<LeaderboardEntry[]> {
  return [];
}

export async function recordQuizCompletion() {
  return null;
}
