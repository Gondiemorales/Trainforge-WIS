"use server";

// Importamos revalidatePath para refrescar la página después de restaurar.
import { revalidatePath } from "next/cache";

// Importamos Prisma para actualizar la suscripción en la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el id de la suscripción.
import { restoreSubscriptionSchema } from "../schemas/subscription.schema";

// Esta Server Action restaura una suscripción archivada.
// No crea una suscripción nueva: vuelve a activar la existente.
export async function restoreSubscriptionAction(formData: FormData) {
  // Comprobamos que solo un ADMIN pueda restaurar suscripciones.
  await requireAdmin();

  // Convertimos FormData en un objeto normal para validarlo.
  const rawData = {
    subscriptionId: formData.get("subscriptionId"),
  };

  // Validamos que el id sea correcto.
  const parsedData = restoreSubscriptionSchema.safeParse(rawData);

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

  // Si no existe o no está archivada, no hacemos nada.
  if (!subscription || !subscription.isArchived) {
    return;
  }

  // Restauramos la suscripción.
  await prisma.subscription.update({
    where: {
      id: subscription.id,
    },
    data: {
      status: "ACTIVE",
      isArchived: false,
      archivedAt: null,
    },
  });

  // Refrescamos la página de suscripciones.
  revalidatePath("/dashboard/admin/subscriptions");
}