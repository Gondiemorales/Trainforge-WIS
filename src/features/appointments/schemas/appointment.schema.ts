import { z } from "zod";

import { AppointmentStatus, AppointmentType } from "@/generated/prisma/enums";

function emptyToUndefined(value: unknown) {
  return value === "" ? undefined : value;
}

function optionalText(maxLength: number) {
  return z.preprocess(
    emptyToUndefined,
    z.string().trim().max(maxLength).optional(),
  );
}

export const createAppointmentSchema = z
  .object({
    clientId: z.string().uuid(),
    title: z.string().trim().min(2).max(150),
    type: z.nativeEnum(AppointmentType),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    meetingUrl: optionalText(300),
    location: optionalText(200),
    notes: optionalText(1000),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time.",
    path: ["endTime"],
  });

export const updateAppointmentSchema = z
  .object({
    appointmentId: z.string().uuid(),
    clientId: z.string().uuid(),
    title: z.string().trim().min(2).max(150),
    type: z.nativeEnum(AppointmentType),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    meetingUrl: optionalText(300),
    location: optionalText(200),
    notes: optionalText(1000),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time.",
    path: ["endTime"],
  });

export const updateAppointmentStatusSchema = z.object({
  appointmentId: z.string().uuid(),
  status: z.enum(["COMPLETED", "CANCELLED"]),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
