import "server-only";

import type { NutritionPlanStatus } from "@/generated/prisma/enums";
import type {
  NutritionPageFilters,
  TrainerNutritionPlansResult,
} from "@/features/nutrition/types/nutrition.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PAGE_SIZE = 9;

function normalizePage(page?: number) {
  if (!page || Number.isNaN(page)) return 1;
  return Math.max(page, 1);
}

function normalizeStatus(status?: string): NutritionPlanStatus | undefined {
  if (status === "DRAFT" || status === "PUBLISHED" || status === "ARCHIVED") {
    return status as NutritionPlanStatus;
  }
  return undefined;
}

export async function getTrainerNutritionPlans(
  filters: NutritionPageFilters = {},
): Promise<TrainerNutritionPlansResult> {
  const trainerProfile = await getCurrentTrainerProfile();

  const page = normalizePage(filters.page);
  const status = normalizeStatus(filters.status);

  const where = {
    trainerId: trainerProfile.id,
    ...(status ? { status } : {}),
  };

  const [totalItems, plans] = await Promise.all([
    prisma.nutritionPlan.count({ where }),
    prisma.nutritionPlan.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        status: true,
        clientId: true,
        caloricGoal: true,
        allergies: true,
        dietaryPreferences: true,
        createdAt: true,
        publishedAt: true,
        client: { select: { user: { select: { name: true } } } },
      },
    }),
  ]);

  return {
    plans: plans.map((p) => ({
      id: p.id,
      title: p.title,
      status: p.status,
      clientId: p.clientId,
      clientName: p.client.user.name,
      caloricGoal: p.caloricGoal,
      allergies: p.allergies,
      dietaryPreferences: p.dietaryPreferences,
      createdAt: p.createdAt,
      publishedAt: p.publishedAt,
    })),
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      totalItems,
      totalPages: Math.max(Math.ceil(totalItems / PAGE_SIZE), 1),
    },
  };
}
