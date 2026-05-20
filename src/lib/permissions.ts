// Este archivo solo debe ejecutarse en el servidor.
// Aquí leemos sesiones y hacemos redirecciones seguras.
import "server-only";

// Importamos redirect para mandar al usuario a otra página desde el servidor.
import { redirect } from "next/navigation";

// Importamos el tipo Role generado por Prisma.
import type { Role } from "@/generated/prisma/enums";

// Importamos auth para leer la sesión actual.
import { auth } from "@/features/auth/server/auth";

// Importamos la función central que decide el dashboard correcto por rol.
import { getDashboardPathByRole } from "@/features/auth/utils/get-dashboard-path-by-role";

// Este tipo representa el usuario seguro que usaremos en páginas protegidas.
export type CurrentUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: Role;
};

// Esta función devuelve el usuario actual si hay sesión.
// Si no hay sesión, devuelve null.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

// Esta función exige que exista un usuario logueado.
// Si no hay sesión, redirige a /login.
export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

// Esta función exige que el usuario tenga uno de los roles permitidos.
// Si no tiene permiso, lo mandamos a su dashboard correcto.
export async function requireRole(allowedRoles: Role[]) {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect(getDashboardPathByRole(user.role));
  }

  return user;
}

// Esta función exige que el usuario sea administrador.
export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}

// Esta función exige que el usuario sea entrenador.
export async function requireTrainer() {
  return requireRole(["TRAINER"]);
}

// Esta función exige que el usuario sea cliente.
export async function requireClient() {
  return requireRole(["CLIENT"]);
}