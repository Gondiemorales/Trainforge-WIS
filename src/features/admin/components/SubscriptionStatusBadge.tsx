// Importamos el tipo de estado generado por Prisma.
// Así solo aceptamos estados reales de suscripción.
import type { SubscriptionStatus } from "@/generated/prisma/enums";

// Este tipo define los datos que necesita el badge.
type SubscriptionStatusBadgeProps = {
  status: SubscriptionStatus;
};

// Esta función devuelve el estilo visual según el estado.
// Así podemos distinguir rápido entre activo, cancelado o archivado.
function getStatusBadgeClass(status: SubscriptionStatus) {
  if (status === "ACTIVE") {
    return "badge badge-success";
  }

  if (status === "PAST_DUE") {
    return "badge badge-warning";
  }

  if (status === "CANCELLED") {
    return "badge badge-error";
  }

  return "badge badge-neutral";
}

// Este componente muestra el estado de suscripción como una etiqueta visual.
export function SubscriptionStatusBadge({
  status,
}: SubscriptionStatusBadgeProps) {
  return (
    <span className={getStatusBadgeClass(status)}>
      {status.replace("_", " ")}
    </span>
  );
}