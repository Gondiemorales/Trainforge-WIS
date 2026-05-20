"use server";

import { revalidatePath } from "next/cache";

import { createExerciseSchema } from "@/features/exercises/schemas/exercise.schema";
import type { ExerciseFormState } from "@/features/exercises/types/exercise.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const EXERCISES_PATH = "/dashboard/trainer/exercises";

function getValidationErrors(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "flatten" in error &&
    typeof error.flatten === "function"
  ) {
    return error.flatten().fieldErrors;
  }

  return undefined;
}

export async function createExerciseAction(
  _previousState: ExerciseFormState,
  formData: FormData,
): Promise<ExerciseFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = createExerciseSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the exercise form.",
      errors: getValidationErrors(parsed.error),
    };
  }

  await prisma.exerciseDictionary.create({
    data: {
      name: parsed.data.name,
      muscleGroup: parsed.data.muscleGroup,
      description: parsed.data.description,
      instructions: parsed.data.instructions,
      difficulty: parsed.data.difficulty,
      defaultSets: parsed.data.defaultSets,
      defaultReps: parsed.data.defaultReps,
      createdByTrainerId: trainerProfile.id,
      isGlobal: false,
    },
  });

  revalidatePath(EXERCISES_PATH);

  return {
    success: true,
    message: "Exercise created successfully.",
  };
}
