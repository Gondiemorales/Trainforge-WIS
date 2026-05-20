import { NutritionPlanDetailHeader } from "@/features/nutrition/components/NutritionPlanDetailHeader";
import { NutritionPlanMealsView } from "@/features/nutrition/components/NutritionPlanMealsView";
import { getNutritionPlanDetail } from "@/features/nutrition/server/get-nutrition-plan-detail.query";
import { requireTrainer } from "@/lib/permissions";

type NutritionPlanDetailPageProps = {
  params: Promise<{ planId: string }>;
};

export default async function NutritionPlanDetailPage({ params }: NutritionPlanDetailPageProps) {
  await requireTrainer();

  const { planId } = await params;
  const plan = await getNutritionPlanDetail(planId);

  return (
    <div className="space-y-6">
      <NutritionPlanDetailHeader plan={plan} />

      <div>
        <h2 className="mb-4 text-xl font-bold">7-day meal plan</h2>
        <NutritionPlanMealsView meals={plan.meals} />
      </div>
    </div>
  );
}
