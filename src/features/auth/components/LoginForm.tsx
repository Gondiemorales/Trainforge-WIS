"use client";

// Importamos useActionState para conectar el formulario con una Server Action.
import { useActionState } from "react";

// Importamos la acción de login que se ejecuta en el servidor.
import {
  loginAction,
  type LoginActionState,
} from "../server/login.action";

// Importamos el botón de submit separado.
import { LoginSubmitButton } from "./LoginSubmitButton";

// Estado inicial del formulario.
// Empieza sin mensajes ni errores.
const initialState: LoginActionState = {
  message: undefined,
  fieldErrors: undefined,
};

// Este componente muestra el formulario de login.
// Recoge email y contraseña, y se los envía a loginAction.
export function LoginForm() {
  // useActionState conecta el formulario con la Server Action.
  // state guarda errores o mensajes devueltos por el servidor.
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Campo de email */}
      <div className="form-control">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="trainer@trainforge.com"
          className="input input-bordered w-full"
          autoComplete="email"
        />

        {state.fieldErrors?.email ? (
          <p className="mt-2 text-sm text-error">
            {state.fieldErrors.email[0]}
          </p>
        ) : null}
      </div>

      {/* Campo de contraseña */}
      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="password123"
          className="input input-bordered w-full"
          autoComplete="current-password"
        />

        {state.fieldErrors?.password ? (
          <p className="mt-2 text-sm text-error">
            {state.fieldErrors.password[0]}
          </p>
        ) : null}
      </div>

      {/* Mensaje general, por ejemplo credenciales incorrectas */}
      {state.message ? (
        <div className="alert alert-error text-sm">
          <span>{state.message}</span>
        </div>
      ) : null}

      {/* Botón de login */}
      <LoginSubmitButton />
    </form>
  );
}