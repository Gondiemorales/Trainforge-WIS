"use client";

import type { ClientListItem } from "@/features/clients/types/client.types";

import { EditClientForm } from "./EditClientForm";

type EditClientDialogProps = {
  client: ClientListItem;
};

export function EditClientDialog({ client }: EditClientDialogProps) {
  const dialogId = `edit-client-${client.id}`;

  function openDialog() {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    dialog?.showModal();
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-outline"
        disabled={client.isArchived}
        onClick={openDialog}
      >
        Edit
      </button>

      <dialog id={dialogId} className="modal">
        <div className="modal-box max-w-4xl">
          <h2 className="text-2xl font-black">Edit client</h2>

          <p className="mt-2 text-sm text-base-content/60">
            Update account details, goals and internal trainer notes.
          </p>

          <div className="mt-6">
            <EditClientForm client={client} dialogId={dialogId} />
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}