"use server";

import { revalidatePath } from "next/cache";

import { updatePlanStatusSchema } from "@/features/training-plans/schemas/training-plan.schema";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PLANS_PATH = "/dashboard/trainer/plans";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ["ACTIVE", "ARCHIVED"],
  ACTIVE: ["ARCHIVED"],
  ARCHIVED: [],
};

export async function updatePlanStatusAction(
  _previousState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updatePlanStatusSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { success: false, message: "Invalid request." };
  }

  const plan = await prisma.trainingPlan.findFirst({
    where: { id: parsed.data.planId, trainerId: trainerProfile.id },
    select: { id: true, status: true },
  });

  if (!plan) {
    return { success: false, message: "Plan not found." };
  }

  const allowed = ALLOWED_TRANSITIONS[plan.status] ?? [];

  if (!allowed.includes(parsed.data.status)) {
    return {
      success: false,
      message: `Cannot change status from ${plan.status} to ${parsed.data.status}.`,
    };
  }

  await prisma.trainingPlan.update({
    where: { id: plan.id },
    data: { status: parsed.data.status },
  });

  revalidatePath(PLANS_PATH);
  revalidatePath(`/dashboard/trainer/plans/${plan.id}`);

  return { success: true, message: `Plan ${parsed.data.status.toLowerCase()} successfully.` };
}
