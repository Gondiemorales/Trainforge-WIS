import type { GeneratedMealPlan } from "@/features/nutrition/types/nutrition.types";

import { NutritionDayCard } from "./NutritionDayCard";

export function NutritionPlanMealsView({ meals }: { meals: GeneratedMealPlan }) {
  const avg = meals.weeklyAverage;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Avg. calories", value: `${avg.calories} kcal`, color: "text-primary" },
          { label: "Avg. protein", value: `${avg.protein}g`, color: "text-success" },
          { label: "Avg. carbs", value: `${avg.carbs}g`, color: "text-warning" },
          { label: "Avg. fat", value: `${avg.fat}g`, color: "text-info" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-base-100 p-4 shadow-sm text-center">
            <p className="text-xs text-base-content/50">{stat.label}</p>
            <p className={["mt-1 text-xl font-black", stat.color].join(" ")}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {meals.days.map((day, i) => (
          <NutritionDayCard key={i} day={day} />
        ))}
      </div>
    </div>
  );
}
