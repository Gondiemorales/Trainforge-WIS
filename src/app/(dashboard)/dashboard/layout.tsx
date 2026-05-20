// Importamos ReactNode para poder recibir páginas dentro del layout.
// children será la página concreta que se renderiza dentro de /dashboard.
import type { ReactNode } from "react";

// Importamos el layout visual compartido del dashboard.
import { DashboardShell } from "@/components/layout/DashboardShell";

// Importamos el helper que exige que el usuario esté logueado.
import { requireUser } from "@/lib/permissions";

// Este tipo define lo que recibe cualquier layout de Next.js.
type DashboardLayoutProps = {
  children: ReactNode;
};

// Este layout se aplica a todas las rutas dentro de /dashboard.
// Comprueba que hay sesión y luego muestra sidebar, header y contenido.
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Exigimos que el usuario esté logueado para entrar en cualquier dashboard.
  const user = await requireUser();

  // Renderizamos la estructura común del dashboard.
  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}