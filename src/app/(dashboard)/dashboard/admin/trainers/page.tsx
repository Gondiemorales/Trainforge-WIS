// Importamos Link para crear enlaces de filtro sin recargar toda la app.
import Link from "next/link";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el botón/modal para crear trainers.
import { CreateTrainerDialog } from "@/features/admin/components/CreateTrainerDialog";

// Importamos la paginación de trainers.
import { TrainerPagination } from "@/features/admin/components/TrainerPagination";

// Importamos la cabecera visual de la página.
import { TrainersPageHeader } from "@/features/admin/components/TrainersPageHeader";

// Importamos la tabla visual de trainers.
import { TrainersTable } from "@/features/admin/components/TrainersTable";

// Importamos la query que lee trainers reales desde la base de datos.
import { getTrainers } from "@/features/admin/server/get-trainers.query";

type AdminTrainersPageProps = {
  searchParams: Promise<{
    page?: string;
    archived?: string;
  }>;
};

// Esta función convierte page en un número seguro.
function parsePageParam(page?: string) {
  const parsedPage = Number(page);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
}

// Esta página muestra la gestión de trainers del admin.
export default async function AdminTrainersPage({
  searchParams,
}: AdminTrainersPageProps) {
  await requireAdmin();

  const params = await searchParams;

  const page = parsePageParam(params.page);
  const showArchived = params.archived === "true";

  const { trainers, pagination } = await getTrainers({
    page,
    showArchived,
  });

  return (
    <div className="space-y-6">
      <TrainersPageHeader
        totalItems={pagination.totalItems}
        showArchived={showArchived}
      />

      <section className="flex flex-col gap-4 rounded-3xl bg-base-100 p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold">Trainer view</h2>

          <p className="text-sm text-base-content/60">
            Switch between available trainers and archived trainers.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <CreateTrainerDialog />

          <div className="join">
            <Link
              href="/dashboard/admin/trainers?page=1"
              className={
                showArchived
                  ? "btn join-item btn-sm"
                  : "btn join-item btn-sm btn-primary"
              }
            >
              Active
            </Link>

            <Link
              href="/dashboard/admin/trainers?page=1&archived=true"
              className={
                showArchived
                  ? "btn join-item btn-sm btn-primary"
                  : "btn join-item btn-sm"
              }
            >
              Archived
            </Link>
          </div>
        </div>
      </section>

      <TrainersTable trainers={trainers} />

      <TrainerPagination
        pagination={pagination}
        showArchived={showArchived}
      />
    </div>
  );
}