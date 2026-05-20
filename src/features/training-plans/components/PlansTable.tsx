import type { PlanListItem } from "@/features/training-plans/types/training-plan.types";

import { PlanTableRow } from "./PlanTableRow";

type PlansTableProps = {
  plans: PlanListItem[];
  status?: string;
};

function getEmptyMessage(status?: string) {
  if (status === "ARCHIVED") return "No archived plans found.";
  if (status === "DRAFT") return "No draft plans found. Create a new plan to get started.";
  if (status === "ACTIVE") return "No active plans found. Activate a draft plan to see it here.";
  return "No plans found. Create your first training plan.";
}

export function PlansTable({ plans, status }: PlansTableProps) {
  if (plans.length === 0) {
    return (
      <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
        <h2 className="text-xl font-bold">No plans found</h2>
        <p className="mt-2 text-base-content/60">{getEmptyMessage(status)}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-base-100 shadow-md">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Client</th>
              <th>Status</th>
              <th>Exercises</th>
              <th>Dates</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <PlanTableRow key={plan.id} plan={plan} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
