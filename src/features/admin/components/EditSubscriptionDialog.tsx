"use client";

// Importamos useState para abrir y cerrar el modal.
import { useState } from "react";

// Importamos el formulario de edición.
import { EditSubscriptionForm } from "./EditSubscriptionForm";

// Este tipo define los datos que necesita el modal.
type EditSubscriptionDialogProps = {
  subscription: {
    id: string;
    trainerName: string;
    plan: string;
    status: string;
    monthlyPrice: string;
    startsAt: string;
    endsAt: string;
    isArchived: boolean;
  };
};

// Este componente muestra el botón Edit.
// Al pulsarlo, abre un modal con el formulario de edición.
export function EditSubscriptionDialog({
  subscription,
}: EditSubscriptionDialogProps) {
  // Guardamos si el modal está abierto o cerrado.
  const [isOpen, setIsOpen] = useState(false);

  // Si está archivada, no permitimos editarla.
  if (subscription.isArchived) {
    return (
      <button className="btn btn-ghost btn-xs" disabled>
        Edit
      </button>
    );
  }

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>

      {/* Modal de edición */}
      {isOpen ? (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="badge badge-secondary mb-3">Edit</p>

                <h2 className="text-2xl font-black">
                  Edit subscription
                </h2>

                <p className="mt-2 text-sm text-base-content/60">
                  Update the subscription for {subscription.trainerName}.
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

            <EditSubscriptionForm subscription={subscription} />
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