import { z } from "zod";

import {
  ExperienceLevel,
  FitnessGoal,
} from "@/generated/prisma/enums";

const appointmentDaySchema = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const appointmentTimeSchema = z.object({
  day: appointmentDaySchema,
  times: z.array(z.string().regex(/^([01]\d|2[0-3]):00$/)).max(24),
});

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

function optionalNumber(min: number, max: number) {
  return z.preprocess(
    emptyToUndefined,
    z.coerce.number().min(min).max(max).optional(),
  );
}

const preferredAppointmentTimesSchema = z.preprocess((value) => {
  if (!value || value === "") {
    return [];
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}, z.array(appointmentTimeSchema).max(7));

const activeStatusSchema = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

export const createClientSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120).toLowerCase(),
  password: z.string().min(6).max(100),
  goal: z.nativeEnum(FitnessGoal),
  goalDescription: optionalText(500),
  experienceLevel: z.nativeEnum(ExperienceLevel),
  preferredAppointmentTimes: preferredAppointmentTimesSchema,
  notes: optionalText(1000),
  age: optionalInteger(13, 100),
  heightCm: optionalNumber(80, 250),
  currentWeightKg: optionalNumber(25, 400),
});

export const updateClientSchema = createClientSchema
  .omit({
    password: true,
  })
  .extend({
    clientId: z.string().uuid(),
    isActive: activeStatusSchema,
  });

export const archiveClientSchema = z.object({
  clientId: z.string().uuid(),
});

export const restoreClientSchema = z.object({
  clientId: z.string().uuid(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;