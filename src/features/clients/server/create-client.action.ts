"use server";

import { revalidatePath } from "next/cache";

import { hashPassword } from "@/features/auth/server/password.service";
import { createClientSchema } from "@/features/clients/schemas/client.schema";
import type { ClientFormState } from "@/features/clients/types/client.types";
import { Role } from "@/generated/prisma/enums";
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

export async function createClientAction(
  _previousState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = createClientSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the client form.",
      errors: getValidationErrors(parsed.error),
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "A user with this email already exists.",
      errors: {
        email: ["This email is already registered."],
      },
    };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: Role.CLIENT,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    await tx.clientProfile.create({
      data: {
        userId: user.id,
        trainerId: trainerProfile.id,
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
    });
  });

  revalidatePath(CLIENTS_PATH);

  return {
    success: true,
    message: "Client created successfully.",
  };
}