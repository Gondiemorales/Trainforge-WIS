import type { AppointmentListItem } from "@/features/appointments/types/appointment.types";

import { AppointmentTableRow } from "./AppointmentTableRow";

type AppointmentsTableProps = {
  appointments: AppointmentListItem[];
};

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
        <h2 className="text-xl font-bold">No appointments found</h2>
        <p className="mt-2 text-base-content/60">
          Schedule your first appointment using the button above.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-base-100 shadow-md">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Appointment</th>
              <th>Client</th>
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <AppointmentTableRow key={a.id} appointment={a} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
