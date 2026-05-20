import type { AppointmentListItem } from "@/features/appointments/types/appointment.types";

import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { AppointmentTypeBadge } from "./AppointmentTypeBadge";
import { CancelAppointmentButton } from "./CancelAppointmentButton";
import { CompleteAppointmentButton } from "./CompleteAppointmentButton";
import { EditAppointmentDialog } from "./EditAppointmentDialog";

type AppointmentTableRowProps = { appointment: AppointmentListItem };

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function AppointmentTableRow({ appointment }: AppointmentTableRowProps) {
  const isScheduled = appointment.status === "SCHEDULED";

  return (
    <tr>
      <td>
        <div className="font-bold">{appointment.title}</div>
        {appointment.meetingUrl ? (
          <a href={appointment.meetingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate text-xs text-info underline">
            {appointment.meetingUrl}
          </a>
        ) : null}
        {appointment.location ? (
          <div className="mt-1 text-xs text-base-content/60">{appointment.location}</div>
        ) : null}
      </td>

      <td>{appointment.clientName}</td>

      <td><AppointmentTypeBadge type={appointment.type} /></td>

      <td><AppointmentStatusBadge status={appointment.status} /></td>

      <td>
        <div className="text-sm">{formatDateTime(appointment.startTime)}</div>
        <div className="text-xs text-base-content/60">→ {formatDateTime(appointment.endTime)}</div>
      </td>

      <td>
        <div className="flex flex-wrap justify-end gap-2">
          <EditAppointmentDialog appointment={appointment} />
          {isScheduled ? <CompleteAppointmentButton appointmentId={appointment.id} /> : null}
          {isScheduled ? <CancelAppointmentButton appointmentId={appointment.id} /> : null}
        </div>
      </td>
    </tr>
  );
}
