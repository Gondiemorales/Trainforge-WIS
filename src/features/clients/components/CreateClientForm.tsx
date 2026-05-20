"use client";

import { useActionState } from "react";

import { createClientAction } from "@/features/clients/server/create-client.action";
import type { ClientFormState } from "@/features/clients/types/client.types";
import { ExperienceLevel, FitnessGoal } from "@/generated/prisma/enums";

import { CreateClientSubmitButton } from "./CreateClientSubmitButton";
import { PreferredAppointmentTimesPicker } from "./PreferredAppointmentTimesPicker";

const DIALOG_ID = "create-client-dialog";
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

type FieldProps = { label: string; name: string; error?: string };

type TextInputProps = FieldProps & {
  type?: string;
  placeholder?: string;
  required?: boolean;
  step?: string;
};

type SelectInputProps = FieldProps & {
  defaultValue: string;
  options: readonly (readonly [string, string])[];
};

type TextAreaProps = FieldProps & { placeholder?: string };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function TextInput(props: TextInputProps) {
  const { label, name, error, type = "text", placeholder, required, step } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} type={type} step={step} className="input input-bordered w-full" placeholder={placeholder} required={required} />
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

export function CreateClientForm() {
  const [state, formAction] = useActionState(createClientAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Name" name="name" placeholder="Client name" required error={state.errors?.name?.[0]} />
        <TextInput label="Email" name="email" type="email" placeholder="client@email.com" required error={state.errors?.email?.[0]} />
        <TextInput label="Initial password" name="password" type="password" placeholder="Minimum 6 characters" required error={state.errors?.password?.[0]} />
        <SelectInput label="Goal" name="goal" options={GOAL_OPTIONS} defaultValue={FitnessGoal.GENERAL_FITNESS} error={state.errors?.goal?.[0]} />
        <SelectInput label="Experience" name="experienceLevel" options={EXPERIENCE_OPTIONS} defaultValue={ExperienceLevel.BEGINNER} error={state.errors?.experienceLevel?.[0]} />
        <TextInput label="Age" name="age" type="number" placeholder="28" error={state.errors?.age?.[0]} />
        <TextInput label="Height cm" name="heightCm" type="number" step="0.01" placeholder="175" error={state.errors?.heightCm?.[0]} />
        <TextInput label="Current weight kg" name="currentWeightKg" type="number" step="0.01" placeholder="72.5" error={state.errors?.currentWeightKg?.[0]} />
      </div>

      <TextArea label="Goal description" name="goalDescription" placeholder="More detail about the client's goal" error={state.errors?.goalDescription?.[0]} />

      <PreferredAppointmentTimesPicker error={state.errors?.preferredAppointmentTimes?.[0]} />

      <TextArea label="Internal notes" name="notes" placeholder="Private notes for this client" error={state.errors?.notes?.[0]} />

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={closeDialog}>
          Close
        </button>

        <CreateClientSubmitButton />
      </div>
    </form>
  );
}