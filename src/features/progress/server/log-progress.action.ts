"use server";

import { revalidatePath } from "next/cache";

import { logProgressSchema } from "@/features/progress/schemas/progress.schema";
import type { ProgressFormState } from "@/features/progress/types/progress.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PROGRESS_PATH = "/dashboard/trainer/progress";

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

export async function logProgressAction(
  _previousState: ProgressFormState,
  formData: FormData,
): Promise<ProgressFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = logProgressSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the form.",
      errors: getValidationErrors(parsed.error),
    };
  }

  const client = await prisma.clientProfile.findFirst({
    where: {
      id: parsed.data.clientId,
      trainerId: trainerProfile.id,
      isArchived: false,
    },
    select: { id: true },
  });

  if (!client) {
    return { success: false, message: "Client not found." };
  }

  const exercise = await prisma.exerciseDictionary.findFirst({
    where: {
      id: parsed.data.exerciseId,
      isArchived: false,
      OR: [{ isGlobal: true }, { createdByTrainerId: trainerProfile.id }],
    },
    select: { id: true },
  });

  if (!exercise) {
    return { success: false, message: "Exercise not found." };
  }

  await prisma.progressLog.create({
    data: {
      clientId: parsed.data.clientId,
      exerciseId: parsed.data.exerciseId,
      date: parsed.data.date,
      weightKg: parsed.data.weightKg,
      reps: parsed.data.reps,
      sets: parsed.data.sets,
      bodyWeightKg: parsed.data.bodyWeightKg,
      notes: parsed.data.notes,
    },
  });

  revalidatePath(PROGRESS_PATH);

  return { success: true, message: "Progress logged successfully." };
}
