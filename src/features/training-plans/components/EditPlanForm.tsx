"use client";

import { useActionState } from "react";

import { updatePlanAction } from "@/features/training-plans/server/update-plan.action";
import type {
  PlanFormState,
  PlanListItem,
} from "@/features/training-plans/types/training-plan.types";

import { EditPlanSubmitButton } from "./EditPlanSubmitButton";

const INITIAL_STATE: PlanFormState = { success: false, message: "" };

type EditPlanFormProps = { plan: PlanListItem; dialogId: string };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function formatDateForInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function closeDialog(dialogId: string) {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
  dialog?.close();
}

export function EditPlanForm({ plan, dialogId }: EditPlanFormProps) {
  const [state, formAction] = useActionState(updatePlanAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="planId" value={plan.id} />
      <input type="hidden" name="clientId" value={plan.clientId} />

      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor={`title-${plan.id}`} className="text-sm font-semibold">Plan title</label>
          <input id={`title-${plan.id}`} name="title" type="text" className="input input-bordered w-full" defaultValue={plan.title} required />
          <FieldError message={state.errors?.title?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`startDate-${plan.id}`} className="text-sm font-semibold">Start date (optional)</label>
          <input id={`startDate-${plan.id}`} name="startDate" type="date" className="input input-bordered w-full" defaultValue={formatDateForInput(plan.startDate)} />
          <FieldError message={state.errors?.startDate?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`endDate-${plan.id}`} className="text-sm font-semibold">End date (optional)</label>
          <input id={`endDate-${plan.id}`} name="endDate" type="date" className="input input-bordered w-full" defaultValue={formatDateForInput(plan.endDate)} />
          <FieldError message={state.errors?.endDate?.[0]} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`description-${plan.id}`} className="text-sm font-semibold">Description (optional)</label>
        <textarea id={`description-${plan.id}`} name="description" className="textarea textarea-bordered min-h-24 w-full resize-y" defaultValue={plan.description ?? ""} />
        <FieldError message={state.errors?.description?.[0]} />
      </div>

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={() => closeDialog(dialogId)}>Close</button>
        <EditPlanSubmitButton />
      </div>
    </form>
  );
}
