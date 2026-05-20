import Link from "next/link";

type ClientsFiltersProps = {
  archived: boolean;
};

export function ClientsFilters({ archived }: ClientsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="font-bold">Client status</h2>

        <p className="text-sm text-base-content/60">
          Switch between active and archived clients.
        </p>
      </div>

      <div className="join">
        <Link
          href="/dashboard/trainer/clients"
          className={[
            "btn join-item",
            !archived ? "btn-primary" : "btn-ghost",
          ].join(" ")}
        >
          Active
        </Link>

        <Link
          href="/dashboard/trainer/clients?archived=true"
          className={[
            "btn join-item",
            archived ? "btn-primary" : "btn-ghost",
          ].join(" ")}
        >
          Archived
        </Link>
      </div>
    </div>
  );
}