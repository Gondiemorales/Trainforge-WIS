"use server";

import { revalidatePath } from "next/cache";

import { createAppointmentSchema } from "@/features/appointments/schemas/appointment.schema";
import type { AppointmentFormState } from "@/features/appointments/types/appointment.types";
import { AppointmentStatus } from "@/generated/prisma/enums";
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

export async function createAppointmentAction(
  _previousState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const trainerProfile = await getCurrentTrainerProfile();

  const parsed = createAppointmentSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the appointment form.",
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

  await prisma.appointment.create({
    data: {
      trainerId: trainerProfile.id,
      clientId: parsed.data.clientId,
      title: parsed.data.title,
      type: parsed.data.type,
      status: AppointmentStatus.SCHEDULED,
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      meetingUrl: parsed.data.meetingUrl,
      location: parsed.data.location,
      notes: parsed.data.notes,
    },
  });

  revalidatePath(CALENDAR_PATH);

  return { success: true, message: "Appointment scheduled successfully." };
}
