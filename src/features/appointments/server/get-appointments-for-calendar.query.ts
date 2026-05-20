import "server-only";

import type { AppointmentCalendarItem } from "@/features/appointments/types/appointment.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function getAppointmentsForCalendar(
  year: number,
  month: number,
): Promise<AppointmentCalendarItem[]> {
  const trainerProfile = await getCurrentTrainerProfile();

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const appointments = await prisma.appointment.findMany({
    where: {
      trainerId: trainerProfile.id,
      startTime: { gte: start, lt: end },
    },
    orderBy: { startTime: "asc" },
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      startTime: true,
      endTime: true,
      client: { select: { user: { select: { name: true } } } },
    },
  });

  return appointments.map((a) => ({
    id: a.id,
    title: a.title,
    type: a.type,
    status: a.status,
    clientName: a.client.user.name,
    startTime: a.startTime,
    endTime: a.endTime,
  }));
}
