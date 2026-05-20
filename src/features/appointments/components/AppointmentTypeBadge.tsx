import type { AppointmentType } from "@/generated/prisma/enums";

const CONFIG: Record<AppointmentType, { label: string; className: string }> = {
  VIDEO_CALL: { label: "Video call", className: "badge-info" },
  IN_PERSON: { label: "In person", className: "badge-success" },
  CONSULTATION: { label: "Consultation", className: "badge-warning" },
};

export function AppointmentTypeBadge({ type }: { type: AppointmentType }) {
  const c = CONFIG[type];
  return <span className={["badge badge-outline", c.className].join(" ")}>{c.label}</span>;
}
