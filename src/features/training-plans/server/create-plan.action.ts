"use server";

import { revalidatePath } from "next/cache";

import { createPlanSchema } from "@/features/training-plans/schemas/training-plan.schema";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";
import { TrainingPlanStatus } from "@/generated/prisma/enums";
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

export async function createPlanAction(
  _previousState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = createPlanSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the plan form.",
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
    return {
      success: false,
      message: "Client not found.",
      errors: { clientId: ["Please select a valid client."] },
    };
  }

  await prisma.trainingPlan.create({
    data: {
      trainerId: trainerProfile.id,
      clientId: parsed.data.clientId,
      title: parsed.data.title,
      description: parsed.data.description,
      startDate: parsed.data.startDate,
      endDate: parsed.data.endDate,
      status: TrainingPlanStatus.DRAFT,
    },
  });

  revalidatePath(PLANS_PATH);

  return { success: true, message: "Training plan created successfully." };
}
