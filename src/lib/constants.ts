import { RoundConfig } from '@/types/game';

export const ROUNDS_COUNT = 4;

export const ROUND_CONFIGS: RoundConfig[] = [
  {
    round: 1,
    gridCols: 2,
    gridRows: 1,
    totalImages: 2,
    realCount: 1,
    aiCount: 1,
    timeLimit: 10,
    correctScore: 100,
    wrongPenalty: 50,
    mission: 'pickReal',
    missionText: '실제 이미지 1장을 고르세요!',
  },
  {
    round: 2,
    gridCols: 2,
    gridRows: 2,
    totalImages: 4,
    realCount: 3,
    aiCount: 1,
    timeLimit: 15,
    correctScore: 200,
    wrongPenalty: 50,
    mission: 'pickAI',
    missionText: 'AI가 만든 이미지 1장을 찾으세요!',
  },
  {
    round: 3,
    gridCols: 3,
    gridRows: 3,
    totalImages: 9,
    realCount: 8,
    aiCount: 1,
    timeLimit: 20,
    correctScore: 400,
    wrongPenalty: 50,
    mission: 'pickAI',
    missionText: 'AI가 만든 이미지 1장을 찾으세요!',
  },
  {
    round: 4,
    gridCols: 4,
    gridRows: 4,
    totalImages: 16,
    realCount: 15,
    aiCount: 1,
    timeLimit: 30,
    correctScore: 800,
    wrongPenalty: 50,
    mission: 'pickAI',
    missionText: 'AI가 만든 이미지 1장을 찾으세요!',
  },
];

export const TIME_BONUS_MULTIPLIER = 10;

export function getMaxScoreForRound(round: number): number {
  return ROUND_CONFIGS.slice(0, round).reduce(
    (sum, config) => sum + config.correctScore + Math.floor(config.timeLimit * TIME_BONUS_MULTIPLIER),
    0,
  );
}

export const MAX_SCORE = getMaxScoreForRound(ROUNDS_COUNT);
