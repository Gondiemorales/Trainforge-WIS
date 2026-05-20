import Link from "next/link";

import type { AppointmentCalendarItem } from "@/features/appointments/types/appointment.types";

import { AppointmentCalendarCell } from "./AppointmentCalendarCell";

type AppointmentCalendarProps = {
  appointments: AppointmentCalendarItem[];
  year: number;
  month: number;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildCalendarGrid(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();

  // getDay() returns 0=Sun...6=Sat, we want 0=Mon...6=Sun
  const startDow = (firstDay.getDay() + 6) % 7;

  const cells: (number | null)[] = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete last week
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

function getPrevMonthHref(year: number, month: number) {
  const d = new Date(year, month - 2, 1);
  return `/dashboard/trainer/calendar?year=${d.getFullYear()}&month=${d.getMonth() + 1}`;
}

function getNextMonthHref(year: number, month: number) {
  const d = new Date(year, month, 1);
  return `/dashboard/trainer/calendar?year=${d.getFullYear()}&month=${d.getMonth() + 1}`;
}

function getAppointmentsForDay(
  appointments: AppointmentCalendarItem[],
  year: number,
  month: number,
  day: number,
) {
  return appointments.filter((a) => {
    const d = new Date(a.startTime);
    return (
      d.getFullYear() === year &&
      d.getMonth() + 1 === month &&
      d.getDate() === day
    );
  });
}

export function AppointmentCalendar({
  appointments,
  year,
  month,
}: AppointmentCalendarProps) {
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;

  const weeks = buildCalendarGrid(year, month);

  return (
    <div className="overflow-hidden rounded-3xl bg-base-100 shadow-md">
      <div className="flex items-center justify-between border-b border-base-200 px-6 py-4">
        <Link href={getPrevMonthHref(year, month)} className="btn btn-sm btn-ghost">
          ← Prev
        </Link>

        <h2 className="text-lg font-bold">
          {MONTH_NAMES[month - 1]} {year}
        </h2>

        <Link href={getNextMonthHref(year, month)} className="btn btn-sm btn-ghost">
          Next →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              {DAY_NAMES.map((d) => (
                <th
                  key={d}
                  className="border border-base-200 bg-base-200/50 py-2 text-center text-xs font-semibold uppercase tracking-wide text-base-content/60"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <AppointmentCalendarCell
                    key={di}
                    day={day}
                    isToday={isCurrentMonth && day === today.getDate()}
                    appointments={
                      day !== null
                        ? getAppointmentsForDay(appointments, year, month, day)
                        : []
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 border-t border-base-200 px-6 py-3 text-xs text-base-content/60">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded bg-info/50" /> Video call
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded bg-success/50" /> In person
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded bg-warning/50" /> Consultation
        </span>
      </div>
    </div>
  );
}
