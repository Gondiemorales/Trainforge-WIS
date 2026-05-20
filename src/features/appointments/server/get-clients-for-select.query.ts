import "server-only";

import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function getClientsForSelect() {
  const trainerProfile = await getCurrentTrainerProfile();

  const clients = await prisma.clientProfile.findMany({
    where: { trainerId: trainerProfile.id, isArchived: false },
    orderBy: { user: { name: "asc" } },
    select: { id: true, user: { select: { name: true } } },
  });

  return clients.map((c) => ({ id: c.id, name: c.user.name }));
}
