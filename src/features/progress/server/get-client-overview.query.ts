import "server-only";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { getCurrentTrainerProfile } from "./get-current-trainer-profile.query";

export type ClientOverview = {
  id: string;
  name: string;
  email: string;
  goal: string;
  goalDescription: string | null;
  experienceLevel: string;
  age: number | null;
  heightCm: string | null;
  currentWeightKg: string | null;
  notes: string | null;
  isActive: boolean;
  progressLogs: {
    id: string;
    exerciseName: string;
    muscleGroup: string;
    date: Date;
    weightKg: string | null;
    reps: number | null;
    sets: number | null;
    bodyWeightKg: string | null;
    notes: string | null;
  }[];
  trainingPlans: {
    id: string;
    title: string;
    status: string;
    exerciseCount: number;
    startDate: Date | null;
    endDate: Date | null;
  }[];
  appointments: {
    id: string;
    title: string;
    type: string;
    status: string;
    startTime: Date;
    endTime: Date;
    meetingUrl: string | null;
    location: string | null;
  }[];
  nutritionPlans: {
    id: string;
    title: string;
    status: string;
    caloricGoal: string;
    createdAt: Date;
  }[];
};

export async function getClientOverview(clientId: string): Promise<ClientOverview> {
  const trainerProfile = await getCurrentTrainerProfile();

  const client = await prisma.clientProfile.findFirst({
    where: { id: clientId, trainerId: trainerProfile.id },
    select: {
      id: true,
      goal: true,
      goalDescription: true,
      experienceLevel: true,
      age: true,
      heightCm: true,
      currentWeightKg: true,
      notes: true,
      user: { select: { name: true, email: true, isActive: true } },
      progressLogs: {
        orderBy: { date: "desc" },
        take: 50,
        select: {
          id: true,
          date: true,
          weightKg: true,
          reps: true,
          sets: true,
          bodyWeightKg: true,
          notes: true,
          exercise: { select: { name: true, muscleGroup: true } },
        },
      },
      trainingPlans: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          startDate: true,
          endDate: true,
          _count: { select: { exercises: true } },
        },
      },
      appointments: {
        orderBy: { startTime: "desc" },
        take: 20,
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          startTime: true,
          endTime: true,
          meetingUrl: true,
          location: true,
        },
      },
      nutritionPlans: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          caloricGoal: true,
          createdAt: true,
        },
      },
    },
  });

  if (!client) {
    redirect("/dashboard/trainer/progress");
  }

  return {
    id: clientId,
    name: client.user.name,
    email: client.user.email,
    goal: client.goal,
    goalDescription: client.goalDescription,
    experienceLevel: client.experienceLevel,
    age: client.age,
    heightCm: client.heightCm !== null ? String(client.heightCm) : null,
    currentWeightKg: client.currentWeightKg !== null ? String(client.currentWeightKg) : null,
    notes: client.notes,
    isActive: client.user.isActive,
    progressLogs: client.progressLogs.map((l) => ({
      id: l.id,
      exerciseName: l.exercise.name,
      muscleGroup: l.exercise.muscleGroup,
      date: l.date,
      weightKg: l.weightKg !== null ? String(l.weightKg) : null,
      reps: l.reps,
      sets: l.sets,
      bodyWeightKg: l.bodyWeightKg !== null ? String(l.bodyWeightKg) : null,
      notes: l.notes,
    })),
    trainingPlans: client.trainingPlans.map((p) => ({
      id: p.id,
      title: p.title,
      status: p.status,
      exerciseCount: p._count.exercises,
      startDate: p.startDate,
      endDate: p.endDate,
    })),
    appointments: client.appointments.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      status: a.status,
      startTime: a.startTime,
      endTime: a.endTime,
      meetingUrl: a.meetingUrl,
      location: a.location,
    })),
    nutritionPlans: client.nutritionPlans.map((n) => ({
      id: n.id,
      title: n.title,
      status: n.status,
      caloricGoal: n.caloricGoal,
      createdAt: n.createdAt,
    })),
  };
}
