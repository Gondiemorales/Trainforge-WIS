import { AddExerciseToPlanForm } from "@/features/training-plans/components/AddExerciseToPlanForm";
import { PlanDetailExercisesList } from "@/features/training-plans/components/PlanDetailExercisesList";
import { PlanDetailHeader } from "@/features/training-plans/components/PlanDetailHeader";
import { getExercisesForSelect } from "@/features/training-plans/server/get-exercises-for-select.query";
import { getPlanDetail } from "@/features/training-plans/server/get-plan-detail.query";
import { requireTrainer } from "@/lib/permissions";

type PlanDetailPageProps = {
  params: Promise<{ planId: string }>;
};

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  await requireTrainer();

  const { planId } = await params;

  const [plan, exercises] = await Promise.all([
    getPlanDetail(planId),
    getExercisesForSelect(),
  ]);

  const canAddExercises = plan.status !== "ARCHIVED";

  return (
    <div className="space-y-6">
      <PlanDetailHeader plan={plan} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-base-200/60 px-4 py-3">
            <h2 className="font-bold">
              Exercises in this plan ({plan.exercises.length})
            </h2>
          </div>

          <PlanDetailExercisesList plan={plan} />
        </div>

        {canAddExercises ? (
          <div className="lg:col-span-1">
            <AddExerciseToPlanForm planId={plan.id} exercises={exercises} />
          </div>
        ) : (
          <div className="lg:col-span-1">
            <div className="rounded-3xl bg-base-100 p-6 shadow-md text-center">
              <p className="text-base-content/60 text-sm">
                This plan is archived. No changes can be made.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
