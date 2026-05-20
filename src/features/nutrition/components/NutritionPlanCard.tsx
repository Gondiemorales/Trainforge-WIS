import Link from "next/link";

import type { NutritionPlanListItem } from "@/features/nutrition/types/nutrition.types";

import { NutritionStatusBadge } from "./NutritionStatusBadge";

const CALORIC_GOAL_LABELS: Record<string, string> = {
  DEFICIT: "Fat loss",
  MAINTENANCE: "Maintenance",
  SURPLUS: "Muscle gain",
};

const CALORIC_GOAL_COLORS: Record<string, string> = {
  DEFICIT: "text-info",
  MAINTENANCE: "text-success",
  SURPLUS: "text-warning",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));
}

export function NutritionPlanCard({ plan }: { plan: NutritionPlanListItem }) {
  return (
    <div className="flex flex-col rounded-3xl bg-base-100 p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold leading-tight">{plan.title}</h3>
          <p className="mt-1 text-sm text-base-content/60">{plan.clientName}</p>
        </div>
        <NutritionStatusBadge status={plan.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={["badge badge-outline text-xs font-semibold", CALORIC_GOAL_COLORS[plan.caloricGoal]].join(" ")}>
          {CALORIC_GOAL_LABELS[plan.caloricGoal] ?? plan.caloricGoal}
        </span>

        {plan.dietaryPreferences ? (
          <span className="badge badge-ghost text-xs">{plan.dietaryPreferences}</span>
        ) : null}

        {plan.allergies ? (
          <span className="badge badge-ghost badge-outline text-xs">
            ⚠ {plan.allergies}
          </span>
        ) : null}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-xs text-base-content/50">
          <span>Generated {formatDate(plan.createdAt)}</span>
          {plan.publishedAt ? (
            <span>Published {formatDate(plan.publishedAt)}</span>
          ) : null}
        </div>

        <Link
          href={`/dashboard/trainer/nutrition/${plan.id}`}
          className="btn btn-sm btn-outline mt-3 w-full"
        >
          View plan
        </Link>
      </div>
    </div>
  );
}
