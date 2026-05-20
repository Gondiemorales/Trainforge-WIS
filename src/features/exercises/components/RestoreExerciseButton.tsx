"use client";

import { useActionState } from "react";

import { restoreExerciseAction } from "@/features/exercises/server/restore-exercise.action";
import type { ExerciseFormState } from "@/features/exercises/types/exercise.types";

const INITIAL_STATE: ExerciseFormState = { success: false, message: "" };

type RestoreExerciseButtonProps = {
  exerciseId: string;
};

export function RestoreExerciseButton({ exerciseId }: RestoreExerciseButtonProps) {
  const [state, formAction] = useActionState(restoreExerciseAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="exerciseId" value={exerciseId} />

      <button type="submit" className="btn btn-sm btn-success btn-outline">
        Restore
      </button>

      {state.message ? (
        <p className={["text-xs", state.success ? "text-success" : "text-error"].join(" ")}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
