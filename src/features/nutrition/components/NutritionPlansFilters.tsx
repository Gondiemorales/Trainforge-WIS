import Link from "next/link";

const FILTERS = [
  { value: "", label: "All" },
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

export function NutritionPlansFilters({ status }: { status?: string }) {
  const current = status ?? "";

  return (
    <div className="join">
      {FILTERS.map((f) => (
        <Link
          key={f.value}
          href={f.value ? `/dashboard/trainer/nutrition?status=${f.value}` : "/dashboard/trainer/nutrition"}
          className={["btn join-item", current === f.value ? "btn-primary" : "btn-ghost"].join(" ")}
        >
          {f.label}
        </Link>
      ))}
    </div>
  );
}
