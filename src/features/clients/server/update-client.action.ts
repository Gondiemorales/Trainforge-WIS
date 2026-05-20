"use server";

import { revalidatePath } from "next/cache";

import { updateClientSchema } from "@/features/clients/schemas/client.schema";
import type { ClientFormState } from "@/features/clients/types/client.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const CLIENTS_PATH = "/dashboard/trainer/clients";

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

export async function updateClientAction(
  _previousState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updateClientSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the client form.",
      errors: getValidationErrors(parsed.error),
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
      isArchived: true,
    },
  });

  if (!client) {
    return {
      success: false,
      message: "Client not found.",
    };
  }

  if (client.isArchived) {
    return {
      success: false,
      message: "Archived clients cannot be edited.",
    };
  }

  const emailOwner = await prisma.user.findFirst({
    where: {
      email: parsed.data.email,
      id: {
        not: client.userId,
      },
    },
    select: {
      id: true,
    },
  });

  if (emailOwner) {
    return {
      success: false,
      message: "A user with this email already exists.",
      errors: {
        email: ["This email is already registered."],
      },
    };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: client.userId,
      },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        isActive: parsed.data.isActive,
      },
    }),
    prisma.clientProfile.update({
      where: {
        id: client.id,
      },
      data: {
        goal: parsed.data.goal,
        goalDescription: parsed.data.goalDescription,
        experienceLevel: parsed.data.experienceLevel,
        preferredAppointmentTimes:
          parsed.data.preferredAppointmentTimes,
        notes: parsed.data.notes,
        age: parsed.data.age,
        heightCm: parsed.data.heightCm,
        currentWeightKg: parsed.data.currentWeightKg,
      },
    }),
  ]);

  revalidatePath(CLIENTS_PATH);

  return {
    success: true,
    message: "Client updated successfully.",
  };
}