"use server";

import { revalidatePath } from "next/cache";

import { restoreExerciseSchema } from "@/features/exercises/schemas/exercise.schema";
import type { ExerciseFormState } from "@/features/exercises/types/exercise.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const EXERCISES_PATH = "/dashboard/trainer/exercises";

export async function restoreExerciseAction(
  _previousState: ExerciseFormState,
  formData: FormData,
): Promise<ExerciseFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = restoreExerciseSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid exercise.",
    };
  }

  const exercise = await prisma.exerciseDictionary.findFirst({
    where: {
      id: parsed.data.exerciseId,
      createdByTrainerId: trainerProfile.id,
    },
    select: { id: true },
  });

  if (!exercise) {
    return {
      success: false,
      message: "Exercise not found or you do not have permission to restore it.",
    };
  }

  await prisma.exerciseDictionary.update({
    where: { id: exercise.id },
    data: {
      isArchived: false,
      archivedAt: null,
    },
  });

  revalidatePath(EXERCISES_PATH);

  return {
    success: true,
    message: "Exercise restored successfully.",
  };
}
