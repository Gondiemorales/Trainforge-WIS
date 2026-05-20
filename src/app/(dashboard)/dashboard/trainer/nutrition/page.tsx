import { GeneratePlanDialog } from "@/features/nutrition/components/GeneratePlanDialog";
import { NutritionPageHeader } from "@/features/nutrition/components/NutritionPageHeader";
import { NutritionPlanCard } from "@/features/nutrition/components/NutritionPlanCard";
import { NutritionPlansFilters } from "@/features/nutrition/components/NutritionPlansFilters";
import { getClientsForSelect } from "@/features/nutrition/server/get-clients-for-select.query";
import { getTrainerNutritionPlans } from "@/features/nutrition/server/get-trainer-nutrition-plans.query";
import { requireTrainer } from "@/lib/permissions";

type NutritionPageProps = {
  searchParams: Promise<{ status?: string; page?: string }>;
};

export default async function TrainerNutritionPage({ searchParams }: NutritionPageProps) {
  await requireTrainer();

  const params = await searchParams;
  const status = params.status;
  const page = params.page ? Math.max(Number(params.page), 1) : 1;

  const [{ plans, pagination }, clients] = await Promise.all([
    getTrainerNutritionPlans({ status, page }),
    getClientsForSelect(),
  ]);

  return (
    <div className="space-y-6">
      <NutritionPageHeader totalItems={pagination.totalItems} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <NutritionPlansFilters status={status} />
        <GeneratePlanDialog clients={clients} />
      </div>

      {plans.length === 0 ? (
        <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
          <h2 className="text-xl font-bold">No nutrition plans found</h2>
          <p className="mt-2 text-base-content/60">
            Generate your first AI-powered meal plan using the button above.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <NutritionPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 ? (
        <div className="flex justify-center gap-2">
          {page > 1 ? (
            <a
              href={`/dashboard/trainer/nutrition?page=${page - 1}${status ? `&status=${status}` : ""}`}
              className="btn btn-ghost"
            >
              Previous
            </a>
          ) : null}
          <span className="btn btn-ghost pointer-events-none">
            {page} / {pagination.totalPages}
          </span>
          {page < pagination.totalPages ? (
            <a
              href={`/dashboard/trainer/nutrition?page=${page + 1}${status ? `&status=${status}` : ""}`}
              className="btn btn-ghost"
            >
              Next
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
