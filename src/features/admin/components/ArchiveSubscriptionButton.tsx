// Importamos la acción del servidor que archiva la suscripción.
import { archiveSubscriptionAction } from "../server/archive-subscription.action";

// Este tipo define los datos que necesita el botón.
type ArchiveSubscriptionButtonProps = {
  subscriptionId: string;
  isArchived: boolean;
};

// Este componente muestra el botón para archivar una suscripción.
// Usa un form porque las Server Actions pueden ejecutarse desde formularios.
export function ArchiveSubscriptionButton({
  subscriptionId,
  isArchived,
}: ArchiveSubscriptionButtonProps) {
  // Si la suscripción ya está archivada, mostramos el botón desactivado.
  if (isArchived) {
    return (
      <button className="btn btn-ghost btn-xs" disabled>
        Archived
      </button>
    );
  }

  return (
    <form action={archiveSubscriptionAction}>
      {/* Enviamos el id de la suscripción al servidor */}
      <input
        type="hidden"
        name="subscriptionId"
        value={subscriptionId}
      />

      <button
        type="submit"
        className="btn btn-error btn-outline btn-xs"
      >
        Archive
      </button>
    </form>
  );
}