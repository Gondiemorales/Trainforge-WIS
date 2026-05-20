"use server";

import { revalidatePath } from "next/cache";

import { getGeminiModel } from "@/features/nutrition/lib/gemini";
import { buildNutritionPrompt } from "@/features/nutrition/lib/nutrition-prompt";
import { generateNutritionPlanSchema } from "@/features/nutrition/schemas/nutrition.schema";
import type {
  GeneratedMealPlan,
  NutritionFormState,
} from "@/features/nutrition/types/nutrition.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const NUTRITION_PATH = "/dashboard/trainer/nutrition";

function getValidationErrors(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "flatten" in error &&
    typeof error.flatten === "function"
  ) {
    return error.flatten().fieldErrors;
  }
  return undefined;
}

function isValidMealPlan(data: unknown): data is GeneratedMealPlan {
  if (!data || typeof data !== "object") return false;
  const plan = data as Record<string, unknown>;
  return (
    Array.isArray(plan.days) &&
    plan.days.length > 0 &&
    typeof plan.weeklyAverage === "object" &&
    typeof plan.summary === "string"
  );
}

export async function generateNutritionPlanAction(
  _previousState: NutritionFormState,
  formData: FormData,
): Promise<NutritionFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = generateNutritionPlanSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the form.",
      errors: getValidationErrors(parsed.error),
    };
  }

  const client = await prisma.clientProfile.findFirst({
    where: {
      id: parsed.data.clientId,
      trainerId: trainerProfile.id,
      isArchived: false,
    },
    select: { id: true },
  });

  if (!client) {
    return {
      success: false,
      message: "Client not found.",
      errors: { clientId: ["Please select a valid client."] },
    };
  }

  const prompt = buildNutritionPrompt({
    caloricGoal: parsed.data.caloricGoal,
    proteinPct: parsed.data.proteinPct,
    carbsPct: parsed.data.carbsPct,
    fatPct: parsed.data.fatPct,
    allergies: parsed.data.allergies,
    dietaryPreferences: parsed.data.dietaryPreferences,
    currentWeightKg: parsed.data.currentWeightKg,
  });

  let mealPlan: GeneratedMealPlan;

  try {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed_json = JSON.parse(text);

    if (!isValidMealPlan(parsed_json)) {
      return {
        success: false,
        message: "The AI returned an unexpected response format. Please try again.",
      };
    }

    mealPlan = parsed_json;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: `AI generation failed: ${message}`,
    };
  }

  const macroSplit = {
    protein: parsed.data.proteinPct,
    carbs: parsed.data.carbsPct,
    fat: parsed.data.fatPct,
  };

  const aiPromptData = {
    caloricGoal: parsed.data.caloricGoal,
    macroSplit,
    allergies: parsed.data.allergies,
    dietaryPreferences: parsed.data.dietaryPreferences,
    currentWeightKg: parsed.data.currentWeightKg,
  };

  const plan = await prisma.nutritionPlan.create({
    data: {
      trainerId: trainerProfile.id,
      clientId: parsed.data.clientId,
      title: parsed.data.title,
      caloricGoal: parsed.data.caloricGoal,
      macroSplit,
      allergies: parsed.data.allergies,
      dietaryPreferences: parsed.data.dietaryPreferences,
      aiPromptData,
      meals: mealPlan,
    },
    select: { id: true },
  });

  revalidatePath(NUTRITION_PATH);

  return {
    success: true,
    message: "Nutrition plan generated successfully.",
    planId: plan.id,
  };
}
