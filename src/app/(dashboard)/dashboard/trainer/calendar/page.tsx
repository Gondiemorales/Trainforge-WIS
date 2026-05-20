import { AppointmentCalendar } from "@/features/appointments/components/AppointmentCalendar";
import { AppointmentPagination } from "@/features/appointments/components/AppointmentPagination";
import { AppointmentsFilters } from "@/features/appointments/components/AppointmentsFilters";
import { AppointmentsTable } from "@/features/appointments/components/AppointmentsTable";
import { CalendarPageHeader } from "@/features/appointments/components/CalendarPageHeader";
import { CreateAppointmentDialog } from "@/features/appointments/components/CreateAppointmentDialog";
import { getAppointmentsForCalendar } from "@/features/appointments/server/get-appointments-for-calendar.query";
import { getClientsForSelect } from "@/features/appointments/server/get-clients-for-select.query";
import { getTrainerAppointments } from "@/features/appointments/server/get-trainer-appointments.query";
import { requireTrainer } from "@/lib/permissions";

type CalendarPageProps = {
  searchParams: Promise<{
    year?: string;
    month?: string;
    page?: string;
    status?: string;
  }>;
};

function parseYear(year?: string) {
  const n = Number(year);
  return Number.isNaN(n) || n < 2000 ? new Date().getFullYear() : n;
}

function parseMonth(month?: string) {
  const n = Number(month);
  return Number.isNaN(n) || n < 1 || n > 12 ? new Date().getMonth() + 1 : n;
}

function parsePage(page?: string) {
  const n = Number(page);
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

export default async function TrainerCalendarPage({ searchParams }: CalendarPageProps) {
  await requireTrainer();

  const params = await searchParams;
  const year = parseYear(params.year);
  const month = parseMonth(params.month);
  const page = parsePage(params.page);
  const status = params.status;

  const [calendarAppointments, { appointments, pagination }, clients] =
    await Promise.all([
      getAppointmentsForCalendar(year, month),
      getTrainerAppointments({ page, status }),
      getClientsForSelect(),
    ]);

  return (
    <div className="space-y-6">
      <CalendarPageHeader totalItems={pagination.totalItems} />

      <AppointmentCalendar
        appointments={calendarAppointments}
        year={year}
        month={month}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <AppointmentsFilters status={status} year={year} month={month} />
        <CreateAppointmentDialog clients={clients} />
      </div>

      <AppointmentsTable appointments={appointments} />

      <AppointmentPagination
        pagination={pagination}
        status={status}
        year={year}
        month={month}
      />
    </div>
  );
}
