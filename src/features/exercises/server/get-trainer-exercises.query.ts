import "server-only";

import type { DifficultyLevel } from "@/generated/prisma/enums";
import type {
  ExercisePageFilters,
  TrainerExercisesQueryResult,
} from "@/features/exercises/types/exercise.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const EXERCISES_PAGE_SIZE = 10;

function normalizePage(page?: number) {
  if (!page || Number.isNaN(page)) {
    return 1;
  }

  return Math.max(page, 1);
}

function normalizeDifficulty(difficulty?: string): DifficultyLevel | undefined {
  if (
    difficulty === "BEGINNER" ||
    difficulty === "INTERMEDIATE" ||
    difficulty === "ADVANCED"
  ) {
    return difficulty as DifficultyLevel;
  }

  return undefined;
}

export async function getTrainerExercises(
  filters: ExercisePageFilters = {},
): Promise<TrainerExercisesQueryResult> {
  const trainerProfile = await getCurrentTrainerProfile();

  const page = normalizePage(filters.page);
  const archived = filters.archived ?? false;
  const difficulty = normalizeDifficulty(filters.difficulty);

  const where = {
    OR: [
      { isGlobal: true },
      { createdByTrainerId: trainerProfile.id },
    ],
    isArchived: archived,
    ...(difficulty ? { difficulty } : {}),
  };

  const [totalItems, exercises] = await Promise.all([
    prisma.exerciseDictionary.count({ where }),
    prisma.exerciseDictionary.findMany({
      where,
      orderBy: [
        { isGlobal: "desc" },
        { createdAt: "desc" },
      ],
      skip: (page - 1) * EXERCISES_PAGE_SIZE,
      take: EXERCISES_PAGE_SIZE,
      select: {
        id: true,
        name: true,
        muscleGroup: true,
        description: true,
        instructions: true,
        difficulty: true,
        defaultSets: true,
        defaultReps: true,
        isGlobal: true,
        createdByTrainerId: true,
        isArchived: true,
        archivedAt: true,
        createdAt: true,
      },
    }),
  ]);

  const totalPages = Math.max(
    Math.ceil(totalItems / EXERCISES_PAGE_SIZE),
    1,
  );

  return {
    exercises: exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      description: exercise.description,
      instructions: exercise.instructions,
      difficulty: exercise.difficulty,
      defaultSets: exercise.defaultSets,
      defaultReps: exercise.defaultReps,
      isGlobal: exercise.isGlobal,
      isOwned: exercise.createdByTrainerId === trainerProfile.id,
      isArchived: exercise.isArchived,
      archivedAt: exercise.archivedAt,
      createdAt: exercise.createdAt,
    })),
    pagination: {
      page,
      pageSize: EXERCISES_PAGE_SIZE,
      totalItems,
      totalPages,
    },
  };
}
