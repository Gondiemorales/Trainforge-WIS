"use client";

import { useActionState, useState } from "react";

import { addPlanExerciseAction } from "@/features/training-plans/server/add-plan-exercise.action";
import type {
  ExerciseSelectOption,
  PlanFormState,
} from "@/features/training-plans/types/training-plan.types";
import { DifficultyLevel } from "@/generated/prisma/enums";

const INITIAL_STATE: PlanFormState = { success: false, message: "" };

const DIFFICULTY_OPTIONS = [
  [DifficultyLevel.BEGINNER, "Beginner"],
  [DifficultyLevel.INTERMEDIATE, "Intermediate"],
  [DifficultyLevel.ADVANCED, "Advanced"],
] as const;

const DAY_OPTIONS = [
  ["", "No specific day"],
  ["1", "Monday"], ["2", "Tuesday"], ["3", "Wednesday"],
  ["4", "Thursday"], ["5", "Friday"], ["6", "Saturday"], ["7", "Sunday"],
] as const;

type AddExerciseToPlanFormProps = {
  planId: string;
  exercises: ExerciseSelectOption[];
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function AddExerciseSubmitButton() {
  return (
    <button type="submit" className="btn btn-primary">
      Add exercise
    </button>
  );
}

export function AddExerciseToPlanForm({ planId, exercises }: AddExerciseToPlanFormProps) {
  const [state, formAction] = useActionState(addPlanExerciseAction, INITIAL_STATE);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseSelectOption | null>(null);

  function handleExerciseChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const found = exercises.find((ex) => ex.id === e.target.value) ?? null;
    setSelectedExercise(found);
  }

  if (exercises.length === 0) {
    return (
      <div className="rounded-2xl bg-base-200 p-6 text-center">
        <p className="text-base-content/60">
          No exercises available. Create exercises in the{" "}
          <a href="/dashboard/trainer/exercises" className="link link-primary">Exercises</a> section first.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-base-100 p-6 shadow-md">
      <h2 className="text-xl font-bold">Add exercise</h2>
      <p className="mt-1 text-sm text-base-content/60">
        Select an exercise from your catalogue and configure the sets and reps for this plan.
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        <input type="hidden" name="planId" value={planId} />

        {state.message ? (
          <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
            <span>{state.message}</span>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="exerciseId" className="text-sm font-semibold">Exercise</label>
            <select
              id="exerciseId"
              name="exerciseId"
              className="select select-bordered w-full"
              required
              onChange={handleExerciseChange}
              defaultValue=""
            >
              <option value="" disabled>Select an exercise</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} — {ex.muscleGroup}
                </option>
              ))}
            </select>
            <FieldError message={state.errors?.exerciseId?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sets" className="text-sm font-semibold">Sets</label>
            <input
              id="sets"
              name="sets"
              type="number"
              min="1"
              max="20"
              className="input input-bordered w-full"
              defaultValue={selectedExercise?.defaultSets ?? 3}
              required
            />
            <FieldError message={state.errors?.sets?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="reps" className="text-sm font-semibold">Reps</label>
            <input
              id="reps"
              name="reps"
              type="number"
              min="1"
              max="200"
              className="input input-bordered w-full"
              defaultValue={selectedExercise?.defaultReps ?? 10}
              required
            />
            <FieldError message={state.errors?.reps?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="difficulty" className="text-sm font-semibold">Difficulty for this plan</label>
            <select
              id="difficulty"
              name="difficulty"
              className="select select-bordered w-full"
              defaultValue={selectedExercise?.difficulty ?? DifficultyLevel.BEGINNER}
            >
              {DIFFICULTY_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <FieldError message={state.errors?.difficulty?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="dayOfWeek" className="text-sm font-semibold">Day of week (optional)</label>
            <select id="dayOfWeek" name="dayOfWeek" className="select select-bordered w-full" defaultValue="">
              {DAY_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <FieldError message={state.errors?.dayOfWeek?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="restSeconds" className="text-sm font-semibold">Rest (seconds, optional)</label>
            <input id="restSeconds" name="restSeconds" type="number" min="0" max="600" className="input input-bordered w-full" placeholder="e.g. 90" />
            <FieldError message={state.errors?.restSeconds?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="intensity" className="text-sm font-semibold">Intensity (optional)</label>
            <input id="intensity" name="intensity" type="text" className="input input-bordered w-full" placeholder="e.g. RPE 8 or 70% 1RM" />
            <FieldError message={state.errors?.intensity?.[0]} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold">Exercise description for this plan (optional)</label>
          <textarea id="description" name="description" className="textarea textarea-bordered w-full resize-y" placeholder="Custom notes about how to perform this exercise in this plan" />
          <FieldError message={state.errors?.description?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="notes" className="text-sm font-semibold">Notes for client (optional)</label>
          <textarea id="notes" name="notes" className="textarea textarea-bordered w-full resize-y" placeholder="Visible tips or reminders for the client" />
          <FieldError message={state.errors?.notes?.[0]} />
        </div>

        <div className="flex justify-end">
          <AddExerciseSubmitButton />
        </div>
      </form>
    </div>
  );
}
