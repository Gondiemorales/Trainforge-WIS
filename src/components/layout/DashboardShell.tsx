// Importamos ReactNode para poder recibir contenido dentro del layout.
// children será la página concreta que se está mostrando.
import type { ReactNode } from "react";

// Importamos el tipo Role generado por Prisma.
// Lo usamos para pasar el rol al sidebar y al header.
import type { Role } from "@/generated/prisma/enums";

// Importamos el sidebar compartido del dashboard.
import { DashboardSidebar } from "./DashboardSidebar";

// Importamos el header compartido del dashboard.
import { DashboardHeader } from "./DashboardHeader";

// Este tipo define los datos mínimos del usuario que necesita el layout.
type DashboardShellUser = {
  name?: string | null;
  email?: string | null;
  role: Role;
};

// Este tipo define las props que recibe el layout principal.
type DashboardShellProps = {
  user: DashboardShellUser;
  children: ReactNode;
};

// Este componente monta la estructura común de todas las páginas privadas.
// Incluye sidebar, header y la zona central donde se renderiza cada página.
export function DashboardShell({ user, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex min-h-screen">
        {/* Menú lateral compartido */}
        <DashboardSidebar userRole={user.role} />

        {/* Zona principal del dashboard */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header superior compartido */}
          <DashboardHeader user={user} />

          {/* Contenido específico de cada página */}
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}