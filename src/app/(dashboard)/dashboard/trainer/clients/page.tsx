import { CreateClientDialog } from "@/features/clients/components/CreateClientDialog";
import { ClientPagination } from "@/features/clients/components/ClientPagination";
import { ClientsFilters } from "@/features/clients/components/ClientsFilters";
import { ClientsPageHeader } from "@/features/clients/components/ClientsPageHeader";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import { getTrainerClients } from "@/features/clients/server/get-trainer-clients.query";
import { requireTrainer } from "@/lib/permissions";

type TrainerClientsPageProps = {
  searchParams: Promise<{
    page?: string;
    archived?: string;
  }>;
};

function parsePage(page?: string) {
  if (!page) {
    return 1;
  }

  const parsedPage = Number(page);

  if (Number.isNaN(parsedPage)) {
    return 1;
  }

  return Math.max(parsedPage, 1);
}

function parseArchived(archived?: string) {
  return archived === "true";
}

export default async function TrainerClientsPage({
  searchParams,
}: TrainerClientsPageProps) {
  await requireTrainer();

  const params = await searchParams;
  const page = parsePage(params.page);
  const archived = parseArchived(params.archived);

  const { clients, pagination } = await getTrainerClients({
    page,
    archived,
  });

  return (
    <div className="space-y-6">
      <ClientsPageHeader
        totalItems={pagination.totalItems}
        archived={archived}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ClientsFilters archived={archived} />

        {!archived ? <CreateClientDialog /> : null}
      </div>

      <ClientsTable clients={clients} archived={archived} />

      <ClientPagination
        pagination={pagination}
        archived={archived}
      />
    </div>
  );
}