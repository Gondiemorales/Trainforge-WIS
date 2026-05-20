import Link from "next/link";

import type { PlanListItem } from "@/features/training-plans/types/training-plan.types";

import { ActivatePlanButton } from "./ActivatePlanButton";
import { ArchivePlanButton } from "./ArchivePlanButton";
import { EditPlanDialog } from "./EditPlanDialog";
import { PlanStatusBadge } from "./PlanStatusBadge";

type PlanTableRowProps = {
  plan: PlanListItem;
};

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));
}

export function PlanTableRow({ plan }: PlanTableRowProps) {
  return (
    <tr>
      <td>
        <div className="font-bold">{plan.title}</div>
        {plan.description ? (
          <div className="mt-1 max-w-xs truncate text-sm text-base-content/60">
            {plan.description}
          </div>
        ) : null}
      </td>

      <td>
        <div className="font-medium">{plan.clientName}</div>
      </td>

      <td>
        <PlanStatusBadge status={plan.status} />
      </td>

      <td>
        <span className="badge badge-ghost">{plan.exerciseCount} exercises</span>
      </td>

      <td>
        <div className="text-sm">
          <div>{formatDate(plan.startDate)}</div>
          {plan.endDate ? <div className="text-base-content/60">→ {formatDate(plan.endDate)}</div> : null}
        </div>
      </td>

      <td>
        <div className="flex flex-wrap justify-end gap-2">
          <Link
            href={`/dashboard/trainer/plans/${plan.id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            View plan
          </Link>

          <EditPlanDialog plan={plan} />

          {plan.status === "DRAFT" ? <ActivatePlanButton planId={plan.id} /> : null}

          {plan.status !== "ARCHIVED" ? <ArchivePlanButton planId={plan.id} /> : null}
        </div>
      </td>
    </tr>
  );
}
