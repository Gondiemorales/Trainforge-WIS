"use server";

import { revalidatePath } from "next/cache";

import { updateExerciseSchema } from "@/features/exercises/schemas/exercise.schema";
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

export async function updateExerciseAction(
  _previousState: ExerciseFormState,
  formData: FormData,
): Promise<ExerciseFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updateExerciseSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the exercise form.",
      errors: getValidationErrors(parsed.error),
    };
  }

  const exercise = await prisma.exerciseDictionary.findFirst({
    where: {
      id: parsed.data.exerciseId,
      createdByTrainerId: trainerProfile.id,
    },
    select: {
      id: true,
      isArchived: true,
    },
  });

  if (!exercise) {
    return {
      success: false,
      message: "Exercise not found or you do not have permission to edit it.",
    };
  }

  if (exercise.isArchived) {
    return {
      success: false,
      message: "Archived exercises cannot be edited.",
    };
  }

  await prisma.exerciseDictionary.update({
    where: { id: exercise.id },
    data: {
      name: parsed.data.name,
      muscleGroup: parsed.data.muscleGroup,
      description: parsed.data.description,
      instructions: parsed.data.instructions,
      difficulty: parsed.data.difficulty,
      defaultSets: parsed.data.defaultSets,
      defaultReps: parsed.data.defaultReps,
    },
  });

  revalidatePath(EXERCISES_PATH);

  return {
    success: true,
    message: "Exercise updated successfully.",
  };
}
