export type ProgressLogItem = {
  id: string;
  clientId: string;
  clientName: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroup: string;
  date: Date;
  weightKg: string | null;
  reps: number | null;
  sets: number | null;
  bodyWeightKg: string | null;
  notes: string | null;
  createdAt: Date;
};

export type ProgressPageFilters = {
  clientId?: string;
  exerciseId?: string;
  page?: number;
};

export type ProgressPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type ProgressLogsResult = {
  logs: ProgressLogItem[];
  pagination: ProgressPagination;
};

export type ProgressFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
