type PlansPageHeaderProps = {
  totalItems: number;
  status?: string;
};

function getStatusLabel(status?: string) {
  if (status === "DRAFT") return "Draft plans";
  if (status === "ACTIVE") return "Active plans";
  if (status === "ARCHIVED") return "Archived plans";
  return "Active plans";
}

export function PlansPageHeader({ totalItems, status }: PlansPageHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="badge badge-primary mb-4">Trainer</p>

          <h1 className="text-4xl font-black">Training Plans</h1>

          <p className="mt-3 max-w-2xl text-base-content/60">
            Build and manage personalised training plans for your clients.
            Add exercises with sets, reps and intensity to each plan.
          </p>
        </div>

        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">{getStatusLabel(status)}</div>
            <div className="stat-value text-primary">{totalItems}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
