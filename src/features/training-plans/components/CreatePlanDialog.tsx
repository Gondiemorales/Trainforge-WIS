"use client";

import type { ClientSelectOption } from "@/features/training-plans/types/training-plan.types";

import { CreatePlanForm } from "./CreatePlanForm";

const DIALOG_ID = "create-plan-dialog";

type CreatePlanDialogProps = {
  clients: ClientSelectOption[];
};

export function CreatePlanDialog({ clients }: CreatePlanDialogProps) {
  function openDialog() {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={openDialog}>
        Create plan
      </button>

      <dialog id={DIALOG_ID} className="modal">
        <div className="modal-box max-w-2xl">
          <h2 className="text-2xl font-black">Create training plan</h2>
          <p className="mt-2 text-sm text-base-content/60">
            Assign a training plan to one of your clients. You can add exercises after creating it.
          </p>
          <div className="mt-6">
            <CreatePlanForm clients={clients} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
