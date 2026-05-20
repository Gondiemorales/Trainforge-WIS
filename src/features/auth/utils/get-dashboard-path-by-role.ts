// Importamos el tipo Role generado por Prisma.
// Así solo aceptamos roles reales de TrainForge.
import type { Role } from "@/generated/prisma/enums";

// Esta función devuelve la ruta correcta del dashboard según el rol del usuario.
// Centralizamos esto para no repetir rutas por toda la aplicación.
export function getDashboardPathByRole(role: Role) {
  if (role === "ADMIN") {
    return "/dashboard/admin";
  }

  if (role === "TRAINER") {
    return "/dashboard/trainer";
  }

  if (role === "CLIENT") {
    return "/dashboard/client";
  }

  return "/login";
}