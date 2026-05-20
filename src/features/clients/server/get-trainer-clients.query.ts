import "server-only";

import type {
  ClientPageFilters,
  TrainerClientsQueryResult,
} from "@/features/clients/types/client.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const CLIENTS_PAGE_SIZE = 10;

function normalizePage(page?: number) {
  if (!page || Number.isNaN(page)) {
    return 1;
  }

  return Math.max(page, 1);
}

function decimalToString(value: unknown) {
  if (value === null || value === undefined) {
    return null;
  }

  return String(value);
}

function jsonToDisplayText(value: unknown) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value);
}

export async function getTrainerClients(
  filters: ClientPageFilters = {},
): Promise<TrainerClientsQueryResult> {
  const trainerProfile = await getCurrentTrainerProfile();

  const page = normalizePage(filters.page);
  const archived = filters.archived ?? false;

  const where = {
    trainerId: trainerProfile.id,
    isArchived: archived,
  };

  const [totalItems, clients] = await Promise.all([
    prisma.clientProfile.count({
      where,
    }),
    prisma.clientProfile.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * CLIENTS_PAGE_SIZE,
      take: CLIENTS_PAGE_SIZE,
      select: {
        id: true,
        userId: true,
        goal: true,
        goalDescription: true,
        experienceLevel: true,
        preferredAppointmentTimes: true,
        notes: true,
        age: true,
        heightCm: true,
        currentWeightKg: true,
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
    }),
  ]);

  const totalPages = Math.max(
    Math.ceil(totalItems / CLIENTS_PAGE_SIZE),
    1,
  );

  return {
    clients: clients.map((client) => ({
      id: client.id,
      userId: client.userId,
      name: client.user.name,
      email: client.user.email,
      isActive: client.user.isActive,
      goal: client.goal,
      goalDescription: client.goalDescription,
      experienceLevel: client.experienceLevel,
      preferredAppointmentTimes: jsonToDisplayText(
        client.preferredAppointmentTimes,
      ),
      notes: client.notes,
      age: client.age,
      heightCm: decimalToString(client.heightCm),
      currentWeightKg: decimalToString(client.currentWeightKg),
      isArchived: client.isArchived,
      archivedAt: client.archivedAt,
      createdAt: client.createdAt,
    })),
    pagination: {
      page,
      pageSize: CLIENTS_PAGE_SIZE,
      totalItems,
      totalPages,
    },
  };
}