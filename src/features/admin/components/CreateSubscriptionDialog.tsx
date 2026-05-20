"use client";

// Importamos useState para abrir y cerrar el modal.
import { useState } from "react";

// Importamos el tipo de trainer usado en el select.
import type { TrainerSelectOption } from "../types/subscription.types";

// Importamos el formulario de crear suscripción.
import { CreateSubscriptionForm } from "./CreateSubscriptionForm";

type CreateSubscriptionDialogProps = {
  trainers: TrainerSelectOption[];
};

// Este componente muestra un botón.
// Al pulsarlo, abre un modal con el formulario de crear suscripción.
export function CreateSubscriptionDialog({
  trainers,
}: CreateSubscriptionDialogProps) {
  // Guardamos si el modal está abierto o cerrado.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => setIsOpen(true)}
      >
        Create subscription
      </button>

      {/* Modal con el formulario */}
      {isOpen ? (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="badge badge-secondary mb-3">Create</p>

                <h2 className="text-2xl font-black">
                  New subscription
                </h2>

                <p className="mt-2 text-sm text-base-content/60">
                  Assign a SaaS subscription plan to a personal trainer.
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

            <CreateSubscriptionForm trainers={trainers} />
          </div>

          {/* Fondo oscuro del modal */}
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