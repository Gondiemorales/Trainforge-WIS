"use server";

// Importamos revalidatePath para refrescar la página después de archivar.
import { revalidatePath } from "next/cache";

// Importamos Prisma para actualizar la suscripción en la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el id de la suscripción.
import { archiveSubscriptionSchema } from "../schemas/subscription.schema";

// Esta Server Action archiva una suscripción.
// No borra el registro: solo lo marca como archivado.
export async function archiveSubscriptionAction(formData: FormData) {
  // Comprobamos que solo un ADMIN pueda archivar suscripciones.
  await requireAdmin();

  // Convertimos FormData en un objeto normal para validarlo.
  const rawData = {
    subscriptionId: formData.get("subscriptionId"),
  };

  // Validamos que el id sea correcto.
  const parsedData = archiveSubscriptionSchema.safeParse(rawData);

  // Si el id no es válido, paramos la acción.
  if (!parsedData.success) {
    return;
  }

  // Buscamos la suscripción para comprobar que existe.
  const subscription = await prisma.subscription.findUnique({
    where: {
      id: parsedData.data.subscriptionId,
    },
    select: {
      id: true,
      isArchived: true,
    },
  });

  // Si no existe o ya está archivada, no hacemos nada.
  if (!subscription || subscription.isArchived) {
    return;
  }

  // Archivamos la suscripción sin eliminarla de la base de datos.
  await prisma.subscription.update({
    where: {
      id: subscription.id,
    },
    data: {
      status: "ARCHIVED",
      isArchived: true,
      archivedAt: new Date(),
    },
  });

  // Refrescamos las vistas de suscripciones activas y archivadas.
  revalidatePath("/dashboard/admin/subscriptions");
}