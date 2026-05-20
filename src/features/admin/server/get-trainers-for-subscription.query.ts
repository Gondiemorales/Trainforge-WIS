// Este archivo solo debe ejecutarse en el servidor.
// Aquí leemos trainers desde la base de datos.
import "server-only";

// Importamos Prisma para consultar la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el tipo que usará el select del formulario.
import type { TrainerSelectOption } from "../types/subscription.types";

// Esta función lee los entrenadores disponibles para crear suscripciones.
// Solo devuelve trainers activos y no archivados.
export async function getTrainersForSubscription(): Promise<
  TrainerSelectOption[]
> {
  // Comprobamos que solo un ADMIN pueda leer esta información.
  await requireAdmin();

  // Buscamos perfiles de entrenador activos.
  const trainers = await prisma.trainerProfile.findMany({
    where: {
      isArchived: false,
      user: {
        isActive: true,
        role: "TRAINER",
      },
    },
    orderBy: {
      user: {
        name: "asc",
      },
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // Adaptamos los datos al formato que necesita el formulario.
  return trainers.map((trainer) => ({
    id: trainer.id,
    name: trainer.user.name,
    email: trainer.user.email,
  }));
}