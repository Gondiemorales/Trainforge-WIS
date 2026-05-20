"use client";

import { useActionState } from "react";

import { archiveExerciseAction } from "@/features/exercises/server/archive-exercise.action";
import type { ExerciseFormState } from "@/features/exercises/types/exercise.types";

const INITIAL_STATE: ExerciseFormState = { success: false, message: "" };

type ArchiveExerciseButtonProps = {
  exerciseId: string;
};

export function ArchiveExerciseButton({ exerciseId }: ArchiveExerciseButtonProps) {
  const [state, formAction] = useActionState(archiveExerciseAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="exerciseId" value={exerciseId} />

      <button type="submit" className="btn btn-sm btn-error btn-outline">
        Archive
      </button>

      {state.message ? (
        <p className={["text-xs", state.success ? "text-success" : "text-error"].join(" ")}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
