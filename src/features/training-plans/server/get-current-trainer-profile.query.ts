import "server-only";

import { redirect } from "next/navigation";

import { requireTrainer } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function getCurrentTrainerProfile() {
  const user = await requireTrainer();

  const trainerProfile = await prisma.trainerProfile.findUnique({
    where: { userId: user.id },
    select: { id: true, userId: true, isArchived: true },
  });

  if (!trainerProfile) {
    redirect("/dashboard");
  }

  if (trainerProfile.isArchived) {
    redirect("/dashboard");
  }

  return trainerProfile;
}
