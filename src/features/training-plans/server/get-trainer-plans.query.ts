import "server-only";

import type { TrainingPlanStatus } from "@/generated/prisma/enums";
import type {
  PlanPageFilters,
  TrainerPlansQueryResult,
} from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PLANS_PAGE_SIZE = 10;

function normalizePage(page?: number) {
  if (!page || Number.isNaN(page)) return 1;
  return Math.max(page, 1);
}

function buildStatusFilter(status?: string): TrainingPlanStatus[] | undefined {
  if (status === "DRAFT") return ["DRAFT"];
  if (status === "ACTIVE") return ["ACTIVE"];
  if (status === "ARCHIVED") return ["ARCHIVED"];
  return ["DRAFT", "ACTIVE"];
}

export async function getTrainerPlans(
  filters: PlanPageFilters = {},
): Promise<TrainerPlansQueryResult> {
  const trainerProfile = await getCurrentTrainerProfile();

  const page = normalizePage(filters.page);
  const statuses = buildStatusFilter(filters.status);

  const where = {
    trainerId: trainerProfile.id,
    status: { in: statuses },
  };

  const [totalItems, plans] = await Promise.all([
    prisma.trainingPlan.count({ where }),
    prisma.trainingPlan.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PLANS_PAGE_SIZE,
      take: PLANS_PAGE_SIZE,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        clientId: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        client: {
          select: {
            user: { select: { name: true } },
          },
        },
        _count: {
          select: { exercises: true },
        },
      },
    }),
  ]);

  const totalPages = Math.max(Math.ceil(totalItems / PLANS_PAGE_SIZE), 1);

  return {
    plans: plans.map((plan) => ({
      id: plan.id,
      title: plan.title,
      description: plan.description,
      status: plan.status,
      clientId: plan.clientId,
      clientName: plan.client.user.name,
      startDate: plan.startDate,
      endDate: plan.endDate,
      exerciseCount: plan._count.exercises,
      createdAt: plan.createdAt,
    })),
    pagination: {
      page,
      pageSize: PLANS_PAGE_SIZE,
      totalItems,
      totalPages,
    },
  };
}
