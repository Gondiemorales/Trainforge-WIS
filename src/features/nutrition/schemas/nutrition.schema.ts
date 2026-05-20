import { z } from "zod";

import { CaloricGoal, NutritionPlanStatus } from "@/generated/prisma/enums";

function emptyToUndefined(value: unknown) {
  return value === "" ? undefined : value;
}

function optionalText(maxLength: number) {
  return z.preprocess(
    emptyToUndefined,
    z.string().trim().max(maxLength).optional(),
  );
}

export const generateNutritionPlanSchema = z
  .object({
    clientId: z.string().uuid(),
    title: z.string().trim().min(2).max(150),
    caloricGoal: z.nativeEnum(CaloricGoal),
    proteinPct: z.coerce.number().int().min(10).max(60),
    carbsPct: z.coerce.number().int().min(10).max(70),
    fatPct: z.coerce.number().int().min(10).max(50),
    allergies: optionalText(500),
    dietaryPreferences: optionalText(500),
    currentWeightKg: z.preprocess(
      emptyToUndefined,
      z.coerce.number().min(30).max(300).optional(),
    ),
  })
  .refine(
    (data) => data.proteinPct + data.carbsPct + data.fatPct === 100,
    {
      message: "Protein, carbs and fat percentages must add up to 100.",
      path: ["fatPct"],
    },
  );

export const updateNutritionStatusSchema = z.object({
  planId: z.string().uuid(),
  status: z.enum([NutritionPlanStatus.PUBLISHED, NutritionPlanStatus.ARCHIVED]),
});

export type GenerateNutritionPlanInput = z.infer<typeof generateNutritionPlanSchema>;
