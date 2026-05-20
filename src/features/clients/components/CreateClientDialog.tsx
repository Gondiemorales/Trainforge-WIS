"use client";

import { CreateClientForm } from "./CreateClientForm";

const CREATE_CLIENT_DIALOG_ID = "create-client-dialog";

export function CreateClientDialog() {
  function openDialog() {
    const dialog = document.getElementById(
      CREATE_CLIENT_DIALOG_ID,
    ) as HTMLDialogElement | null;

    dialog?.showModal();
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={openDialog}
      >
        Create client
      </button>

      <dialog
        id={CREATE_CLIENT_DIALOG_ID}
        className="modal"
      >
        <div className="modal-box max-w-4xl">
          <h2 className="text-2xl font-black">
            Create client
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Create a client account and assign it to your trainer profile.
          </p>

          <div className="mt-6">
            <CreateClientForm />
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}