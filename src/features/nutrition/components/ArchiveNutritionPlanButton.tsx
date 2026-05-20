"use client";

import { useActionState } from "react";

import { updateNutritionStatusAction } from "@/features/nutrition/server/update-nutrition-status.action";
import type { NutritionFormState } from "@/features/nutrition/types/nutrition.types";

const INITIAL_STATE: NutritionFormState = { success: false, message: "" };

export function ArchiveNutritionPlanButton({ planId }: { planId: string }) {
  const [state, formAction] = useActionState(updateNutritionStatusAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-1">
      <input type="hidden" name="planId" value={planId} />
      <input type="hidden" name="status" value="ARCHIVED" />
      <button type="submit" className="btn btn-error btn-outline">
        Archive plan
      </button>
      {state.message && !state.success ? (
        <p className="text-xs text-error">{state.message}</p>
      ) : null}
    </form>
  );
}
