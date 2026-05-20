"use server";

import { revalidatePath } from "next/cache";

import { updateNutritionStatusSchema } from "@/features/nutrition/schemas/nutrition.schema";
import type { NutritionFormState } from "@/features/nutrition/types/nutrition.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const NUTRITION_PATH = "/dashboard/trainer/nutrition";

export async function updateNutritionStatusAction(
  _previousState: NutritionFormState,
  formData: FormData,
): Promise<NutritionFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updateNutritionStatusSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return { success: false, message: "Invalid request." };
  }

  const plan = await prisma.nutritionPlan.findFirst({
    where: { id: parsed.data.planId, trainerId: trainerProfile.id },
    select: { id: true, status: true },
  });

  if (!plan) {
    return { success: false, message: "Plan not found." };
  }

  if (plan.status === "ARCHIVED") {
    return { success: false, message: "Archived plans cannot be changed." };
  }

  await prisma.nutritionPlan.update({
    where: { id: plan.id },
    data: {
      status: parsed.data.status,
      publishedAt:
        parsed.data.status === "PUBLISHED" ? new Date() : undefined,
    },
  });

  revalidatePath(NUTRITION_PATH);
  revalidatePath(`/dashboard/trainer/nutrition/${plan.id}`);

  return {
    success: true,
    message:
      parsed.data.status === "PUBLISHED"
        ? "Plan published successfully."
        : "Plan archived successfully.",
  };
}
