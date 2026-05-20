"use client";

// Importamos useFormStatus para saber si el formulario se está enviando.
import { useFormStatus } from "react-dom";

// Este componente muestra el botón de login.
// Lo separamos para poder controlar el estado de carga de forma limpia.
export function LoginSubmitButton() {
  // pending será true mientras el formulario se está enviando.
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary w-full"
      disabled={pending}
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}