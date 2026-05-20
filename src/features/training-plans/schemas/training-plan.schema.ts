import { z } from "zod";

import { DifficultyLevel, TrainingPlanStatus } from "@/generated/prisma/enums";

function emptyToUndefined(value: unknown) {
  return value === "" ? undefined : value;
}

function optionalText(maxLength: number) {
  return z.preprocess(
    emptyToUndefined,
    z.string().trim().max(maxLength).optional(),
  );
}

function optionalInteger(min: number, max: number) {
  return z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(min).max(max).optional(),
  );
}

function optionalDate() {
  return z.preprocess(
    emptyToUndefined,
    z.coerce.date().optional(),
  );
}

export const createPlanSchema = z.object({
  title: z.string().trim().min(2).max(150),
  description: optionalText(1000),
  clientId: z.string().uuid(),
  startDate: optionalDate(),
  endDate: optionalDate(),
});

export const updatePlanSchema = createPlanSchema.extend({
  planId: z.string().uuid(),
});

export const updatePlanStatusSchema = z.object({
  planId: z.string().uuid(),
  status: z.nativeEnum(TrainingPlanStatus),
});

export const addPlanExerciseSchema = z.object({
  planId: z.string().uuid(),
  exerciseId: z.string().uuid(),
  dayOfWeek: optionalInteger(1, 7),
  sets: z.coerce.number().int().min(1).max(20),
  reps: z.coerce.number().int().min(1).max(200),
  restSeconds: optionalInteger(0, 600),
  intensity: optionalText(100),
  description: optionalText(500),
  notes: optionalText(500),
  difficulty: z.nativeEnum(DifficultyLevel),
});

export const removePlanExerciseSchema = z.object({
  planExerciseId: z.string().uuid(),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type AddPlanExerciseInput = z.infer<typeof addPlanExerciseSchema>;
