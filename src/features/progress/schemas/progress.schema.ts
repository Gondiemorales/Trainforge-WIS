import { z } from "zod";

function emptyToUndefined(value: unknown) {
  return value === "" ? undefined : value;
}

function optionalDecimal(min: number, max: number) {
  return z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(min).max(max).optional(),
  );
}

function optionalInteger(min: number, max: number) {
  return z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(min).max(max).optional(),
  );
}

export const logProgressSchema = z.object({
  clientId: z.string().uuid(),
  exerciseId: z.string().uuid(),
  date: z.coerce.date(),
  weightKg: optionalDecimal(0, 1000),
  reps: optionalInteger(1, 500),
  sets: optionalInteger(1, 50),
  bodyWeightKg: optionalDecimal(30, 300),
  notes: z.preprocess(emptyToUndefined, z.string().trim().max(500).optional()),
});

export const deleteProgressLogSchema = z.object({
  logId: z.string().uuid(),
});

export type LogProgressInput = z.infer<typeof logProgressSchema>;
