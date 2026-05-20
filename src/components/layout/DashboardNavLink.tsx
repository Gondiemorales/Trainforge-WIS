"use client";

// Importamos Link para navegar entre páginas sin recargar toda la web.
import Link from "next/link";

// Importamos usePathname para saber cuál es la URL actual.
import { usePathname } from "next/navigation";

// Importamos el tipo de cada enlace del dashboard.
import type { DashboardNavItem } from "./dashboard-navigation";

// Este tipo define los datos que necesita el componente.
type DashboardNavLinkProps = {
  item: DashboardNavItem;
};

// Este componente pinta un enlace del sidebar.
// También marca visualmente el enlace activo según la URL actual.
export function DashboardNavLink({ item }: DashboardNavLinkProps) {
  // Leemos la ruta actual del navegador.
  const pathname = usePathname();

  // Comprobamos si este enlace corresponde a la página actual.
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <li>
      <Link
        href={item.href}
        className={isActive ? "active font-semibold" : ""}
      >
        <div>
          {/* Nombre principal del enlace */}
          <span>{item.label}</span>

          {/* Descripción pequeña del enlace */}
          <span className="block text-xs opacity-60">
            {item.description}
          </span>
        </div>
      </Link>
    </li>
  );
}