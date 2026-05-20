"use client";

import { useActionState } from "react";

import { updateExerciseAction } from "@/features/exercises/server/update-exercise.action";
import type {
  ExerciseFormState,
  ExerciseListItem,
} from "@/features/exercises/types/exercise.types";
import { DifficultyLevel } from "@/generated/prisma/enums";

import { EditExerciseSubmitButton } from "./EditExerciseSubmitButton";

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

type EditExerciseFormProps = { exercise: ExerciseListItem; dialogId: string };
type FieldProps = { label: string; name: string; error?: string };
type TextInputProps = FieldProps & { type?: string; placeholder?: string; defaultValue?: string | number | null };
type SelectInputProps = FieldProps & { defaultValue: string; options: readonly (readonly [string, string])[] };
type SelectStringProps = FieldProps & { defaultValue: string; options: string[] };
type TextAreaProps = FieldProps & { placeholder?: string; defaultValue?: string | null };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function closeDialog(dialogId: string) {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
  dialog?.close();
}

function TextInput(props: TextInputProps) {
  const { label, name, error, type = "text", placeholder, defaultValue } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} type={type} className="input input-bordered w-full" placeholder={placeholder} defaultValue={defaultValue ?? ""} />
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

export function EditExerciseForm({ exercise, dialogId }: EditExerciseFormProps) {
  const [state, formAction] = useActionState(updateExerciseAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="exerciseId" value={exercise.id} />

      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Exercise name" name="name" defaultValue={exercise.name} error={state.errors?.name?.[0]} />
        <SelectStringInput label="Muscle group" name="muscleGroup" options={MUSCLE_GROUP_OPTIONS} defaultValue={exercise.muscleGroup} error={state.errors?.muscleGroup?.[0]} />
        <SelectInput label="Difficulty" name="difficulty" options={DIFFICULTY_OPTIONS} defaultValue={exercise.difficulty} error={state.errors?.difficulty?.[0]} />
        <div className="grid grid-cols-2 gap-2">
          <TextInput label="Default sets" name="defaultSets" type="number" defaultValue={exercise.defaultSets} error={state.errors?.defaultSets?.[0]} />
          <TextInput label="Default reps" name="defaultReps" type="number" defaultValue={exercise.defaultReps} error={state.errors?.defaultReps?.[0]} />
        </div>
      </div>

      <TextArea label="Description" name="description" defaultValue={exercise.description} error={state.errors?.description?.[0]} />
      <TextArea label="Instructions (optional)" name="instructions" defaultValue={exercise.instructions} placeholder="Step-by-step technical instructions" error={state.errors?.instructions?.[0]} />

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={() => closeDialog(dialogId)}>
          Close
        </button>

        <EditExerciseSubmitButton />
      </div>
    </form>
  );
}
