"use server";

// Importamos revalidatePath para refrescar la página después de editar.
import { revalidatePath } from "next/cache";

// Importamos Prisma para actualizar la suscripción en la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el formulario de edición.
import { updateSubscriptionSchema } from "../schemas/subscription.schema";

// Importamos el tipo del estado que devuelve el formulario.
import type { SubscriptionFormState } from "../types/subscription.types";

// Esta función convierte una fecha de formulario en Date.
// Si el campo viene vacío, devuelve null para limpiar la fecha.
function parseNullableDate(value?: string) {
  if (!value) {
    return null;
  }

  return new Date(value);
}

// Esta Server Action edita una suscripción existente.
// Se ejecuta en el servidor cuando el admin envía el formulario de edición.
export async function updateSubscriptionAction(
  _previousState: SubscriptionFormState,
  formData: FormData,
): Promise<SubscriptionFormState> {
  // Comprobamos que solo un ADMIN pueda editar suscripciones.
  await requireAdmin();

  // Convertimos FormData en un objeto normal para poder validarlo.
  const rawData = {
    subscriptionId: formData.get("subscriptionId"),
    plan: formData.get("plan"),
    status: formData.get("status"),
    monthlyPrice: formData.get("monthlyPrice"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
  };

  // Validamos los datos usando Zod.
  const parsedData = updateSubscriptionSchema.safeParse(rawData);

  // Si hay errores de validación, los devolvemos al formulario.
  if (!parsedData.success) {
    return {
      success: false,
      message: "Please check the subscription form.",
      fieldErrors: parsedData.error.flatten().fieldErrors,
    };
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

  // Si no existe, devolvemos error.
  if (!subscription) {
    return {
      success: false,
      message: "Subscription not found.",
    };
  }

  // Para mantener el histórico limpio, no editamos suscripciones ya archivadas.
  if (subscription.isArchived) {
    return {
      success: false,
      message: "Archived subscriptions cannot be edited.",
    };
  }

  // Si el admin cambia el status a ARCHIVED desde el formulario,
  // también marcamos la suscripción como archivada.
  const shouldArchive = parsedData.data.status === "ARCHIVED";

  // Actualizamos la suscripción en la base de datos.
  await prisma.subscription.update({
    where: {
      id: subscription.id,
    },
    data: {
      plan: parsedData.data.plan,
      status: parsedData.data.status,
      monthlyPrice: parsedData.data.monthlyPrice,
      startsAt: parseNullableDate(parsedData.data.startsAt) ?? new Date(),
      endsAt: parseNullableDate(parsedData.data.endsAt),
      isArchived: shouldArchive,
      archivedAt: shouldArchive ? new Date() : null,
    },
  });

  // Refrescamos la página de suscripciones.
  revalidatePath("/dashboard/admin/subscriptions");

  // Devolvemos mensaje de éxito.
  return {
    success: true,
    message: "Subscription updated successfully.",
  };
}