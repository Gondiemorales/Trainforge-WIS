"use client";

import { useActionState } from "react";

import { updateClientAction } from "@/features/clients/server/update-client.action";
import type {
  ClientFormState,
  ClientListItem,
} from "@/features/clients/types/client.types";
import { ExperienceLevel, FitnessGoal } from "@/generated/prisma/enums";

import { EditClientSubmitButton } from "./EditClientSubmitButton";
import { PreferredAppointmentTimesPicker } from "./PreferredAppointmentTimesPicker";

const INITIAL_STATE: ClientFormState = { success: false, message: "" };

const GOAL_OPTIONS = [
  [FitnessGoal.FAT_LOSS, "Fat loss"],
  [FitnessGoal.MUSCLE_GAIN, "Muscle gain"],
  [FitnessGoal.STRENGTH, "Strength"],
  [FitnessGoal.ENDURANCE, "Endurance"],
  [FitnessGoal.MOBILITY, "Mobility"],
  [FitnessGoal.GENERAL_FITNESS, "General fitness"],
] as const;

const EXPERIENCE_OPTIONS = [
  [ExperienceLevel.BEGINNER, "Beginner"],
  [ExperienceLevel.INTERMEDIATE, "Intermediate"],
  [ExperienceLevel.ADVANCED, "Advanced"],
] as const;

const STATUS_OPTIONS = [["true", "Active"], ["false", "Inactive"]] as const;

type EditClientFormProps = { client: ClientListItem; dialogId: string };
type FieldProps = { label: string; name: string; error?: string };

type TextInputProps = FieldProps & {
  type?: string;
  placeholder?: string;
  step?: string;
  defaultValue?: string | number | null;
};

type SelectInputProps = FieldProps & {
  defaultValue: string;
  options: readonly (readonly [string, string])[];
};

type TextAreaProps = FieldProps & {
  placeholder?: string;
  defaultValue?: string | null;
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function closeDialog(dialogId: string) {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
  dialog?.close();
}

function TextInput(props: TextInputProps) {
  const { label, name, error, type = "text", placeholder, step, defaultValue } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} type={type} step={step} className="input input-bordered w-full" placeholder={placeholder} defaultValue={defaultValue ?? ""} />
      <FieldError message={error} />
    </div>
  );
}

function SelectInput(props: SelectInputProps) {
  const { label, name, error, options, defaultValue } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <select id={name} name={name} className="select select-bordered w-full" defaultValue={defaultValue}>
        {options.map(([value, optionLabel]) => (
          <option key={value} value={value}>{optionLabel}</option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

function TextArea(props: TextAreaProps) {
  const { label, name, error, placeholder, defaultValue } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <textarea id={name} name={name} className="textarea textarea-bordered min-h-24 w-full resize-y" placeholder={placeholder} defaultValue={defaultValue ?? ""} />
      <FieldError message={error} />
    </div>
  );
}

export function EditClientForm({ client, dialogId }: EditClientFormProps) {
  const [state, formAction] = useActionState(updateClientAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="clientId" value={client.id} />

      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Name" name="name" defaultValue={client.name} error={state.errors?.name?.[0]} />
        <TextInput label="Email" name="email" type="email" defaultValue={client.email} error={state.errors?.email?.[0]} />
        <SelectInput label="Goal" name="goal" options={GOAL_OPTIONS} defaultValue={client.goal} error={state.errors?.goal?.[0]} />
        <SelectInput label="Experience" name="experienceLevel" options={EXPERIENCE_OPTIONS} defaultValue={client.experienceLevel} error={state.errors?.experienceLevel?.[0]} />
        <TextInput label="Age" name="age" type="number" defaultValue={client.age} error={state.errors?.age?.[0]} />
        <TextInput label="Height cm" name="heightCm" type="number" step="0.01" defaultValue={client.heightCm} error={state.errors?.heightCm?.[0]} />
        <TextInput label="Current weight kg" name="currentWeightKg" type="number" step="0.01" defaultValue={client.currentWeightKg} error={state.errors?.currentWeightKg?.[0]} />
        <SelectInput label="Account status" name="isActive" options={STATUS_OPTIONS} defaultValue={String(client.isActive)} error={state.errors?.isActive?.[0]} />
      </div>

      <TextArea label="Goal description" name="goalDescription" defaultValue={client.goalDescription} placeholder="More detail about the client's goal" error={state.errors?.goalDescription?.[0]} />

      <PreferredAppointmentTimesPicker defaultValue={client.preferredAppointmentTimes} error={state.errors?.preferredAppointmentTimes?.[0]} />

      <TextArea label="Internal notes" name="notes" defaultValue={client.notes} placeholder="Private notes for this client" error={state.errors?.notes?.[0]} />

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={() => closeDialog(dialogId)}>
          Close
        </button>

        <EditClientSubmitButton />
      </div>
    </form>
  );
}