import type { DifficultyLevel, TrainingPlanStatus } from "@/generated/prisma/enums";

export type PlanListItem = {
  id: string;
  title: string;
  description: string | null;
  status: TrainingPlanStatus;
  clientId: string;
  clientName: string;
  startDate: Date | null;
  endDate: Date | null;
  exerciseCount: number;
  createdAt: Date;
};

export type PlanExerciseItem = {
  id: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroup: string;
  difficulty: DifficultyLevel;
  dayOfWeek: number | null;
  sets: number;
  reps: number;
  restSeconds: number | null;
  intensity: string | null;
  description: string | null;
  notes: string | null;
  position: number;
};

export type PlanDetail = {
  id: string;
  title: string;
  description: string | null;
  status: TrainingPlanStatus;
  clientId: string;
  clientName: string;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  exercises: PlanExerciseItem[];
};

export type ClientSelectOption = {
  id: string;
  name: string;
};

export type ExerciseSelectOption = {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: DifficultyLevel;
  defaultSets: number | null;
  defaultReps: number | null;
};

export type PlanPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type TrainerPlansQueryResult = {
  plans: PlanListItem[];
  pagination: PlanPagination;
};

export type PlanPageFilters = {
  page?: number;
  status?: string;
};

export type PlanFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
