// Este archivo solo debe ejecutarse en el servidor.
// Aquí leemos datos de la base de datos con Prisma.
import "server-only";

// Importamos Prisma para consultar la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos los tipos de esta funcionalidad.
import type {
  TrainerPageFilters,
  TrainersQueryResult,
} from "../types/trainer.types";

// Número de trainers que mostramos por página.
const TRAINERS_PAGE_SIZE = 10;

// Esta función lee trainers para la tabla del admin.
// También calcula los datos de paginación.
export async function getTrainers(
  filters: TrainerPageFilters,
): Promise<TrainersQueryResult> {
  // Comprobamos que solo un ADMIN pueda leer esta información.
  await requireAdmin();

  // Evitamos páginas inválidas como 0, -1 o NaN.
  const currentPage = Math.max(1, filters.page);

  // Calculamos cuántos registros saltar según la página actual.
  const skip = (currentPage - 1) * TRAINERS_PAGE_SIZE;

  // Si showArchived es true, mostramos archivados.
  // Si es false, mostramos trainers activos/no archivados.
  const where = {
    isArchived: filters.showArchived,
  };

  // Contamos cuántos trainers existen con el filtro actual.
  const totalItems = await prisma.trainerProfile.count({
    where,
  });

  // Leemos los trainers de la página actual.
  const trainers = await prisma.trainerProfile.findMany({
    where,
    skip,
    take: TRAINERS_PAGE_SIZE,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      userId: true,
      specialty: true,
      bio: true,
      hourlyRate: true,
      isArchived: true,
      archivedAt: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
          isActive: true,
        },
      },
    },
  });

  // Calculamos el total de páginas.
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / TRAINERS_PAGE_SIZE),
  );

  // Adaptamos los datos de Prisma al formato que necesita la UI.
  return {
    trainers: trainers.map((trainer) => ({
      id: trainer.id,
      userId: trainer.userId,
      name: trainer.user.name,
      email: trainer.user.email,
      specialty: trainer.specialty,
      bio: trainer.bio,
      hourlyRate: trainer.hourlyRate.toString(),
      isActive: trainer.user.isActive,
      isArchived: trainer.isArchived,
      archivedAt: trainer.archivedAt,
      createdAt: trainer.createdAt,
    })),
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      pageSize: TRAINERS_PAGE_SIZE,
    },
  };
}