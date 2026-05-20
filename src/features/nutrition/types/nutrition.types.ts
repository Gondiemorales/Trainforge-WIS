import type { CaloricGoal, NutritionPlanStatus } from "@/generated/prisma/enums";

export type MealItem = {
  name: string;
  time: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  notes?: string;
};

export type DayPlan = {
  day: string;
  meals: MealItem[];
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

export type GeneratedMealPlan = {
  days: DayPlan[];
  weeklyAverage: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  summary: string;
};

export type NutritionPlanListItem = {
  id: string;
  title: string;
  status: NutritionPlanStatus;
  clientId: string;
  clientName: string;
  caloricGoal: CaloricGoal;
  allergies: string | null;
  dietaryPreferences: string | null;
  createdAt: Date;
  publishedAt: Date | null;
};

export type NutritionPlanDetail = {
  id: string;
  title: string;
  status: NutritionPlanStatus;
  clientId: string;
  clientName: string;
  caloricGoal: CaloricGoal;
  macroSplit: { protein: number; carbs: number; fat: number } | null;
  allergies: string | null;
  dietaryPreferences: string | null;
  meals: GeneratedMealPlan;
  createdAt: Date;
  publishedAt: Date | null;
};

export type NutritionPageFilters = {
  page?: number;
  status?: string;
};

export type NutritionPlansPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type TrainerNutritionPlansResult = {
  plans: NutritionPlanListItem[];
  pagination: NutritionPlansPagination;
};

export type NutritionFormState = {
  success: boolean;
  message: string;
  planId?: string;
  errors?: Record<string, string[]>;
};
