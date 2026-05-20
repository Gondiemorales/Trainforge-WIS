"use client";

// Importamos useActionState para conectar el formulario con la Server Action.
import { useActionState } from "react";

// Importamos la acción del servidor que actualiza la suscripción.
import { updateSubscriptionAction } from "../server/update-subscription.action";

// Importamos el tipo de estado del formulario.
import type { SubscriptionFormState } from "../types/subscription.types";

// Importamos el botón separado con estado de loading.
import { EditSubscriptionSubmitButton } from "./EditSubscriptionSubmitButton";

// Este tipo define los datos iniciales que necesita el formulario.
type EditSubscriptionFormProps = {
  subscription: {
    id: string;
    plan: string;
    status: string;
    monthlyPrice: string;
    startsAt: string;
    endsAt: string;
  };
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

// Este formulario permite editar una suscripción existente.
export function EditSubscriptionForm({
  subscription,
}: EditSubscriptionFormProps) {
  // Conectamos el formulario con la Server Action.
  const [state, formAction] = useActionState(
    updateSubscriptionAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4 lg:grid-cols-2">
      {/* Enviamos el id de la suscripción de forma oculta */}
      <input
        type="hidden"
        name="subscriptionId"
        value={subscription.id}
      />

      {/* Selector de plan */}
      <div className="form-control">
        <label className="label" htmlFor={`plan-${subscription.id}`}>
          <span className="label-text">Plan</span>
        </label>

        <select
          id={`plan-${subscription.id}`}
          name="plan"
          className="select select-bordered w-full"
          defaultValue={subscription.plan}
        >
          <option value="FREE">FREE</option>
          <option value="STARTER">STARTER</option>
          <option value="PRO">PRO</option>
        </select>

        {getFieldError(state, "plan") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "plan")}
          </p>
        ) : null}
      </div>

      {/* Selector de estado */}
      <div className="form-control">
        <label className="label" htmlFor={`status-${subscription.id}`}>
          <span className="label-text">Status</span>
        </label>

        <select
          id={`status-${subscription.id}`}
          name="status"
          className="select select-bordered w-full"
          defaultValue={subscription.status}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="PAST_DUE">PAST_DUE</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>

        {getFieldError(state, "status") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "status")}
          </p>
        ) : null}
      </div>

      {/* Precio mensual */}
      <div className="form-control">
        <label className="label" htmlFor={`monthlyPrice-${subscription.id}`}>
          <span className="label-text">Monthly price</span>
        </label>

        <input
          id={`monthlyPrice-${subscription.id}`}
          name="monthlyPrice"
          type="text"
          className="input input-bordered w-full"
          defaultValue={subscription.monthlyPrice}
        />

        {getFieldError(state, "monthlyPrice") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "monthlyPrice")}
          </p>
        ) : null}
      </div>

      {/* Fecha de inicio */}
      <div className="form-control">
        <label className="label" htmlFor={`startsAt-${subscription.id}`}>
          <span className="label-text">Start date</span>
        </label>

        <input
          id={`startsAt-${subscription.id}`}
          name="startsAt"
          type="date"
          className="input input-bordered w-full"
          defaultValue={subscription.startsAt}
        />

        {getFieldError(state, "startsAt") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "startsAt")}
          </p>
        ) : null}
      </div>

      {/* Fecha de finalización */}
      <div className="form-control lg:col-span-2">
        <label className="label" htmlFor={`endsAt-${subscription.id}`}>
          <span className="label-text">End date</span>
        </label>

        <input
          id={`endsAt-${subscription.id}`}
          name="endsAt"
          type="date"
          className="input input-bordered w-full"
          defaultValue={subscription.endsAt}
        />

        {getFieldError(state, "endsAt") ? (
          <p className="mt-2 text-sm text-error">
            {getFieldError(state, "endsAt")}
          </p>
        ) : null}
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

      {/* Botón de guardar */}
      <div className="flex justify-end lg:col-span-2">
        <EditSubscriptionSubmitButton />
      </div>
    </form>
  );
}