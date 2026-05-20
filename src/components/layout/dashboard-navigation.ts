// Importamos el tipo Role generado por Prisma.
// Así solo trabajamos con roles reales: ADMIN, TRAINER o CLIENT.
import type { Role } from "@/generated/prisma/enums";

// Este tipo define cómo es cada enlace del sidebar.
// Cada enlace tendrá un texto, una URL y una pequeña descripción.
export type DashboardNavItem = {
  label: string;
  href: string;
  description: string;
};

// Esta lista contiene los enlaces que verá un usuario ADMIN.
// El admin gestiona la parte SaaS de la plataforma.
const adminDashboardNavigation: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    description: "Admin overview",
  },
  {
    label: "Trainers",
    href: "/dashboard/admin/trainers",
    description: "Manage trainer accounts",
  },
  {
    label: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    description: "Manage SaaS subscriptions",
  },
];

// Esta lista contiene los enlaces que verá un usuario TRAINER.
// El trainer gestiona clientes, ejercicios, planes, citas y progreso.
const trainerDashboardNavigation: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/trainer",
    description: "Trainer overview",
  },
  {
    label: "Clients",
    href: "/dashboard/trainer/clients",
    description: "Manage clients",
  },
  {
    label: "Exercises",
    href: "/dashboard/trainer/exercises",
    description: "Exercise catalogue",
  },
  {
    label: "Plans",
    href: "/dashboard/trainer/plans",
    description: "Training plans",
  },
  {
    label: "Calendar",
    href: "/dashboard/trainer/calendar",
    description: "Appointments",
  },
  {
    label: "Progress",
    href: "/dashboard/trainer/progress",
    description: "Client progress",
  },
  {
    label: "Nutrition",
    href: "/dashboard/trainer/nutrition",
    description: "Meal plans",
  },
];

// Esta lista contiene los enlaces que verá un usuario CLIENT.
// El client ve su plan, registra progreso y consulta mensajes o nutrición.
const clientDashboardNavigation: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/client",
    description: "Client overview",
  },
  {
    label: "My Plan",
    href: "/dashboard/client/plan",
    description: "Assigned workouts",
  },
  {
    label: "My Progress",
    href: "/dashboard/client/progress",
    description: "Log progress",
  },
  {
    label: "Nutrition",
    href: "/dashboard/client/nutrition",
    description: "Meal plans",
  },
];

// Esta función devuelve los enlaces correctos según el rol del usuario.
// Así el sidebar puede ser reutilizable para admin, trainer y client.
export function getDashboardNavigationByRole(role: Role) {
  if (role === "ADMIN") {
    return adminDashboardNavigation;
  }

  if (role === "TRAINER") {
    return trainerDashboardNavigation;
  }

  if (role === "CLIENT") {
    return clientDashboardNavigation;
  }

  return [];
}