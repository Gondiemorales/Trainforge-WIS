"use client";

// Importamos useActionState para conectar el formulario con la Server Action.
import { useActionState } from "react";

// Importamos la acción que edita trainers.
import { updateTrainerAction } from "../server/update-trainer.action";

// Importamos el tipo del estado del formulario.
import type { TrainerFormState } from "../types/trainer.types";

// Importamos el botón con loading.
import { EditTrainerSubmitButton } from "./EditTrainerSubmitButton";

type EditTrainerFormProps = {
  trainer: {
    id: string;
    name: string;
    email: string;
    specialty: string;
    bio: string;
    hourlyRate: string;
    isActive: boolean;
  };
};

const initialState: TrainerFormState = {
  success: undefined,
  message: undefined,
  fieldErrors: undefined,
};

// Esta función obtiene el primer error de un campo.
function getFieldError(state: TrainerFormState, fieldName: string) {
  return state.fieldErrors?.[fieldName]?.[0];
}

// Este formulario edita un trainer existente.
export function EditTrainerForm({ trainer }: EditTrainerFormProps) {
  const [state, formAction] = useActionState(
    updateTrainerAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4 lg:grid-cols-2">
      <input type="hidden" name="trainerId" value={trainer.id} />

      <div className="form-control">
        <label className="label" htmlFor={`name-${trainer.id}`}>
          <span className="label-text">Name</span>
        </label>

        <input
          id={`name-${trainer.id}`}
          name="name"
          type="text"
          className="input input-bordered w-full"
          defaultValue={trainer.name}
        />

        {getFieldError(state, "name") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "name")}
          </p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label" htmlFor={`email-${trainer.id}`}>
          <span className="label-text">Email</span>
        </label>

        <input
          id={`email-${trainer.id}`}
          name="email"
          type="email"
          className="input input-bordered w-full"
          defaultValue={trainer.email}
        />

        {getFieldError(state, "email") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "email")}
          </p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label" htmlFor={`hourlyRate-${trainer.id}`}>
          <span className="label-text">Hourly rate</span>
        </label>

        <input
          id={`hourlyRate-${trainer.id}`}
          name="hourlyRate"
          type="text"
          className="input input-bordered w-full"
          defaultValue={trainer.hourlyRate}
        />

        {getFieldError(state, "hourlyRate") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "hourlyRate")}
          </p>
        ) : null}
      </div>

      <div className="form-control">
        <label className="label" htmlFor={`isActive-${trainer.id}`}>
          <span className="label-text">User status</span>
        </label>

        <select
          id={`isActive-${trainer.id}`}
          name="isActive"
          className="select select-bordered w-full"
          defaultValue={trainer.isActive ? "true" : "false"}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="form-control lg:col-span-2">
        <label className="label" htmlFor={`specialty-${trainer.id}`}>
          <span className="label-text">Specialty</span>
        </label>

        <input
          id={`specialty-${trainer.id}`}
          name="specialty"
          type="text"
          className="input input-bordered w-full"
          defaultValue={trainer.specialty}
        />

        {getFieldError(state, "specialty") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "specialty")}
          </p>
        ) : null}
      </div>

      <div className="form-control lg:col-span-2">
        <label className="label" htmlFor={`bio-${trainer.id}`}>
          <span className="label-text">Bio</span>
        </label>

        <textarea
          id={`bio-${trainer.id}`}
          name="bio"
          className="textarea textarea-bordered min-h-24 w-full"
          defaultValue={trainer.bio}
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
        <EditTrainerSubmitButton />
      </div>
    </form>
  );
}