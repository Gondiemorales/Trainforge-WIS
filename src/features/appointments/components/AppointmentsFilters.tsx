import Link from "next/link";

type AppointmentsFiltersProps = {
  status?: string;
  year: number;
  month: number;
};

const FILTERS = [
  { value: "", label: "All" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function buildHref(status: string, year: number, month: number) {
  const params = new URLSearchParams();
  params.set("year", String(year));
  params.set("month", String(month));
  if (status) params.set("status", status);
  return `/dashboard/trainer/calendar?${params.toString()}`;
}

export function AppointmentsFilters({ status, year, month }: AppointmentsFiltersProps) {
  const current = status ?? "";

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-bold">Appointments</h2>
        <p className="text-sm text-base-content/60">Filter by status.</p>
      </div>

      <div className="join">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={buildHref(f.value, year, month)}
            className={["btn join-item", current === f.value ? "btn-primary" : "btn-ghost"].join(" ")}
          >
            {f.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
