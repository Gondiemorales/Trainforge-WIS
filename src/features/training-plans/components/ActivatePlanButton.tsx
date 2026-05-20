"use client";

import { useActionState } from "react";

import { updatePlanStatusAction } from "@/features/training-plans/server/update-plan-status.action";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";

const INITIAL_STATE: PlanFormState = { success: false, message: "" };

export function ActivatePlanButton({ planId }: { planId: string }) {
  const [state, formAction] = useActionState(updatePlanStatusAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-1">
      <input type="hidden" name="planId" value={planId} />
      <input type="hidden" name="status" value="ACTIVE" />
      <button type="submit" className="btn btn-sm btn-success btn-outline">
        Activate
      </button>
      {state.message && !state.success ? (
        <p className="text-xs text-error">{state.message}</p>
      ) : null}
    </form>
  );
}
