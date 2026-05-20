import "server-only";

import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function getExercisesForSelect() {
  const trainerProfile = await getCurrentTrainerProfile();

  const exercises = await prisma.exerciseDictionary.findMany({
    where: {
      isArchived: false,
      OR: [{ isGlobal: true }, { createdByTrainerId: trainerProfile.id }],
    },
    orderBy: [{ isGlobal: "desc" }, { name: "asc" }],
    select: { id: true, name: true, muscleGroup: true },
  });

  return exercises;
}
