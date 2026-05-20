// Importamos Link para cambiar de página sin recargar toda la aplicación.
import Link from "next/link";

// Importamos el tipo de paginación de esta funcionalidad.
import type { SubscriptionPagination as SubscriptionPaginationType } from "../types/subscription.types";

// Este tipo define los datos que necesita el componente de paginación.
type SubscriptionPaginationProps = {
  pagination: SubscriptionPaginationType;
  showArchived: boolean;
};

// Esta función construye la URL para cada página.
// Mantiene también el filtro de archivadas si está activo.
function buildPageHref(page: number, showArchived: boolean) {
  const params = new URLSearchParams();

  params.set("page", page.toString());

  if (showArchived) {
    params.set("archived", "true");
  }

  return `/dashboard/admin/subscriptions?${params.toString()}`;
}

// Este componente muestra los botones para cambiar entre páginas.
// Si solo hay una página, no muestra nada.
export function SubscriptionPagination({
  pagination,
  showArchived,
}: SubscriptionPaginationProps) {
  // Si no hay más de una página, no necesitamos paginación.
  if (pagination.totalPages <= 1) {
    return null;
  }

  // Calculamos si existen página anterior y siguiente.
  const hasPreviousPage = pagination.currentPage > 1;
  const hasNextPage = pagination.currentPage < pagination.totalPages;

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-base-100 p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
      {/* Información de la página actual */}
      <p className="text-sm text-base-content/60">
        Page{" "}
        <span className="font-semibold text-base-content">
          {pagination.currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-base-content">
          {pagination.totalPages}
        </span>
      </p>

      {/* Botones de navegación */}
      <div className="join">
        {hasPreviousPage ? (
          <Link
            href={buildPageHref(pagination.currentPage - 1, showArchived)}
            className="btn join-item btn-sm"
          >
            Previous
          </Link>
        ) : (
          <button className="btn join-item btn-sm" disabled>
            Previous
          </button>
        )}

        {hasNextPage ? (
          <Link
            href={buildPageHref(pagination.currentPage + 1, showArchived)}
            className="btn join-item btn-sm"
          >
            Next
          </Link>
        ) : (
          <button className="btn join-item btn-sm" disabled>
            Next
          </button>
        )}
      </div>
    </section>
  );
}