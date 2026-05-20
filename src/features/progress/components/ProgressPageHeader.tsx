type ProgressPageHeaderProps = {
  totalItems: number;
};

export function ProgressPageHeader({ totalItems }: ProgressPageHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="badge badge-primary mb-4">Trainer</p>
          <h1 className="text-4xl font-black">Progress</h1>
          <p className="mt-3 max-w-2xl text-base-content/60">
            Track and log client performance per exercise. Monitor weight, reps
            and sets over time to measure progress.
          </p>
        </div>

        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">Total logs</div>
            <div className="stat-value text-primary">{totalItems}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
