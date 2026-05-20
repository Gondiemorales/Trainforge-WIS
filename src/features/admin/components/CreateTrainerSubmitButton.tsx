"use client";

// Importamos useFormStatus para saber si el formulario se está enviando.
import { useFormStatus } from "react-dom";

// Este botón muestra loading mientras se crea el trainer.
export function CreateTrainerSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Creating..." : "Create trainer"}
    </button>
  );
}