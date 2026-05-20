"use client";

import { useActionState } from "react";

import { createPlanAction } from "@/features/training-plans/server/create-plan.action";
import type {
  ClientSelectOption,
  PlanFormState,
} from "@/features/training-plans/types/training-plan.types";

import { CreatePlanSubmitButton } from "./CreatePlanSubmitButton";

const DIALOG_ID = "create-plan-dialog";
const INITIAL_STATE: PlanFormState = { success: false, message: "" };

type CreatePlanFormProps = {
  clients: ClientSelectOption[];
};

type FieldProps = { label: string; name: string; error?: string };
type TextInputProps = FieldProps & { type?: string; placeholder?: string; required?: boolean };
type TextAreaProps = FieldProps & { placeholder?: string };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function TextInput(props: TextInputProps) {
  const { label, name, error, type = "text", placeholder, required } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} type={type} className="input input-bordered w-full" placeholder={placeholder} required={required} />
      <FieldError message={error} />
    </div>
  );
}

function TextArea({ label, name, error, placeholder }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <textarea id={name} name={name} className="textarea textarea-bordered min-h-24 w-full resize-y" placeholder={placeholder} />
      <FieldError message={error} />
    </div>
  );
}

function closeDialog() {
  const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
  dialog?.close();
}

export function CreatePlanForm({ clients }: CreatePlanFormProps) {
  const [state, formAction] = useActionState(createPlanAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="title" className="text-sm font-semibold">Plan title</label>
          <input id="title" name="title" type="text" className="input input-bordered w-full" placeholder="e.g. Strength Program — Week 1" required />
          <FieldError message={state.errors?.title?.[0]} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="clientId" className="text-sm font-semibold">Client</label>
          {clients.length === 0 ? (
            <p className="text-sm text-warning">No active clients found. Add a client first.</p>
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

        <TextInput label="Start date (optional)" name="startDate" type="date" error={state.errors?.startDate?.[0]} />
        <TextInput label="End date (optional)" name="endDate" type="date" error={state.errors?.endDate?.[0]} />
      </div>

      <TextArea label="Description (optional)" name="description" placeholder="Overview of this training plan and its objectives" error={state.errors?.description?.[0]} />

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={closeDialog}>Close</button>
        <CreatePlanSubmitButton />
      </div>
    </form>
  );
}
