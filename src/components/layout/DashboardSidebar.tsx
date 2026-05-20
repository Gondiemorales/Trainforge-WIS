// Importamos el tipo Role generado por Prisma.
// Lo usamos para saber qué menú debe ver cada usuario.
import type { Role } from "@/generated/prisma/enums";

// Importamos la función que devuelve los enlaces según el rol.
import { getDashboardNavigationByRole } from "./dashboard-navigation";

// Importamos el componente que pinta cada enlace del menú.
import { DashboardNavLink } from "./DashboardNavLink";

// Este tipo define los datos que necesita el sidebar.
type DashboardSidebarProps = {
  userRole: Role;
};

// Este componente pinta el menú lateral del dashboard.
// Recibe el rol del usuario y muestra los enlaces correspondientes.
export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  // Obtenemos los enlaces correctos según el rol del usuario.
  const navigationItems = getDashboardNavigationByRole(userRole);

  return (
    <aside className="hidden min-h-screen w-72 border-r border-base-300 bg-base-100 px-4 py-6 lg:block">
      {/* Logo y nombre de la app */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-content">
            TF
          </div>

          <div>
            <p className="text-lg font-black leading-none">TrainForge</p>
            <p className="mt-1 text-xs text-base-content/50">
              Fitness SaaS
            </p>
          </div>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav aria-label="Dashboard navigation">
        <ul className="menu gap-1 rounded-box p-0">
          {navigationItems.map((item) => (
            <DashboardNavLink key={item.href} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}