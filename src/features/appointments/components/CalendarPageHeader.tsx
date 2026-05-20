type CalendarPageHeaderProps = {
  totalItems: number;
};

export function CalendarPageHeader({ totalItems }: CalendarPageHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="badge badge-primary mb-4">Trainer</p>
          <h1 className="text-4xl font-black">Calendar</h1>
          <p className="mt-3 max-w-2xl text-base-content/60">
            Schedule and manage client appointments. View your month at a glance
            and track sessions below.
          </p>
        </div>

        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">Total appointments</div>
            <div className="stat-value text-primary">{totalItems}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
