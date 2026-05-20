"use client";

import { CreateAppointmentForm } from "./CreateAppointmentForm";

const DIALOG_ID = "create-appointment-dialog";

type CreateAppointmentDialogProps = {
  clients: { id: string; name: string }[];
};

export function CreateAppointmentDialog({ clients }: CreateAppointmentDialogProps) {
  function openDialog() {
    const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={openDialog}>
        Schedule appointment
      </button>

      <dialog id={DIALOG_ID} className="modal">
        <div className="modal-box max-w-2xl">
          <h2 className="text-2xl font-black">Schedule appointment</h2>
          <p className="mt-2 text-sm text-base-content/60">
            Book a session with one of your clients.
          </p>
          <div className="mt-6">
            <CreateAppointmentForm clients={clients} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
