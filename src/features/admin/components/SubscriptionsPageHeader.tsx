// Este tipo define los datos que necesita la cabecera.
type SubscriptionsPageHeaderProps = {
  totalItems: number;
  showArchived: boolean;
};

// Este componente muestra la cabecera de la página de suscripciones.
// Incluye título, descripción y contador de resultados.
export function SubscriptionsPageHeader({
  totalItems,
  showArchived,
}: SubscriptionsPageHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Texto principal de la página */}
        <div>
          <p className="badge badge-primary mb-4">Admin</p>

          <h1 className="text-4xl font-black">
            Subscriptions
          </h1>

          <p className="mt-3 max-w-2xl text-base-content/60">
            Create, review, edit and archive SaaS subscriptions for personal
            trainers on TrainForge.
          </p>
        </div>

        {/* Contador de registros */}
        <div className="rounded-2xl border border-base-300 bg-base-200 px-5 py-4">
          <p className="text-sm text-base-content/60">
            {showArchived ? "Archived results" : "Active results"}
          </p>

          <p className="mt-1 text-3xl font-black">
            {totalItems}
          </p>
        </div>
      </div>
    </section>
  );
}