"use client";

import type { ExerciseListItem } from "@/features/exercises/types/exercise.types";

import { EditExerciseForm } from "./EditExerciseForm";

type EditExerciseDialogProps = {
  exercise: ExerciseListItem;
};

export function EditExerciseDialog({ exercise }: EditExerciseDialogProps) {
  const dialogId = `edit-exercise-dialog-${exercise.id}`;

  function openDialog() {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  const canEdit = exercise.isOwned && !exercise.isArchived;

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-outline"
        onClick={openDialog}
        disabled={!canEdit}
        title={!canEdit ? (exercise.isGlobal ? "Global exercises cannot be edited" : "Archived exercises cannot be edited") : undefined}
      >
        Edit
      </button>

      {canEdit ? (
        <dialog id={dialogId} className="modal">
          <div className="modal-box max-w-3xl">
            <h2 className="text-2xl font-black">Edit exercise</h2>

            <p className="mt-2 text-sm text-base-content/60">
              Update the details of your custom exercise.
            </p>

            <div className="mt-6">
              <EditExerciseForm exercise={exercise} dialogId={dialogId} />
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button type="submit">Close</button>
          </form>
        </dialog>
      ) : null}
    </>
  );
}
