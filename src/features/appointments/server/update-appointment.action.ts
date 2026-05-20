"use server";

import { revalidatePath } from "next/cache";

import { updateAppointmentSchema } from "@/features/appointments/schemas/appointment.schema";
import type { AppointmentFormState } from "@/features/appointments/types/appointment.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const CALENDAR_PATH = "/dashboard/trainer/calendar";

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

export async function updateAppointmentAction(
  _previousState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = updateAppointmentSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the appointment form.",
      errors: getValidationErrors(parsed.error),
    };
  }

  const appointment = await prisma.appointment.findFirst({
    where: { id: parsed.data.appointmentId, trainerId: trainerProfile.id },
    select: { id: true, status: true },
  });

  if (!appointment) {
    return { success: false, message: "Appointment not found." };
  }

  if (appointment.status !== "SCHEDULED") {
    return { success: false, message: "Only scheduled appointments can be edited." };
  }

  await prisma.appointment.update({
    where: { id: appointment.id },
    data: {
      title: parsed.data.title,
      type: parsed.data.type,
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      meetingUrl: parsed.data.meetingUrl,
      location: parsed.data.location,
      notes: parsed.data.notes,
    },
  });

  revalidatePath(CALENDAR_PATH);

  return { success: true, message: "Appointment updated successfully." };
}
