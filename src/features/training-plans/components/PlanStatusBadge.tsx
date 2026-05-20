import type { TrainingPlanStatus } from "@/generated/prisma/enums";

type PlanStatusBadgeProps = {
  status: TrainingPlanStatus;
};

const STATUS_CONFIG: Record<TrainingPlanStatus, { label: string; className: string }> = {
  DRAFT: { label: "Draft", className: "badge-ghost" },
  ACTIVE: { label: "Active", className: "badge-success" },
  ARCHIVED: { label: "Archived", className: "badge-error" },
};

export function PlanStatusBadge({ status }: PlanStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span className={["badge badge-outline", config.className].join(" ")}>
      {config.label}
    </span>
  );
}
