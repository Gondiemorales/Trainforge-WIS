import type { AppointmentStatus, AppointmentType } from "@/generated/prisma/enums";

export type AppointmentListItem = {
  id: string;
  title: string;
  type: AppointmentType;
  status: AppointmentStatus;
  clientId: string;
  clientName: string;
  startTime: Date;
  endTime: Date;
  meetingUrl: string | null;
  location: string | null;
  notes: string | null;
  createdAt: Date;
};

export type AppointmentCalendarItem = {
  id: string;
  title: string;
  type: AppointmentType;
  status: AppointmentStatus;
  clientName: string;
  startTime: Date;
  endTime: Date;
};

export type AppointmentPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type TrainerAppointmentsQueryResult = {
  appointments: AppointmentListItem[];
  pagination: AppointmentPagination;
};

export type AppointmentPageFilters = {
  page?: number;
  status?: string;
};

export type CalendarFilters = {
  year: number;
  month: number;
};

export type AppointmentFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
