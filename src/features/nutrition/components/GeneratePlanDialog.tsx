"use client";

import { GeneratePlanForm } from "./GeneratePlanForm";

const DIALOG_ID = "generate-plan-dialog";

type GeneratePlanDialogProps = {
  clients: { id: string; name: string }[];
};

export function GeneratePlanDialog({ clients }: GeneratePlanDialogProps) {
  function openDialog() {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={openDialog}>
        Generate plan with AI
      </button>

      <dialog id={DIALOG_ID} className="modal">
        <div className="modal-box max-w-2xl">
          <h2 className="text-2xl font-black">Generate nutrition plan</h2>
          <p className="mt-2 text-sm text-base-content/60">
            Fill in the client's parameters and our AI will generate a personalised 7-day meal plan.
          </p>
          <div className="mt-6">
            <GeneratePlanForm clients={clients} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
