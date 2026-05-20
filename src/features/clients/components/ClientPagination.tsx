import Link from "next/link";

import type { ClientPagination as Pagination } from "@/features/clients/types/client.types";

type ClientPaginationProps = {
  pagination: Pagination;
  archived: boolean;
};

function getPageHref(page: number, archived: boolean) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (archived) {
    params.set("archived", "true");
  }

  const query = params.toString();

  return query
    ? `/dashboard/trainer/clients?${query}`
    : "/dashboard/trainer/clients";
}

export function ClientPagination({
  pagination,
  archived,
}: ClientPaginationProps) {
  const hasPrevious = pagination.page > 1;
  const hasNext = pagination.page < pagination.totalPages;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-base-content/60">
        Page {pagination.page} of {pagination.totalPages} ·{" "}
        {pagination.totalItems} total clients
      </p>

      <div className="join">
        <Link
          href={getPageHref(pagination.page - 1, archived)}
          aria-disabled={!hasPrevious}
          className={[
            "btn join-item",
            !hasPrevious ? "btn-disabled" : "",
          ].join(" ")}
        >
          Previous
        </Link>

        <Link
          href={getPageHref(pagination.page + 1, archived)}
          aria-disabled={!hasNext}
          className={[
            "btn join-item",
            !hasNext ? "btn-disabled" : "",
          ].join(" ")}
        >
          Next
        </Link>
      </div>
    </div>
  );
}