"use server";

// Importamos revalidatePath para refrescar la página después de crear.
import { revalidatePath } from "next/cache";

// Importamos Prisma para crear el usuario y el perfil de trainer.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos hashPassword para guardar contraseñas cifradas.
import { hashPassword } from "@/features/auth/server/password.service";

// Importamos el schema que valida el formulario.
import { createTrainerSchema } from "../schemas/trainer.schema";

// Importamos el tipo del estado del formulario.
import type { TrainerFormState } from "../types/trainer.types";

// Esta función convierte texto vacío en null.
function normalizeOptionalText(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  return value.trim();
}

// Esta Server Action crea un nuevo trainer.
// Crea primero el User y luego su TrainerProfile conectado.
export async function createTrainerAction(
  _previousState: TrainerFormState,
  formData: FormData,
): Promise<TrainerFormState> {
  await requireAdmin();

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    specialty: formData.get("specialty"),
    bio: formData.get("bio"),
    hourlyRate: formData.get("hourlyRate"),
  };

  const parsedData = createTrainerSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Please check the trainer form.",
      fieldErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "A user with this email already exists.",
      fieldErrors: {
        email: ["This email is already registered."],
      },
    };
  }

  const passwordHash = await hashPassword(parsedData.data.password);

  await prisma.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.email,
      passwordHash,
      role: "TRAINER",
      isActive: true,
      trainerProfile: {
        create: {
          specialty: parsedData.data.specialty,
          bio: normalizeOptionalText(parsedData.data.bio),
          hourlyRate: parsedData.data.hourlyRate,
        },
      },
    },
  });

  revalidatePath("/dashboard/admin/trainers");

  return {
    success: true,
    message: "Trainer created successfully.",
  };
}