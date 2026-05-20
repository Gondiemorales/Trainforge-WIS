import type {
  ExperienceLevel,
  FitnessGoal,
} from "@/generated/prisma/enums";

export type ClientListItem = {
  id: string;
  userId: string;
  name: string;
  email: string;
  isActive: boolean;
  goal: FitnessGoal;
  goalDescription: string | null;
  experienceLevel: ExperienceLevel;
  preferredAppointmentTimes: string | null;
  notes: string | null;
  age: number | null;
  heightCm: string | null;
  currentWeightKg: string | null;
  isArchived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
};

export type ClientPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type TrainerClientsQueryResult = {
  clients: ClientListItem[];
  pagination: ClientPagination;
};

export type ClientPageFilters = {
  page?: number;
  archived?: boolean;
};

export type ClientFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};