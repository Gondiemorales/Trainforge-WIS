// Importamos los tipos generados por Prisma.
// Así usamos exactamente los mismos valores que existen en la base de datos.
import type {
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/generated/prisma/enums";

// Este tipo representa una suscripción lista para mostrar en la tabla.
// No es el modelo completo de Prisma, solo los datos que necesita la pantalla.
export type SubscriptionListItem = {
  id: string;
  trainerName: string;
  trainerEmail: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  monthlyPrice: string;
  startsAt: Date;
  endsAt: Date | null;
  isArchived: boolean;
  archivedAt: Date | null;
};

// Este tipo representa los datos de paginación de la tabla.
export type SubscriptionPagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
};

// Este tipo representa la respuesta de la query principal.
// Incluye la lista de suscripciones y la información de paginación.
export type SubscriptionsQueryResult = {
  subscriptions: SubscriptionListItem[];
  pagination: SubscriptionPagination;
};

// Este tipo representa un trainer disponible para crear una suscripción.
export type TrainerSelectOption = {
  id: string;
  name: string;
  email: string;
};

// Este tipo representa los filtros que pueden venir desde la URL.
export type SubscriptionPageFilters = {
  page: number;
  showArchived: boolean;
};

// Este tipo representa el estado que devuelven los formularios al usuario.
export type SubscriptionFormState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};