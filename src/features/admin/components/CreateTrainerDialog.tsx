"use client";

// Importamos useState para abrir y cerrar el modal.
import { useState } from "react";

// Importamos el formulario de creación.
import { CreateTrainerForm } from "./CreateTrainerForm";

// Este componente muestra un botón que abre el modal para crear trainer.
export function CreateTrainerDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => setIsOpen(true)}
      >
        Create trainer
      </button>

      {isOpen ? (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="badge badge-secondary mb-3">Create</p>

                <h2 className="text-2xl font-black">New trainer</h2>

                <p className="mt-2 text-sm text-base-content/60">
                  Create a trainer user and their professional profile.
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

            <CreateTrainerForm />
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