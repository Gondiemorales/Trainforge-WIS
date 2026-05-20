"use client";

// Importamos useActionState para conectar el formulario con la Server Action.
import { useActionState } from "react";

// Importamos la acción del servidor que crea la suscripción.
import { createSubscriptionAction } from "../server/create-subscription.action";

// Importamos los tipos necesarios del formulario.
import type {
  SubscriptionFormState,
  TrainerSelectOption,
} from "../types/subscription.types";

// Importamos el botón separado con estado de loading.
import { CreateSubscriptionSubmitButton } from "./CreateSubscriptionSubmitButton";

type CreateSubscriptionFormProps = {
  trainers: TrainerSelectOption[];
};

const initialState: SubscriptionFormState = {
  success: undefined,
  message: undefined,
  fieldErrors: undefined,
};

// Esta función obtiene el primer error de un campo.
function getFieldError(state: SubscriptionFormState, fieldName: string) {
  return state.fieldErrors?.[fieldName]?.[0];
}

// Este formulario crea una suscripción.
// Ahora no tiene tarjeta grande alrededor porque irá dentro de un modal.
export function CreateSubscriptionForm({
  trainers,
}: CreateSubscriptionFormProps) {
  // Conectamos el formulario con la Server Action.
  const [state, formAction] = useActionState(
    createSubscriptionAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4 lg:grid-cols-2">
      {/* Selector de entrenador */}
      <div className="form-control lg:col-span-2">
        <label className="label" htmlFor="trainerId">
          <span className="label-text">Trainer</span>
        </label>

        <select
          id="trainerId"
          name="trainerId"
          className="select select-bordered w-full"
          defaultValue=""
        >
          <option value="" disabled>
            Select a trainer
          </option>

          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name} — {trainer.email}
            </option>
          ))}
        </select>

        {getFieldError(state, "trainerId") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "trainerId")}
          </p>
        ) : null}
      </div>

      {/* Selector de plan */}
      <div className="form-control">
        <label className="label" htmlFor="plan">
          <span className="label-text">Plan</span>
        </label>

        <select
          id="plan"
          name="plan"
          className="select select-bordered w-full"
          defaultValue="PRO"
        >
          <option value="FREE">FREE</option>
          <option value="STARTER">STARTER</option>
          <option value="PRO">PRO</option>
        </select>
      </div>

      {/* Selector de estado */}
      <div className="form-control">
        <label className="label" htmlFor="status">
          <span className="label-text">Status</span>
        </label>

        <select
          id="status"
          name="status"
          className="select select-bordered w-full"
          defaultValue="ACTIVE"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="PAST_DUE">PAST_DUE</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
      </div>

      {/* Precio mensual */}
      <div className="form-control">
        <label className="label" htmlFor="monthlyPrice">
          <span className="label-text">Monthly price</span>
        </label>

        <input
          id="monthlyPrice"
          name="monthlyPrice"
          type="text"
          placeholder="29.99"
          className="input input-bordered w-full"
          defaultValue="29.99"
        />

        {getFieldError(state, "monthlyPrice") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "monthlyPrice")}
          </p>
        ) : null}
      </div>

      {/* Fecha de inicio */}
      <div className="form-control">
        <label className="label" htmlFor="startsAt">
          <span className="label-text">Start date</span>
        </label>

        <input
          id="startsAt"
          name="startsAt"
          type="date"
          className="input input-bordered w-full"
        />
      </div>

      {/* Fecha de finalización */}
      <div className="form-control">
        <label className="label" htmlFor="endsAt">
          <span className="label-text">End date</span>
        </label>

        <input
          id="endsAt"
          name="endsAt"
          type="date"
          className="input input-bordered w-full"
        />
      </div>

      {/* Mensaje de éxito o error */}
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

      {/* Botón de crear */}
      <div className="flex justify-end lg:col-span-2">
        <CreateSubscriptionSubmitButton />
      </div>
    </form>
  );
}