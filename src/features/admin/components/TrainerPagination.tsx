// Importamos Link para navegar entre páginas sin recargar toda la app.
import Link from "next/link";

// Importamos el tipo de paginación de trainers.
import type { TrainerPagination as TrainerPaginationType } from "../types/trainer.types";

type TrainerPaginationProps = {
  pagination: TrainerPaginationType;
  showArchived: boolean;
};

// Esta función construye la URL correcta para cada página.
// También mantiene el filtro archived=true si estamos viendo archivados.
function buildPageHref(page: number, showArchived: boolean) {
  const params = new URLSearchParams();

  params.set("page", page.toString());

  if (showArchived) {
    params.set("archived", "true");
  }

  return `/dashboard/admin/trainers?${params.toString()}`;
}

// Este componente muestra los botones Previous y Next.
// Si solo hay una página, no muestra nada.
export function TrainerPagination({
  pagination,
  showArchived,
}: TrainerPaginationProps) {
  // Si no hay más de una página, no necesitamos paginación.
  if (pagination.totalPages <= 1) {
    return null;
  }

  // Comprobamos si existe una página anterior.
  const hasPreviousPage = pagination.currentPage > 1;

  // Comprobamos si existe una página siguiente.
  const hasNextPage = pagination.currentPage < pagination.totalPages;

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-base-100 p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
      {/* Información de página actual */}
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