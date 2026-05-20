"use client";

import type { PlanListItem } from "@/features/training-plans/types/training-plan.types";

import { EditPlanForm } from "./EditPlanForm";

type EditPlanDialogProps = { plan: PlanListItem };

export function EditPlanDialog({ plan }: EditPlanDialogProps) {
  const dialogId = `edit-plan-dialog-${plan.id}`;
  const canEdit = plan.status !== "ARCHIVED";

  function openDialog() {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-outline"
        onClick={openDialog}
        disabled={!canEdit}
        title={!canEdit ? "Archived plans cannot be edited" : undefined}
      >
        Edit
      </button>

      {canEdit ? (
        <dialog id={dialogId} className="modal">
          <div className="modal-box max-w-2xl">
            <h2 className="text-2xl font-black">Edit plan</h2>
            <p className="mt-2 text-sm text-base-content/60">
              Update the title, dates or description of this plan.
            </p>
            <div className="mt-6">
              <EditPlanForm plan={plan} dialogId={dialogId} />
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
