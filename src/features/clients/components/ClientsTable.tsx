import type { ClientListItem } from "@/features/clients/types/client.types";

import { ClientTableRow } from "./ClientTableRow";

type ClientsTableProps = {
  clients: ClientListItem[];
  archived: boolean;
};

export function ClientsTable({
  clients,
  archived,
}: ClientsTableProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
        <h2 className="text-xl font-bold">
          No {archived ? "archived" : "active"} clients found
        </h2>

        <p className="mt-2 text-base-content/60">
          {archived
            ? "Archived clients will appear here."
            : "Create your first client to start building plans and tracking progress."}
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
              <th>Client</th>
              <th>Goal</th>
              <th>Experience</th>
              <th>Age</th>
              <th>Weight kg</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <ClientTableRow
                key={client.id}
                client={client}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}