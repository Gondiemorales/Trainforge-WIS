"use client";

import { CreateExerciseForm } from "./CreateExerciseForm";

const CREATE_EXERCISE_DIALOG_ID = "create-exercise-dialog";

export function CreateExerciseDialog() {
  function openDialog() {
    const dialog = document.getElementById(
      CREATE_EXERCISE_DIALOG_ID,
    ) as HTMLDialogElement | null;

    dialog?.showModal();
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={openDialog}>
        Create exercise
      </button>

      <dialog id={CREATE_EXERCISE_DIALOG_ID} className="modal">
        <div className="modal-box max-w-3xl">
          <h2 className="text-2xl font-black">Create exercise</h2>

          <p className="mt-2 text-sm text-base-content/60">
            Add a custom exercise to your catalogue. It will only be visible to you.
          </p>

          <div className="mt-6">
            <CreateExerciseForm />
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
