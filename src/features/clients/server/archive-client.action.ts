"use server";

import { revalidatePath } from "next/cache";

import { archiveClientSchema } from "@/features/clients/schemas/client.schema";
import type { ClientFormState } from "@/features/clients/types/client.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const CLIENTS_PATH = "/dashboard/trainer/clients";

export async function archiveClientAction(
  _previousState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = archiveClientSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid client.",
    };
  }

  const client = await prisma.clientProfile.findFirst({
    where: {
      id: parsed.data.clientId,
      trainerId: trainerProfile.id,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!client) {
    return {
      success: false,
      message: "Client not found.",
    };
  }

  await prisma.$transaction([
    prisma.clientProfile.update({
      where: {
        id: client.id,
      },
      data: {
        isArchived: true,
        archivedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: {
        id: client.userId,
      },
      data: {
        isActive: false,
      },
    }),
  ]);

  revalidatePath(CLIENTS_PATH);

  return {
    success: true,
    message: "Client archived successfully.",
  };
}