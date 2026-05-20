import Link from "next/link";

type PlansFiltersProps = {
  status?: string;
};

const FILTERS = [
  { value: "", label: "All active" },
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Active" },
  { value: "ARCHIVED", label: "Archived" },
];

function buildHref(status: string) {
  if (!status) return "/dashboard/trainer/plans";
  return `/dashboard/trainer/plans?status=${status}`;
}

export function PlansFilters({ status }: PlansFiltersProps) {
  const current = status ?? "";

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-bold">Plan status</h2>
        <p className="text-sm text-base-content/60">Filter plans by their current status.</p>
      </div>

      <div className="join">
        {FILTERS.map((filter) => (
          <Link
            key={filter.value}
            href={buildHref(filter.value)}
            className={[
              "btn join-item",
              current === filter.value ? "btn-primary" : "btn-ghost",
            ].join(" ")}
          >
            {filter.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
