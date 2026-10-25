export type AvatarStage = 'uniform' | 'accent' | 'spark';

export type LevelDefinition = {
  id: number;
  title: string;
  objective: string;
  obstacle: string;
  points: number;
};

export type ProgressionState = {
  level: number;
  score: number;
  avatarStage: AvatarStage;
  completedLevelIds: number[];
};

export const levels: LevelDefinition[] = [
  {
    id: 1,
    title: 'The First Tint',
    objective: 'Match one shared pastel target.',
    obstacle: 'A single locked color door.',
    points: 100,
  },
  {
    id: 2,
    title: 'Split Signals',
    objective: 'Coordinate two different stations.',
    obstacle: 'Each player can see only one station clue.',
    points: 200,
  },
  {
    id: 3,
    title: 'The Shared Spark',
    objective: 'Match the final target before the timer ends.',
    obstacle: 'The target changes after every incorrect attempt.',
    points: 300,
  },
];

export function createProgression(): ProgressionState {
  return { level: 1, score: 0, avatarStage: 'uniform', completedLevelIds: [] };
}

export function completeLevel(
  state: ProgressionState,
  levelId: number,
): ProgressionState {
  const completedLevel = levels.find((candidate) => candidate.id === levelId);
  if (!completedLevel || state.completedLevelIds.includes(levelId)) return state;

  const completedLevelIds = [...state.completedLevelIds, levelId];
  const score = state.score + completedLevel.points;
  const nextLevel = Math.max(state.level, levelId + 1);
  const avatarStage: AvatarStage =
    completedLevelIds.length >= 3 ? 'spark' :
    completedLevelIds.length >= 2 ? 'accent' : 'uniform';

  return { level: nextLevel, score, avatarStage, completedLevelIds };
}
