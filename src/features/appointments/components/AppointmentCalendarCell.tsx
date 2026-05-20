import type { AppointmentCalendarItem } from "@/features/appointments/types/appointment.types";
import type { AppointmentType } from "@/generated/prisma/enums";

type AppointmentCalendarCellProps = {
  day: number | null;
  isToday: boolean;
  appointments: AppointmentCalendarItem[];
};

const TYPE_COLORS: Record<AppointmentType, string> = {
  VIDEO_CALL: "bg-info/20 text-info-content border-info/30",
  IN_PERSON: "bg-success/20 text-success-content border-success/30",
  CONSULTATION: "bg-warning/20 text-warning-content border-warning/30",
};

const STATUS_OPACITY: Record<string, string> = {
  SCHEDULED: "opacity-100",
  COMPLETED: "opacity-50",
  CANCELLED: "opacity-30 line-through",
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

export function AppointmentCalendarCell({
  day,
  isToday,
  appointments,
}: AppointmentCalendarCellProps) {
  if (day === null) {
    return <td className="border border-base-200 bg-base-200/30 p-1" />;
  }

  const visible = appointments.slice(0, 3);
  const overflow = appointments.length - 3;

  return (
    <td className="border border-base-200 p-1 align-top">
      <div
        className={[
          "mb-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold",
          isToday
            ? "bg-primary text-primary-content"
            : "text-base-content",
        ].join(" ")}
      >
        {day}
      </div>

      <div className="space-y-0.5">
        {visible.map((apt) => (
          <div
            key={apt.id}
            className={[
              "rounded border px-1 py-0.5 text-xs leading-tight",
              TYPE_COLORS[apt.type],
              STATUS_OPACITY[apt.status],
            ].join(" ")}
            title={`${apt.title} — ${apt.clientName} (${formatTime(apt.startTime)})`}
          >
            <span className="block truncate font-medium">{formatTime(apt.startTime)} {apt.title}</span>
            <span className="block truncate text-[10px] opacity-70">{apt.clientName}</span>
          </div>
        ))}

        {overflow > 0 ? (
          <p className="pl-1 text-[10px] text-base-content/50">+{overflow} more</p>
        ) : null}
      </div>
    </td>
  );
}
