import "server-only";

import type { ExerciseSelectOption } from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function getExercisesForSelect(): Promise<ExerciseSelectOption[]> {
  const trainerProfile = await getCurrentTrainerProfile();

  const exercises = await prisma.exerciseDictionary.findMany({
    where: {
      isArchived: false,
      OR: [
        { isGlobal: true },
        { createdByTrainerId: trainerProfile.id },
      ],
    },
    orderBy: [{ isGlobal: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      muscleGroup: true,
      difficulty: true,
      defaultSets: true,
      defaultReps: true,
    },
  });

  return exercises.map((ex) => ({
    id: ex.id,
    name: ex.name,
    muscleGroup: ex.muscleGroup,
    difficulty: ex.difficulty,
    defaultSets: ex.defaultSets,
    defaultReps: ex.defaultReps,
  }));
}
