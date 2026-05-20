"use client";

// Importamos useState para abrir y cerrar el modal.
import { useState } from "react";

// Importamos el formulario de edición.
import { EditTrainerForm } from "./EditTrainerForm";

type EditTrainerDialogProps = {
  trainer: {
    id: string;
    name: string;
    email: string;
    specialty: string;
    bio: string | null;
    hourlyRate: string;
    isActive: boolean;
    isArchived: boolean;
  };
};

// Este componente muestra el botón Edit y abre el modal de edición.
export function EditTrainerDialog({ trainer }: EditTrainerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (trainer.isArchived) {
    return (
      <button className="btn btn-ghost btn-xs" disabled>
        Edit
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>

      {isOpen ? (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="badge badge-secondary mb-3">Edit</p>

                <h2 className="text-2xl font-black">Edit trainer</h2>

                <p className="mt-2 text-sm text-base-content/60">
                  Update {trainer.name}&apos;s profile and account status.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-circle btn-ghost btn-sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <EditTrainerForm
              trainer={{
                id: trainer.id,
                name: trainer.name,
                email: trainer.email,
                specialty: trainer.specialty,
                bio: trainer.bio ?? "",
                hourlyRate: trainer.hourlyRate,
                isActive: trainer.isActive,
              }}
            />
          </div>

          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      ) : null}
    </>
  );
}