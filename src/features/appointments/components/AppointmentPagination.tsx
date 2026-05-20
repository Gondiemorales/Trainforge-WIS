import Link from "next/link";

import type { AppointmentPagination as Pagination } from "@/features/appointments/types/appointment.types";

type AppointmentPaginationProps = {
  pagination: Pagination;
  status?: string;
  year: number;
  month: number;
};

function getPageHref(page: number, status: string | undefined, year: number, month: number) {
  const params = new URLSearchParams();
  params.set("year", String(year));
  params.set("month", String(month));
  if (page > 1) params.set("page", String(page));
  if (status) params.set("status", status);
  return `/dashboard/trainer/calendar?${params.toString()}`;
}

export function AppointmentPagination({ pagination, status, year, month }: AppointmentPaginationProps) {
  const hasPrev = pagination.page > 1;
  const hasNext = pagination.page < pagination.totalPages;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-base-content/60">
        Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} total appointments
      </p>
      <div className="join">
        <Link
          href={getPageHref(pagination.page - 1, status, year, month)}
          aria-disabled={!hasPrev}
          className={["btn join-item", !hasPrev ? "btn-disabled" : ""].join(" ")}
        >
          Previous
        </Link>
        <Link
          href={getPageHref(pagination.page + 1, status, year, month)}
          aria-disabled={!hasNext}
          className={["btn join-item", !hasNext ? "btn-disabled" : ""].join(" ")}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
