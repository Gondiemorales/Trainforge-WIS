"use server";

import { revalidatePath } from "next/cache";

import { updateAppointmentStatusSchema } from "@/features/appointments/schemas/appointment.schema";
import type { AppointmentFormState } from "@/features/appointments/types/appointment.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const CALENDAR_PATH = "/dashboard/trainer/calendar";

export async function updateAppointmentStatusAction(
  _previousState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updateAppointmentStatusSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { success: false, message: "Invalid request." };
  }

  const appointment = await prisma.appointment.findFirst({
    where: { id: parsed.data.appointmentId, trainerId: trainerProfile.id },
    select: { id: true, status: true },
  });

  if (!appointment) {
    return { success: false, message: "Appointment not found." };
  }

  if (appointment.status !== "SCHEDULED") {
    return { success: false, message: "Only scheduled appointments can be updated." };
  }

  await prisma.appointment.update({
    where: { id: appointment.id },
    data: { status: parsed.data.status },
  });

  revalidatePath(CALENDAR_PATH);

  return {
    success: true,
    message: `Appointment marked as ${parsed.data.status.toLowerCase()}.`,
  };
}
