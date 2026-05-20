"use server";

import { revalidatePath } from "next/cache";

import { removePlanExerciseSchema } from "@/features/training-plans/schemas/training-plan.schema";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function removePlanExerciseAction(
  _previousState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = removePlanExerciseSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { success: false, message: "Invalid request." };
  }

  const planExercise = await prisma.planExercise.findFirst({
    where: {
      id: parsed.data.planExerciseId,
      trainingPlan: { trainerId: trainerProfile.id },
    },
    select: {
      id: true,
      trainingPlanId: true,
      trainingPlan: { select: { status: true } },
    },
  });

  if (!planExercise) {
    return { success: false, message: "Exercise not found in plan." };
  }

  if (planExercise.trainingPlan.status === "ARCHIVED") {
    return { success: false, message: "Cannot remove exercises from an archived plan." };
  }

  await prisma.planExercise.delete({ where: { id: planExercise.id } });

  revalidatePath(`/dashboard/trainer/plans/${planExercise.trainingPlanId}`);

  return { success: true, message: "Exercise removed from plan." };
}
