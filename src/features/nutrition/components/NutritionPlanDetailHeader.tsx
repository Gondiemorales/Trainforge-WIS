import Link from "next/link";

import type { NutritionPlanDetail } from "@/features/nutrition/types/nutrition.types";

import { ArchiveNutritionPlanButton } from "./ArchiveNutritionPlanButton";
import { NutritionStatusBadge } from "./NutritionStatusBadge";
import { PublishPlanButton } from "./PublishPlanButton";

const CALORIC_LABELS: Record<string, string> = {
  DEFICIT: "Fat loss (deficit)",
  MAINTENANCE: "Maintenance",
  SURPLUS: "Muscle gain (surplus)",
};

export function NutritionPlanDetailHeader({ plan }: { plan: NutritionPlanDetail }) {
  const macros = plan.macroSplit;

  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="mb-4">
        <Link href="/dashboard/trainer/nutrition" className="btn btn-sm btn-ghost">
          ← Back to plans
        </Link>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="badge badge-primary">AI Generated</p>
            <NutritionStatusBadge status={plan.status} />
          </div>

          <h1 className="mt-4 text-4xl font-black">{plan.title}</h1>
          <p className="mt-2 text-lg text-base-content/70">
            Client: <span className="font-semibold">{plan.clientName}</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-base-content/60">
            <span>Goal: <strong>{CALORIC_LABELS[plan.caloricGoal] ?? plan.caloricGoal}</strong></span>
            {macros ? (
              <span>
                Macros: <strong>{macros.protein}%P / {macros.carbs}%C / {macros.fat}%F</strong>
              </span>
            ) : null}
            {plan.allergies ? <span>Allergies: {plan.allergies}</span> : null}
            {plan.dietaryPreferences ? <span>Diet: {plan.dietaryPreferences}</span> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {plan.status === "DRAFT" ? <PublishPlanButton planId={plan.id} /> : null}
          {plan.status !== "ARCHIVED" ? <ArchiveNutritionPlanButton planId={plan.id} /> : null}
        </div>
      </div>

      {plan.meals.summary ? (
        <div className="mt-6 rounded-2xl bg-base-200 p-4">
          <p className="text-sm font-semibold text-base-content/70">AI Summary</p>
          <p className="mt-1 text-sm text-base-content">{plan.meals.summary}</p>
        </div>
      ) : null}

      <div className="mt-4 rounded-2xl border border-warning/30 bg-warning/10 p-4">
        <p className="text-sm text-warning-content">
          <strong>⚠ Important disclaimer:</strong> This nutrition plan was generated with AI assistance
          and reviewed by your trainer. It is not a substitute for advice from a licensed nutritionist
          or dietitian. Consult a qualified health professional before making significant dietary changes,
          especially if you have pre-existing medical conditions.
        </p>
      </div>
    </section>
  );
}
