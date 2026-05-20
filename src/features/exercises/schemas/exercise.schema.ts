import { z } from "zod";

import { DifficultyLevel } from "@/generated/prisma/enums";

function emptyToUndefined(value: unknown) {
  return value === "" ? undefined : value;
}

function optionalInteger(min: number, max: number) {
  return z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(min).max(max).optional(),
  );
}

function optionalText(maxLength: number) {
  return z.preprocess(
    emptyToUndefined,
    z.string().trim().max(maxLength).optional(),
  );
}

export const createExerciseSchema = z.object({
  name: z.string().trim().min(2).max(100),
  muscleGroup: z.string().trim().min(2).max(50),
  description: z.string().trim().min(5).max(1000),
  instructions: optionalText(2000),
  difficulty: z.nativeEnum(DifficultyLevel),
  defaultSets: optionalInteger(1, 20),
  defaultReps: optionalInteger(1, 100),
});

export const updateExerciseSchema = createExerciseSchema.extend({
  exerciseId: z.string().uuid(),
});

export const archiveExerciseSchema = z.object({
  exerciseId: z.string().uuid(),
});

export const restoreExerciseSchema = z.object({
  exerciseId: z.string().uuid(),
});

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>;
