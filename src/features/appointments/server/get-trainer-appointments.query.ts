import "server-only";

import type { AppointmentStatus } from "@/generated/prisma/enums";
import type {
  AppointmentPageFilters,
  TrainerAppointmentsQueryResult,
} from "@/features/appointments/types/appointment.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

const PAGE_SIZE = 10;

function normalizePage(page?: number) {
  if (!page || Number.isNaN(page)) return 1;
  return Math.max(page, 1);
}

function normalizeStatus(status?: string): AppointmentStatus | undefined {
  if (status === "SCHEDULED" || status === "COMPLETED" || status === "CANCELLED") {
    return status as AppointmentStatus;
  }
  return undefined;
}

export async function getTrainerAppointments(
  filters: AppointmentPageFilters = {},
): Promise<TrainerAppointmentsQueryResult> {
  const trainerProfile = await getCurrentTrainerProfile();

  const page = normalizePage(filters.page);
  const status = normalizeStatus(filters.status);

  const where = {
    trainerId: trainerProfile.id,
    ...(status ? { status } : {}),
  };

  const [totalItems, appointments] = await Promise.all([
    prisma.appointment.count({ where }),
    prisma.appointment.findMany({
      where,
      orderBy: { startTime: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        clientId: true,
        startTime: true,
        endTime: true,
        meetingUrl: true,
        location: true,
        notes: true,
        createdAt: true,
        client: { select: { user: { select: { name: true } } } },
      },
    }),
  ]);

  return {
    appointments: appointments.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      status: a.status,
      clientId: a.clientId,
      clientName: a.client.user.name,
      startTime: a.startTime,
      endTime: a.endTime,
      meetingUrl: a.meetingUrl,
      location: a.location,
      notes: a.notes,
      createdAt: a.createdAt,
    })),
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      totalItems,
      totalPages: Math.max(Math.ceil(totalItems / PAGE_SIZE), 1),
    },
  };
}
