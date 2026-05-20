import { CreatePlanDialog } from "@/features/training-plans/components/CreatePlanDialog";
import { PlanPagination } from "@/features/training-plans/components/PlanPagination";
import { PlansFilters } from "@/features/training-plans/components/PlansFilters";
import { PlansPageHeader } from "@/features/training-plans/components/PlansPageHeader";
import { PlansTable } from "@/features/training-plans/components/PlansTable";
import { getClientsForSelect } from "@/features/training-plans/server/get-clients-for-select.query";
import { getTrainerPlans } from "@/features/training-plans/server/get-trainer-plans.query";
import { requireTrainer } from "@/lib/permissions";

type TrainerPlansPageProps = {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
};

function parsePage(page?: string) {
  if (!page) return 1;
  const parsed = Number(page);
  if (Number.isNaN(parsed)) return 1;
  return Math.max(parsed, 1);
}

export default async function TrainerPlansPage({ searchParams }: TrainerPlansPageProps) {
  await requireTrainer();

  const params = await searchParams;
  const page = parsePage(params.page);
  const status = params.status;

  const [{ plans, pagination }, clients] = await Promise.all([
    getTrainerPlans({ page, status }),
    getClientsForSelect(),
  ]);

  const showCreateButton = status !== "ARCHIVED";

  return (
    <div className="space-y-6">
      <PlansPageHeader totalItems={pagination.totalItems} status={status} />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <PlansFilters status={status} />
        {showCreateButton ? <CreatePlanDialog clients={clients} /> : null}
      </div>

      <PlansTable plans={plans} status={status} />

      <PlanPagination pagination={pagination} status={status} />
    </div>
  );
}
