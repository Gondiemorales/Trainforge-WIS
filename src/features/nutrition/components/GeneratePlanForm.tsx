"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { generateNutritionPlanAction } from "@/features/nutrition/server/generate-nutrition-plan.action";
import type { NutritionFormState } from "@/features/nutrition/types/nutrition.types";
import { CaloricGoal } from "@/generated/prisma/enums";

import { GeneratePlanSubmitButton } from "./GeneratePlanSubmitButton";

const DIALOG_ID = "generate-plan-dialog";
const INITIAL_STATE: NutritionFormState = { success: false, message: "" };

const CALORIC_OPTIONS = [
  [CaloricGoal.DEFICIT, "Fat loss (caloric deficit)"],
  [CaloricGoal.MAINTENANCE, "Maintenance (maintain weight)"],
  [CaloricGoal.SURPLUS, "Muscle gain (caloric surplus)"],
] as const;

type ClientOption = { id: string; name: string };
type GeneratePlanFormProps = { clients: ClientOption[] };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function closeDialog() {
  const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
  dialog?.close();
}

export function GeneratePlanForm({ clients }: GeneratePlanFormProps) {
  const [state, formAction] = useActionState(generateNutritionPlanAction, INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.planId) {
      closeDialog();
      router.push(`/dashboard/trainer/nutrition/${state.planId}`);
    }
  }, [state.success, state.planId, router]);

  return (
    <form action={formAction} className="space-y-5">
      {state.message && !state.success ? (
        <div className="alert alert-error">
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="title" className="text-sm font-semibold">Plan title</label>
          <input id="title" name="title" type="text" className="input input-bordered w-full" placeholder="e.g. John's Muscle Gain Plan — May 2026" required />
          <FieldError message={state.errors?.title?.[0]} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="clientId" className="text-sm font-semibold">Client</label>
          {clients.length === 0 ? (
            <p className="text-sm text-warning">No active clients found.</p>
          ) : (
            <select id="clientId" name="clientId" className="select select-bordered w-full" required>
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          <FieldError message={state.errors?.clientId?.[0]} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="caloricGoal" className="text-sm font-semibold">Caloric objective</label>
          <select id="caloricGoal" name="caloricGoal" className="select select-bordered w-full" defaultValue={CaloricGoal.MAINTENANCE}>
            {CALORIC_OPTIONS.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <FieldError message={state.errors?.caloricGoal?.[0]} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <p className="text-sm font-semibold">Macronutrient distribution <span className="font-normal text-base-content/50">(must total 100%)</span></p>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="proteinPct" className="text-xs text-base-content/60">Protein %</label>
              <input id="proteinPct" name="proteinPct" type="number" min="10" max="60" className="input input-bordered w-full" defaultValue={30} required />
              <FieldError message={state.errors?.proteinPct?.[0]} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="carbsPct" className="text-xs text-base-content/60">Carbs %</label>
              <input id="carbsPct" name="carbsPct" type="number" min="10" max="70" className="input input-bordered w-full" defaultValue={45} required />
              <FieldError message={state.errors?.carbsPct?.[0]} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="fatPct" className="text-xs text-base-content/60">Fat %</label>
              <input id="fatPct" name="fatPct" type="number" min="10" max="50" className="input input-bordered w-full" defaultValue={25} required />
              <FieldError message={state.errors?.fatPct?.[0]} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="currentWeightKg" className="text-sm font-semibold">Current weight kg (optional)</label>
          <input id="currentWeightKg" name="currentWeightKg" type="number" step="0.1" min="30" max="300" className="input input-bordered w-full" placeholder="e.g. 78" />
          <FieldError message={state.errors?.currentWeightKg?.[0]} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="allergies" className="text-sm font-semibold">Allergies or intolerances (optional)</label>
        <textarea id="allergies" name="allergies" className="textarea textarea-bordered w-full resize-y" placeholder="e.g. lactose intolerant, gluten-free, nut allergy" />
        <FieldError message={state.errors?.allergies?.[0]} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="dietaryPreferences" className="text-sm font-semibold">Dietary preferences (optional)</label>
        <textarea id="dietaryPreferences" name="dietaryPreferences" className="textarea textarea-bordered w-full resize-y" placeholder="e.g. vegetarian, high protein, Mediterranean diet" />
        <FieldError message={state.errors?.dietaryPreferences?.[0]} />
      </div>

      <div className="modal-action flex-col gap-3">
        <GeneratePlanSubmitButton />
        <button type="button" className="btn btn-ghost w-full" onClick={closeDialog}>Cancel</button>
      </div>
    </form>
  );
}
