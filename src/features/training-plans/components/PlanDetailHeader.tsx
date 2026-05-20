import Link from "next/link";

import type { PlanDetail } from "@/features/training-plans/types/training-plan.types";

import { ActivatePlanButton } from "./ActivatePlanButton";
import { ArchivePlanButton } from "./ArchivePlanButton";
import { PlanStatusBadge } from "./PlanStatusBadge";

type PlanDetailHeaderProps = {
  plan: PlanDetail;
};

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));
}

export function PlanDetailHeader({ plan }: PlanDetailHeaderProps) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="mb-4">
        <Link href="/dashboard/trainer/plans" className="btn btn-sm btn-ghost">
          ← Back to plans
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="badge badge-primary">Trainer</p>
            <PlanStatusBadge status={plan.status} />
          </div>

          <h1 className="mt-4 text-4xl font-black">{plan.title}</h1>

          <p className="mt-2 text-lg text-base-content/70">
            Client: <span className="font-semibold">{plan.clientName}</span>
          </p>

          {plan.description ? (
            <p className="mt-3 max-w-2xl text-base-content/60">{plan.description}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-base-content/60">
            <span>Start: {formatDate(plan.startDate)}</span>
            <span>End: {formatDate(plan.endDate)}</span>
            <span>{plan.exercises.length} exercises</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {plan.status === "DRAFT" ? <ActivatePlanButton planId={plan.id} /> : null}
          {plan.status !== "ARCHIVED" ? <ArchivePlanButton planId={plan.id} /> : null}
        </div>
      </div>
    </section>
  );
}
