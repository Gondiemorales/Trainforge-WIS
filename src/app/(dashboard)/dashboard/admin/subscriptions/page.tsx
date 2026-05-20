// Importamos Link para crear enlaces de filtro sin recargar toda la app.
import Link from "next/link";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos la query que lee suscripciones reales desde la base de datos.
import { getSubscriptions } from "@/features/admin/server/get-subscriptions.query";

// Importamos la query que lee trainers para el formulario.
import { getTrainersForSubscription } from "@/features/admin/server/get-trainers-for-subscription.query";

// Importamos la cabecera visual de la página.
import { SubscriptionsPageHeader } from "@/features/admin/components/SubscriptionsPageHeader";

// Importamos el botón/modal para crear suscripciones.
import { CreateSubscriptionDialog } from "@/features/admin/components/CreateSubscriptionDialog";

// Importamos la tabla visual de suscripciones.
import { SubscriptionsTable } from "@/features/admin/components/SubscriptionsTable";

// Importamos la paginación de suscripciones.
import { SubscriptionPagination } from "@/features/admin/components/SubscriptionPagination";

type AdminSubscriptionsPageProps = {
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

// Esta página muestra la gestión de suscripciones del admin.
export default async function AdminSubscriptionsPage({
  searchParams,
}: AdminSubscriptionsPageProps) {
  // Comprobamos que el usuario actual sea ADMIN.
  await requireAdmin();

  // Leemos los parámetros de la URL.
  const params = await searchParams;

  // Convertimos los query params en filtros seguros.
  const page = parsePageParam(params.page);
  const showArchived = params.archived === "true";

  // Leemos suscripciones reales con paginación.
  const { subscriptions, pagination } = await getSubscriptions({
    page,
    showArchived,
  });

  // Leemos trainers activos para el formulario.
  const trainers = await getTrainersForSubscription();

  return (
    <div className="space-y-6">
      {/* Cabecera de la página */}
      <SubscriptionsPageHeader
        totalItems={pagination.totalItems}
        showArchived={showArchived}
      />

      {/* Filtros y botón para crear suscripción */}
      <section className="flex flex-col gap-4 rounded-3xl bg-base-100 p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold">Subscription view</h2>

          <p className="text-sm text-base-content/60">
            Switch between active subscriptions and archived subscriptions.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          {/* Botón que abre el modal de crear suscripción */}
          <CreateSubscriptionDialog trainers={trainers} />

          <div className="join">
            <Link
              href="/dashboard/admin/subscriptions?page=1"
              className={
                showArchived
                  ? "btn join-item btn-sm"
                  : "btn join-item btn-sm btn-primary"
              }
            >
              Active
            </Link>

            <Link
              href="/dashboard/admin/subscriptions?page=1&archived=true"
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

      {/* Tabla de suscripciones */}
      <SubscriptionsTable subscriptions={subscriptions} />

      {/* Paginación */}
      <SubscriptionPagination
        pagination={pagination}
        showArchived={showArchived}
      />
    </div>
  );
}