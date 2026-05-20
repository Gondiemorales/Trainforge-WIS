import Link from "next/link";

import type { ClientOverview } from "@/features/progress/server/get-client-overview.query";

const STATUS_CLASSES: Record<string, string> = {
  DRAFT: "badge-ghost",
  PUBLISHED: "badge-success",
  ARCHIVED: "badge-error",
};

const CALORIC_LABELS: Record<string, string> = {
  DEFICIT: "Fat loss",
  MAINTENANCE: "Maintenance",
  SURPLUS: "Muscle gain",
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(d));
}

export function ClientNutritionSection({
  plans,
}: {
  plans: ClientOverview["nutritionPlans"];
}) {
  return (
    <div className="rounded-3xl bg-base-100 p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nutrition Plans</h2>
        <span className="badge badge-ghost">{plans.length} total</span>
      </div>

      {plans.length === 0 ? (
        <p className="mt-4 text-sm text-base-content/50">No nutrition plans yet.</p>
      ) : (
        <div className="mt-4 space-y-2">
          {plans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between rounded-xl bg-base-200 p-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{plan.title}</span>
                  <span className={["badge badge-outline badge-sm", STATUS_CLASSES[plan.status] ?? ""].join(" ")}>
                    {plan.status.charAt(0) + plan.status.slice(1).toLowerCase()}
                  </span>
                </div>
                <p className="text-xs text-base-content/50">
                  {CALORIC_LABELS[plan.caloricGoal] ?? plan.caloricGoal} · {formatDate(plan.createdAt)}
                </p>
              </div>
              <Link href={`/dashboard/trainer/nutrition/${plan.id}`} className="btn btn-xs btn-outline">
                Open
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
