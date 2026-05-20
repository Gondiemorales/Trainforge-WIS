"use client";

import type { AppointmentListItem } from "@/features/appointments/types/appointment.types";

import { EditAppointmentForm } from "./EditAppointmentForm";

type EditAppointmentDialogProps = { appointment: AppointmentListItem };

export function EditAppointmentDialog({ appointment }: EditAppointmentDialogProps) {
  const dialogId = `edit-appointment-dialog-${appointment.id}`;
  const canEdit = appointment.status === "SCHEDULED";

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
        title={!canEdit ? "Only scheduled appointments can be edited" : undefined}
      >
        Edit
      </button>

      {canEdit ? (
        <dialog id={dialogId} className="modal">
          <div className="modal-box max-w-2xl">
            <h2 className="text-2xl font-black">Edit appointment</h2>
            <p className="mt-2 text-sm text-base-content/60">Update this appointment's details.</p>
            <div className="mt-6">
              <EditAppointmentForm appointment={appointment} dialogId={dialogId} />
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
