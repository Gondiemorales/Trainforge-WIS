import type { DifficultyLevel } from "@/generated/prisma/enums";

export type ExerciseListItem = {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  instructions: string | null;
  difficulty: DifficultyLevel;
  defaultSets: number | null;
  defaultReps: number | null;
  isGlobal: boolean;
  isOwned: boolean;
  isArchived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
};

export type ExercisePagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type TrainerExercisesQueryResult = {
  exercises: ExerciseListItem[];
  pagination: ExercisePagination;
};

export type ExercisePageFilters = {
  page?: number;
  archived?: boolean;
  difficulty?: string;
};

export type ExerciseFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
