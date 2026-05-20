"use server";

import { revalidatePath } from "next/cache";

import { deleteProgressLogSchema } from "@/features/progress/schemas/progress.schema";
import type { ProgressFormState } from "@/features/progress/types/progress.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PROGRESS_PATH = "/dashboard/trainer/progress";

export async function deleteProgressLogAction(
  _previousState: ProgressFormState,
  formData: FormData,
): Promise<ProgressFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = deleteProgressLogSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { success: false, message: "Invalid request." };
  }

  const log = await prisma.progressLog.findFirst({
    where: {
      id: parsed.data.logId,
      client: { trainerId: trainerProfile.id },
    },
    select: { id: true },
  });

  if (!log) {
    return { success: false, message: "Log not found." };
  }

  await prisma.progressLog.delete({ where: { id: log.id } });

  revalidatePath(PROGRESS_PATH);

  return { success: true, message: "Log deleted." };
}
