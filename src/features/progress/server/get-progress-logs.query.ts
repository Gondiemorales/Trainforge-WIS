import "server-only";

import type {
  ProgressLogsResult,
  ProgressPageFilters,
} from "@/features/progress/types/progress.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PAGE_SIZE = 15;

function normalizePage(page?: number) {
  if (!page || Number.isNaN(page)) return 1;
  return Math.max(page, 1);
}

export async function getProgressLogs(
  filters: ProgressPageFilters = {},
): Promise<ProgressLogsResult> {
  const trainerProfile = await getCurrentTrainerProfile();

  const page = normalizePage(filters.page);

  const where = {
    client: { trainerId: trainerProfile.id },
    ...(filters.clientId ? { clientId: filters.clientId } : {}),
    ...(filters.exerciseId ? { exerciseId: filters.exerciseId } : {}),
  };

  const [totalItems, logs] = await Promise.all([
    prisma.progressLog.count({ where }),
    prisma.progressLog.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        clientId: true,
        exerciseId: true,
        date: true,
        weightKg: true,
        reps: true,
        sets: true,
        bodyWeightKg: true,
        notes: true,
        createdAt: true,
        client: { select: { user: { select: { name: true } } } },
        exercise: { select: { name: true, muscleGroup: true } },
      },
    }),
  ]);

  return {
    logs: logs.map((l) => ({
      id: l.id,
      clientId: l.clientId,
      clientName: l.client.user.name,
      exerciseId: l.exerciseId,
      exerciseName: l.exercise.name,
      muscleGroup: l.exercise.muscleGroup,
      date: l.date,
      weightKg: l.weightKg !== null ? String(l.weightKg) : null,
      reps: l.reps,
      sets: l.sets,
      bodyWeightKg: l.bodyWeightKg !== null ? String(l.bodyWeightKg) : null,
      notes: l.notes,
      createdAt: l.createdAt,
    })),
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      totalItems,
      totalPages: Math.max(Math.ceil(totalItems / PAGE_SIZE), 1),
    },
  };
}
