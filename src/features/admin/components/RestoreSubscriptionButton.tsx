// Importamos la acción del servidor que restaura la suscripción.
import { restoreSubscriptionAction } from "../server/restore-subscription.action";

// Este tipo define los datos que necesita el botón.
type RestoreSubscriptionButtonProps = {
  subscriptionId: string;
};

// Este componente muestra un botón para restaurar una suscripción archivada.
// Usa un form porque las Server Actions pueden ejecutarse desde formularios.
export function RestoreSubscriptionButton({
  subscriptionId,
}: RestoreSubscriptionButtonProps) {
  return (
    <form action={restoreSubscriptionAction}>
      {/* Enviamos el id de la suscripción al servidor */}
      <input
        type="hidden"
        name="subscriptionId"
        value={subscriptionId}
      />

      <button
        type="submit"
        className="btn btn-success btn-outline btn-xs"
      >
        Restore
      </button>
    </form>
  );
}