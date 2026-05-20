import "server-only";

import { redirect } from "next/navigation";

import type {
  GeneratedMealPlan,
  NutritionPlanDetail,
} from "@/features/nutrition/types/nutrition.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function getNutritionPlanDetail(planId: string): Promise<NutritionPlanDetail> {
  const trainerProfile = await getCurrentTrainerProfile();

  const plan = await prisma.nutritionPlan.findFirst({
    where: { id: planId, trainerId: trainerProfile.id },
    select: {
      id: true,
      title: true,
      status: true,
      clientId: true,
      caloricGoal: true,
      macroSplit: true,
      allergies: true,
      dietaryPreferences: true,
      meals: true,
      createdAt: true,
      publishedAt: true,
      client: { select: { user: { select: { name: true } } } },
    },
  });

  if (!plan) {
    redirect("/dashboard/trainer/nutrition");
  }

  return {
    id: plan.id,
    title: plan.title,
    status: plan.status,
    clientId: plan.clientId,
    clientName: plan.client.user.name,
    caloricGoal: plan.caloricGoal,
    macroSplit: plan.macroSplit as { protein: number; carbs: number; fat: number } | null,
    allergies: plan.allergies,
    dietaryPreferences: plan.dietaryPreferences,
    meals: plan.meals as GeneratedMealPlan,
    createdAt: plan.createdAt,
    publishedAt: plan.publishedAt,
  };
}
