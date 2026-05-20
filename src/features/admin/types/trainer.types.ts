// Este tipo representa un trainer listo para mostrarse en la tabla.
// Juntamos datos de User y TrainerProfile.
export type TrainerListItem = {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialty: string;
  bio: string | null;
  hourlyRate: string;
  isActive: boolean;
  isArchived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
};

// Este tipo representa los datos de paginación de la tabla.
export type TrainerPagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
};

// Este tipo representa la respuesta de la query principal.
export type TrainersQueryResult = {
  trainers: TrainerListItem[];
  pagination: TrainerPagination;
};

// Este tipo representa los filtros que pueden venir desde la URL.
export type TrainerPageFilters = {
  page: number;
  showArchived: boolean;
};

// Este tipo representa el estado que devuelven los formularios.
export type TrainerFormState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};