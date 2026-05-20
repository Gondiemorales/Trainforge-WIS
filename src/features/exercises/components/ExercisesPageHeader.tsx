type ExercisesPageHeaderProps = {
  totalItems: number;
  archived: boolean;
};

export function ExercisesPageHeader({ totalItems, archived }: ExercisesPageHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="badge badge-primary mb-4">Trainer</p>

          <h1 className="text-4xl font-black">Exercises</h1>

          <p className="mt-3 max-w-2xl text-base-content/60">
            Manage your exercise catalogue. Global exercises are visible to all trainers.
            Custom exercises are private to your account.
          </p>
        </div>

        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">
              {archived ? "Archived exercises" : "Active exercises"}
            </div>

            <div className="stat-value text-primary">{totalItems}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
