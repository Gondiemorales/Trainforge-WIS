import type { AppointmentStatus } from "@/generated/prisma/enums";

const CONFIG: Record<AppointmentStatus, { label: string; className: string }> = {
  SCHEDULED: { label: "Scheduled", className: "badge-primary" },
  COMPLETED: { label: "Completed", className: "badge-success" },
  CANCELLED: { label: "Cancelled", className: "badge-error" },
};

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  const c = CONFIG[status];
  return <span className={["badge badge-outline", c.className].join(" ")}>{c.label}</span>;
}
