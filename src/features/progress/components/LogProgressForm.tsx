"use client";

import { useActionState } from "react";

import { logProgressAction } from "@/features/progress/server/log-progress.action";
import type { ProgressFormState } from "@/features/progress/types/progress.types";

import { LogProgressSubmitButton } from "./LogProgressSubmitButton";

const INITIAL_STATE: ProgressFormState = { success: false, message: "" };

type ClientOption = { id: string; name: string };
type ExerciseOption = { id: string; name: string; muscleGroup: string };

type LogProgressFormProps = {
  clients: ClientOption[];
  exercises: ExerciseOption[];
  defaultClientId?: string;
  defaultExerciseId?: string;
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

export function LogProgressForm({
  clients,
  exercises,
  defaultClientId,
  defaultExerciseId,
}: LogProgressFormProps) {
  const [state, formAction] = useActionState(logProgressAction, INITIAL_STATE);

  return (
    <div className="rounded-3xl bg-base-100 p-6 shadow-md">
      <h2 className="text-xl font-bold">Log a session</h2>
      <p className="mt-1 text-sm text-base-content/60">
        Record a client's performance for a specific exercise.
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        {state.message ? (
          <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
            <span>{state.message}</span>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="clientId" className="text-sm font-semibold">Client</label>
            {clients.length === 0 ? (
              <p className="text-sm text-warning">No active clients.</p>
            ) : (
              <select
                id="clientId"
                name="clientId"
                className="select select-bordered w-full"
                defaultValue={defaultClientId ?? ""}
                required
              >
                <option value="" disabled>Select client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
            <FieldError message={state.errors?.clientId?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="exerciseId" className="text-sm font-semibold">Exercise</label>
            <select
              id="exerciseId"
              name="exerciseId"
              className="select select-bordered w-full"
              defaultValue={defaultExerciseId ?? ""}
              required
            >
              <option value="" disabled>Select exercise</option>
              {exercises.map((e) => (
                <option key={e.id} value={e.id}>{e.name} — {e.muscleGroup}</option>
              ))}
            </select>
            <FieldError message={state.errors?.exerciseId?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-semibold">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="input input-bordered w-full"
              defaultValue={getTodayISO()}
              required
            />
            <FieldError message={state.errors?.date?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="weightKg" className="text-sm font-semibold">Weight lifted (kg, optional)</label>
            <input id="weightKg" name="weightKg" type="number" step="0.5" min="0" max="1000" className="input input-bordered w-full" placeholder="e.g. 80" />
            <FieldError message={state.errors?.weightKg?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sets" className="text-sm font-semibold">Sets (optional)</label>
            <input id="sets" name="sets" type="number" min="1" max="50" className="input input-bordered w-full" placeholder="e.g. 3" />
            <FieldError message={state.errors?.sets?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="reps" className="text-sm font-semibold">Reps (optional)</label>
            <input id="reps" name="reps" type="number" min="1" max="500" className="input input-bordered w-full" placeholder="e.g. 10" />
            <FieldError message={state.errors?.reps?.[0]} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="bodyWeightKg" className="text-sm font-semibold">Client body weight kg (optional)</label>
            <input id="bodyWeightKg" name="bodyWeightKg" type="number" step="0.1" min="30" max="300" className="input input-bordered w-full" placeholder="e.g. 78" />
            <FieldError message={state.errors?.bodyWeightKg?.[0]} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="notes" className="text-sm font-semibold">Notes (optional)</label>
          <textarea id="notes" name="notes" className="textarea textarea-bordered w-full resize-y" placeholder="Form notes, RPE, how the client felt..." />
          <FieldError message={state.errors?.notes?.[0]} />
        </div>

        <div className="flex justify-end">
          <LogProgressSubmitButton />
        </div>
      </form>
    </div>
  );
}
