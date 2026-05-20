"use client";

// Importamos useActionState para conectar el formulario con la Server Action.
import { useActionState } from "react";

// Importamos la acción que crea trainers.
import { createTrainerAction } from "../server/create-trainer.action";

// Importamos el tipo del estado del formulario.
import type { TrainerFormState } from "../types/trainer.types";

// Importamos el botón con loading.
import { CreateTrainerSubmitButton } from "./CreateTrainerSubmitButton";

const initialState: TrainerFormState = {
  success: undefined,
  message: undefined,
  fieldErrors: undefined,
};

// Esta función obtiene el primer error de un campo.
function getFieldError(state: TrainerFormState, fieldName: string) {
  return state.fieldErrors?.[fieldName]?.[0];
}

// Este formulario crea un nuevo trainer.
export function CreateTrainerForm() {
  const [state, formAction] = useActionState(
    createTrainerAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4 lg:grid-cols-2">
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Name</span>
        </label>

        <input
          id="name"
          name="name"
          type="text"
          className="input input-bordered w-full"
          placeholder="Alex Trainer"
        />

        {getFieldError(state, "name") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "name")}
          </p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className="input input-bordered w-full"
          placeholder="trainer@example.com"
        />

        {getFieldError(state, "email") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "email")}
          </p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text">Temporary password</span>
        </label>

        <input
          id="password"
          name="password"
          type="password"
          className="input input-bordered w-full"
          placeholder="password123"
        />

        {getFieldError(state, "password") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "password")}
          </p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="hourlyRate">
          <span className="label-text">Hourly rate</span>
        </label>

        <input
          id="hourlyRate"
          name="hourlyRate"
          type="text"
          className="input input-bordered w-full"
          placeholder="75.00"
          defaultValue="75.00"
        />

        {getFieldError(state, "hourlyRate") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "hourlyRate")}
          </p>
        ) : null}
      </div>

      <div className="form-control lg:col-span-2">
        <label className="label" htmlFor="specialty">
          <span className="label-text">Specialty</span>
        </label>

        <input
          id="specialty"
          name="specialty"
          type="text"
          className="input input-bordered w-full"
          placeholder="Strength Training"
        />

        {getFieldError(state, "specialty") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "specialty")}
          </p>
        ) : null}
      </div>

      <div className="form-control lg:col-span-2">
        <label className="label" htmlFor="bio">
          <span className="label-text">Bio</span>
        </label>

        <textarea
          id="bio"
          name="bio"
          className="textarea textarea-bordered min-h-24 w-full"
          placeholder="Short trainer bio..."
        />

        {getFieldError(state, "bio") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "bio")}
          </p>
        ) : null}
      </div>

      {state.message ? (
        <div
          className={
            state.success
              ? "alert alert-success lg:col-span-2"
              : "alert alert-error lg:col-span-2"
          }
        >
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="flex justify-end lg:col-span-2">
        <CreateTrainerSubmitButton />
      </div>
    </form>
  );
}