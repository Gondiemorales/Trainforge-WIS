"use server";

import { revalidatePath } from "next/cache";

import { addPlanExerciseSchema } from "@/features/training-plans/schemas/training-plan.schema";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function addPlanExerciseAction(
  _previousState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = addPlanExerciseSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the exercise form.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const plan = await prisma.trainingPlan.findFirst({
    where: { id: parsed.data.planId, trainerId: trainerProfile.id },
    select: { id: true, status: true },
  });

  if (!plan) {
    return { success: false, message: "Plan not found." };
  }

  if (plan.status === "ARCHIVED") {
    return { success: false, message: "Cannot add exercises to an archived plan." };
  }

  const exercise = await prisma.exerciseDictionary.findFirst({
    where: {
      id: parsed.data.exerciseId,
      isArchived: false,
      OR: [
        { isGlobal: true },
        { createdByTrainerId: trainerProfile.id },
      ],
    },
    select: { id: true, name: true },
  });

  if (!exercise) {
    return { success: false, message: "Exercise not found." };
  }

  const existingCount = await prisma.planExercise.count({
    where: { trainingPlanId: plan.id },
  });

  await prisma.planExercise.create({
    data: {
      trainingPlanId: plan.id,
      exerciseId: exercise.id,
      exerciseNameSnapshot: exercise.name,
      position: existingCount + 1,
      dayOfWeek: parsed.data.dayOfWeek,
      sets: parsed.data.sets,
      reps: parsed.data.reps,
      restSeconds: parsed.data.restSeconds,
      intensity: parsed.data.intensity,
      description: parsed.data.description,
      notes: parsed.data.notes,
      difficulty: parsed.data.difficulty,
    },
  });

  revalidatePath(`/dashboard/trainer/plans/${plan.id}`);

  return { success: true, message: "Exercise added to plan." };
}
