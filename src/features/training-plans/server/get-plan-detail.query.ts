import "server-only";

import { redirect } from "next/navigation";

import type { PlanDetail } from "@/features/training-plans/types/training-plan.types";
import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export async function getPlanDetail(planId: string): Promise<PlanDetail> {
  const trainerProfile = await getCurrentTrainerProfile();

  const plan = await prisma.trainingPlan.findFirst({
    where: {
      id: planId,
      trainerId: trainerProfile.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      clientId: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      client: {
        select: {
          user: { select: { name: true } },
        },
      },
      exercises: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          exerciseId: true,
          exerciseNameSnapshot: true,
          dayOfWeek: true,
          sets: true,
          reps: true,
          restSeconds: true,
          intensity: true,
          description: true,
          notes: true,
          difficulty: true,
          position: true,
          exercise: {
            select: {
              muscleGroup: true,
            },
          },
        },
      },
    },
  });

  if (!plan) {
    redirect("/dashboard/trainer/plans");
  }

  return {
    id: plan.id,
    title: plan.title,
    description: plan.description,
    status: plan.status,
    clientId: plan.clientId,
    clientName: plan.client.user.name,
    startDate: plan.startDate,
    endDate: plan.endDate,
    createdAt: plan.createdAt,
    exercises: plan.exercises.map((ex) => ({
      id: ex.id,
      exerciseId: ex.exerciseId,
      exerciseName: ex.exerciseNameSnapshot,
      muscleGroup: ex.exercise.muscleGroup,
      difficulty: ex.difficulty,
      dayOfWeek: ex.dayOfWeek,
      sets: ex.sets,
      reps: ex.reps,
      restSeconds: ex.restSeconds,
      intensity: ex.intensity,
      description: ex.description,
      notes: ex.notes,
      position: ex.position,
    })),
  };
}
