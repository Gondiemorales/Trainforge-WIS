// Este archivo solo debe ejecutarse en el servidor.
// Aquí leemos datos de la base de datos con Prisma.
import "server-only";

// Importamos Prisma para consultar la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos los tipos de esta funcionalidad.
import type {
  SubscriptionPageFilters,
  SubscriptionsQueryResult,
} from "../types/subscription.types";

// Número de suscripciones que mostramos por página.
const SUBSCRIPTIONS_PAGE_SIZE = 10;

// Esta función lee suscripciones para la tabla del admin.
// También calcula los datos de paginación.
export async function getSubscriptions(
  filters: SubscriptionPageFilters,
): Promise<SubscriptionsQueryResult> {
  // Comprobamos que solo un ADMIN pueda leer esta información.
  await requireAdmin();

  // Evitamos páginas inválidas como 0, -1 o NaN.
  const currentPage = Math.max(1, filters.page);

  // Calculamos cuántos registros saltar según la página actual.
  const skip = (currentPage - 1) * SUBSCRIPTIONS_PAGE_SIZE;

  // Si showArchived es true, mostramos archivadas.
  // Si es false, mostramos activas/no archivadas.
  const where = {
    isArchived: filters.showArchived,
  };

  // Contamos cuántas suscripciones existen con el filtro actual.
  const totalItems = await prisma.subscription.count({
    where,
  });

  // Leemos las suscripciones de la página actual.
  const subscriptions = await prisma.subscription.findMany({
    where,
    skip,
    take: SUBSCRIPTIONS_PAGE_SIZE,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      plan: true,
      status: true,
      monthlyPrice: true,
      startsAt: true,
      endsAt: true,
      isArchived: true,
      archivedAt: true,
      trainer: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // Calculamos el total de páginas.
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / SUBSCRIPTIONS_PAGE_SIZE),
  );

  // Adaptamos los datos de Prisma al formato que necesita la UI.
  return {
    subscriptions: subscriptions.map((subscription) => ({
      id: subscription.id,
      trainerName: subscription.trainer.user.name,
      trainerEmail: subscription.trainer.user.email,
      plan: subscription.plan,
      status: subscription.status,
      monthlyPrice: subscription.monthlyPrice.toString(),
      startsAt: subscription.startsAt,
      endsAt: subscription.endsAt,
      isArchived: subscription.isArchived,
      archivedAt: subscription.archivedAt,
    })),
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      pageSize: SUBSCRIPTIONS_PAGE_SIZE,
    },
  };
}