type TrainersPageHeaderProps = {
  totalItems: number;
  showArchived: boolean;
};

// Este componente muestra la cabecera principal de la página de trainers.
export function TrainersPageHeader({
  totalItems,
  showArchived,
}: TrainersPageHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="badge badge-primary mb-4">Admin</p>

          <h1 className="text-4xl font-black">Trainers</h1>

          <p className="mt-3 max-w-2xl text-base-content/60">
            Create, review, edit, archive and restore personal trainer accounts
            on TrainForge.
          </p>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-200 px-5 py-4">
          <p className="text-sm text-base-content/60">
            {showArchived ? "Archived trainers" : "Active trainers"}
          </p>

          <p className="mt-1 text-3xl font-black">{totalItems}</p>
        </div>
      </div>
    </section>
  );
}