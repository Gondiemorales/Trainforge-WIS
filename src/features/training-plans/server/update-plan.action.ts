"use server";

import { revalidatePath } from "next/cache";

import { updatePlanSchema } from "@/features/training-plans/schemas/training-plan.schema";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PLANS_PATH = "/dashboard/trainer/plans";

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

export async function updatePlanAction(
  _previousState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updatePlanSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the plan form.",
      errors: getValidationErrors(parsed.error),
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
    return { success: false, message: "Archived plans cannot be edited." };
  }

  await prisma.trainingPlan.update({
    where: { id: plan.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      startDate: parsed.data.startDate,
      endDate: parsed.data.endDate,
    },
  });

  revalidatePath(PLANS_PATH);

  return { success: true, message: "Plan updated successfully." };
}
