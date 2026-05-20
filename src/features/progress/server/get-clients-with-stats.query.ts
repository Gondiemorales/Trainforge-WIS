import "server-only";

import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export type ClientWithStats = {
  id: string;
  userId: string;
  name: string;
  email: string;
  goal: string;
  experienceLevel: string;
  isArchived: boolean;
  totalProgressLogs: number;
  activePlans: number;
  nextAppointment: Date | null;
  lastSessionDate: Date | null;
};

export async function getClientsWithStats(): Promise<ClientWithStats[]> {
  const trainerProfile = await getCurrentTrainerProfile();

  const clients = await prisma.clientProfile.findMany({
    where: { trainerId: trainerProfile.id, isArchived: false },
    orderBy: { user: { name: "asc" } },
    select: {
      id: true,
      userId: true,
      goal: true,
      experienceLevel: true,
      isArchived: true,
      user: { select: { name: true, email: true } },
      _count: { select: { progressLogs: true } },
      trainingPlans: {
        where: { status: { in: ["DRAFT", "ACTIVE"] } },
        select: { id: true },
      },
      appointments: {
        where: {
          status: "SCHEDULED",
          startTime: { gte: new Date() },
        },
        orderBy: { startTime: "asc" },
        take: 1,
        select: { startTime: true },
      },
      progressLogs: {
        orderBy: { date: "desc" },
        take: 1,
        select: { date: true },
      },
    },
  });

  return clients.map((c) => ({
    id: c.id,
    userId: c.userId,
    name: c.user.name,
    email: c.user.email,
    goal: c.goal,
    experienceLevel: c.experienceLevel,
    isArchived: c.isArchived,
    totalProgressLogs: c._count.progressLogs,
    activePlans: c.trainingPlans.length,
    nextAppointment: c.appointments[0]?.startTime ?? null,
    lastSessionDate: c.progressLogs[0]?.date ?? null,
  }));
}
