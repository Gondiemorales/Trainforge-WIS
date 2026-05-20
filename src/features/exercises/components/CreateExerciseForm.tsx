"use client";

import { useActionState } from "react";

import { createExerciseAction } from "@/features/exercises/server/create-exercise.action";
import type { ExerciseFormState } from "@/features/exercises/types/exercise.types";
import { DifficultyLevel } from "@/generated/prisma/enums";

import { CreateExerciseSubmitButton } from "./CreateExerciseSubmitButton";

const DIALOG_ID = "create-exercise-dialog";
const INITIAL_STATE: ExerciseFormState = { success: false, message: "" };

const DIFFICULTY_OPTIONS = [
  [DifficultyLevel.BEGINNER, "Beginner"],
  [DifficultyLevel.INTERMEDIATE, "Intermediate"],
  [DifficultyLevel.ADVANCED, "Advanced"],
] as const;

const MUSCLE_GROUP_OPTIONS = [
  "Chest", "Back", "Shoulders", "Biceps", "Triceps",
  "Legs", "Glutes", "Core", "Calves", "Full Body", "Cardio",
];

type FieldProps = { label: string; name: string; error?: string };
type TextInputProps = FieldProps & { type?: string; placeholder?: string; required?: boolean; step?: string };
type SelectInputProps = FieldProps & { defaultValue: string; options: readonly (readonly [string, string])[] };
type SelectStringProps = FieldProps & { defaultValue: string; options: string[] };
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

function SelectStringInput(props: SelectStringProps) {
  const { label, name, error, options, defaultValue } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <select id={name} name={name} className="select select-bordered w-full" defaultValue={defaultValue}>
        {options.map((value) => (
          <option key={value} value={value}>{value}</option>
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

export function CreateExerciseForm() {
  const [state, formAction] = useActionState(createExerciseAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Exercise name" name="name" placeholder="e.g. Bench Press" required error={state.errors?.name?.[0]} />
        <SelectStringInput label="Muscle group" name="muscleGroup" options={MUSCLE_GROUP_OPTIONS} defaultValue="Chest" error={state.errors?.muscleGroup?.[0]} />
        <SelectInput label="Difficulty" name="difficulty" options={DIFFICULTY_OPTIONS} defaultValue={DifficultyLevel.BEGINNER} error={state.errors?.difficulty?.[0]} />
        <div className="grid grid-cols-2 gap-2">
          <TextInput label="Default sets" name="defaultSets" type="number" placeholder="3" error={state.errors?.defaultSets?.[0]} />
          <TextInput label="Default reps" name="defaultReps" type="number" placeholder="10" error={state.errors?.defaultReps?.[0]} />
        </div>
      </div>

      <TextArea label="Description" name="description" placeholder="Brief explanation of the exercise and its benefits" error={state.errors?.description?.[0]} />
      <TextArea label="Instructions (optional)" name="instructions" placeholder="Step-by-step technical instructions" error={state.errors?.instructions?.[0]} />

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={closeDialog}>
          Close
        </button>

        <CreateExerciseSubmitButton />
      </div>
    </form>
  );
}
