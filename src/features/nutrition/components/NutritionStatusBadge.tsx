import type { NutritionPlanStatus } from "@/generated/prisma/enums";

const CONFIG: Record<NutritionPlanStatus, { label: string; className: string }> = {
  DRAFT: { label: "Draft", className: "badge-ghost" },
  PUBLISHED: { label: "Published", className: "badge-success" },
  ARCHIVED: { label: "Archived", className: "badge-error" },
};

export function NutritionStatusBadge({ status }: { status: NutritionPlanStatus }) {
  const c = CONFIG[status];
  return <span className={["badge badge-outline", c.className].join(" ")}>{c.label}</span>;
}
