"use client";

import { useActionState } from "react";

import { removePlanExerciseAction } from "@/features/training-plans/server/remove-plan-exercise.action";
import type { PlanFormState } from "@/features/training-plans/types/training-plan.types";

const INITIAL_STATE: PlanFormState = { success: false, message: "" };

export function RemovePlanExerciseButton({ planExerciseId }: { planExerciseId: string }) {
  const [state, formAction] = useActionState(removePlanExerciseAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-1">
      <input type="hidden" name="planExerciseId" value={planExerciseId} />
      <button type="submit" className="btn btn-xs btn-error btn-outline">
        Remove
      </button>
      {state.message && !state.success ? (
        <p className="text-xs text-error">{state.message}</p>
      ) : null}
    </form>
  );
}
