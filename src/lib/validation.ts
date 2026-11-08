import { getMaxScoreForRound, ROUNDS_COUNT } from './constants';

interface LeaderboardInput {
  nickname: string;
  score: number;
  round: number;
}

// Bounds validation does not prove that the caller actually played the game.
export function parseLeaderboardEntry(body: unknown): LeaderboardInput | null {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return null;

  const { nickname, score, round } = body as Record<string, unknown>;
  if (
    typeof nickname !== 'string' ||
    typeof score !== 'number' || !Number.isInteger(score) || score < 0 ||
    typeof round !== 'number' || !Number.isInteger(round) || round < 1 || round > ROUNDS_COUNT
  ) return null;

  const cleaned = nickname.trim();
  if (cleaned.length < 2 || cleaned.length > 10 || score > getMaxScoreForRound(round)) return null;

  return { nickname: cleaned, score, round };
}
