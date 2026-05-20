// Importamos el tipo Role generado por Prisma.
// Lo usamos para mostrar el rol del usuario de forma segura.
import type { Role } from "@/generated/prisma/enums";

// Importamos el botón de logout que ya funciona con Auth.js.
import { LogoutButton } from "@/features/auth/components/LogoutButton";

// Este tipo define los datos mínimos que necesita el header.
type DashboardHeaderProps = {
  user: {
    name?: string | null;
    email?: string | null;
    role: Role;
  };
};

// Esta función convierte el rol técnico en un texto más fácil de leer.
function formatRoleLabel(role: Role) {
  if (role === "ADMIN") {
    return "Administrator";
  }

  if (role === "TRAINER") {
    return "Personal Trainer";
  }

  return "Client";
}

// Este componente muestra la barra superior del dashboard.
// Incluye información del usuario y el botón para cerrar sesión.
export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="border-b border-base-300 bg-base-100 px-6 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Información del usuario actual */}
        <div>
          <p className="text-sm font-medium text-base-content/50">
            Signed in as
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">
              {user.name ?? "TrainForge User"}
            </h2>

            <span className="badge badge-primary">
              {formatRoleLabel(user.role)}
            </span>
          </div>

          <p className="mt-1 text-sm text-base-content/60">
            {user.email}
          </p>
        </div>

        {/* Acción para cerrar sesión */}
        <LogoutButton />
      </div>
    </header>
  );
}