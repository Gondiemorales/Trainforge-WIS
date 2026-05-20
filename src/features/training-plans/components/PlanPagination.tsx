import Link from "next/link";

import type { PlanPagination as Pagination } from "@/features/training-plans/types/training-plan.types";

type PlanPaginationProps = {
  pagination: Pagination;
  status?: string;
};

function getPageHref(page: number, status?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (status) params.set("status", status);
  const query = params.toString();
  return query ? `/dashboard/trainer/plans?${query}` : "/dashboard/trainer/plans";
}

export function PlanPagination({ pagination, status }: PlanPaginationProps) {
  const hasPrevious = pagination.page > 1;
  const hasNext = pagination.page < pagination.totalPages;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-base-content/60">
        Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} total plans
      </p>

      <div className="join">
        <Link
          href={getPageHref(pagination.page - 1, status)}
          aria-disabled={!hasPrevious}
          className={["btn join-item", !hasPrevious ? "btn-disabled" : ""].join(" ")}
        >
          Previous
        </Link>
        <Link
          href={getPageHref(pagination.page + 1, status)}
          aria-disabled={!hasNext}
          className={["btn join-item", !hasNext ? "btn-disabled" : ""].join(" ")}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
