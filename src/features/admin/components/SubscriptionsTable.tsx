// Importamos el tipo que representa una suscripción lista para mostrar.
import type { SubscriptionListItem } from "../types/subscription.types";

// Importamos el botón real para archivar suscripciones.
import { ArchiveSubscriptionButton } from "./ArchiveSubscriptionButton";

// Importamos el modal real para editar suscripciones.
import { EditSubscriptionDialog } from "./EditSubscriptionDialog";

// Importamos el botón real para restaurar suscripciones archivadas.
import { RestoreSubscriptionButton } from "./RestoreSubscriptionButton";

// Importamos el badge visual para mostrar el plan.
import { SubscriptionPlanBadge } from "./SubscriptionPlanBadge";

// Importamos el badge visual para mostrar el estado.
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";

type SubscriptionsTableProps = {
  subscriptions: SubscriptionListItem[];
};

// Esta función formatea fechas para mostrarlas en la tabla.
function formatDisplayDate(date: Date | null) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Esta función convierte una fecha en formato válido para inputs type="date".
function formatInputDate(date: Date | null) {
  if (!date) {
    return "";
  }

  return date.toISOString().split("T")[0];
}

// Este componente muestra una tabla de suscripciones.
export function SubscriptionsTable({
  subscriptions,
}: SubscriptionsTableProps) {
  if (subscriptions.length === 0) {
    return (
      <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-black">No subscriptions found</h2>

          <p className="mt-2 text-base-content/60">
            There are no subscriptions matching the current filter.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-base-100 shadow-xl">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Monthly price</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Archived</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  <div>
                    <p className="font-semibold">
                      {subscription.trainerName}
                    </p>

                    <p className="text-sm text-base-content/60">
                      {subscription.trainerEmail}
                    </p>
                  </div>
                </td>

                <td>
                  <SubscriptionPlanBadge plan={subscription.plan} />
                </td>

                <td>
                  <SubscriptionStatusBadge status={subscription.status} />
                </td>

                <td>${subscription.monthlyPrice}</td>

                <td>{formatDisplayDate(subscription.startsAt)}</td>

                <td>{formatDisplayDate(subscription.endsAt)}</td>

                <td>
                  {subscription.isArchived ? (
                    <span className="badge badge-neutral">Archived</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>

                <td>
                  <div className="flex justify-end gap-2">
                    <EditSubscriptionDialog
                      subscription={{
                        id: subscription.id,
                        trainerName: subscription.trainerName,
                        plan: subscription.plan,
                        status: subscription.status,
                        monthlyPrice: subscription.monthlyPrice,
                        startsAt: formatInputDate(subscription.startsAt),
                        endsAt: formatInputDate(subscription.endsAt),
                        isArchived: subscription.isArchived,
                      }}
                    />

                    {subscription.isArchived ? (
                      <RestoreSubscriptionButton
                        subscriptionId={subscription.id}
                      />
                    ) : (
                      <ArchiveSubscriptionButton
                        subscriptionId={subscription.id}
                        isArchived={subscription.isArchived}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}