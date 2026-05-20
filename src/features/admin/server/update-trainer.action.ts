"use server";

// Importamos revalidatePath para refrescar la página después de editar.
import { revalidatePath } from "next/cache";

// Importamos Prisma para actualizar User y TrainerProfile.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el formulario de edición.
import { updateTrainerSchema } from "../schemas/trainer.schema";

// Importamos el tipo del estado del formulario.
import type { TrainerFormState } from "../types/trainer.types";

// Esta función convierte texto vacío en null.
function normalizeOptionalText(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  return value.trim();
}

// Esta Server Action edita un trainer existente.
// Actualiza datos de User y TrainerProfile.
export async function updateTrainerAction(
  _previousState: TrainerFormState,
  formData: FormData,
): Promise<TrainerFormState> {
  await requireAdmin();

  const rawData = {
    trainerId: formData.get("trainerId"),
    name: formData.get("name"),
    email: formData.get("email"),
    specialty: formData.get("specialty"),
    bio: formData.get("bio"),
    hourlyRate: formData.get("hourlyRate"),
    isActive: formData.get("isActive"),
  };

  const parsedData = updateTrainerSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Please check the trainer form.",
      fieldErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  const trainer = await prisma.trainerProfile.findUnique({
    where: {
      id: parsedData.data.trainerId,
    },
    select: {
      id: true,
      userId: true,
      isArchived: true,
    },
  });

  if (!trainer) {
    return {
      success: false,
      message: "Trainer not found.",
    };
  }

  if (trainer.isArchived) {
    return {
      success: false,
      message: "Archived trainers cannot be edited. Restore the trainer first.",
    };
  }

  const emailOwner = await prisma.user.findFirst({
    where: {
      email: parsedData.data.email,
      NOT: {
        id: trainer.userId,
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
      fieldErrors: {
        email: ["This email is already registered."],
      },
    };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: trainer.userId,
      },
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        isActive: parsedData.data.isActive === "true",
      },
    }),

    prisma.trainerProfile.update({
      where: {
        id: trainer.id,
      },
      data: {
        specialty: parsedData.data.specialty,
        bio: normalizeOptionalText(parsedData.data.bio),
        hourlyRate: parsedData.data.hourlyRate,
      },
    }),
  ]);

  revalidatePath("/dashboard/admin/trainers");

  return {
    success: true,
    message: "Trainer updated successfully.",
  };
}