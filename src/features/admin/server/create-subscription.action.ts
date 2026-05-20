"use server";

// Importamos revalidatePath para refrescar la página después de crear datos.
import { revalidatePath } from "next/cache";

// Importamos Prisma para guardar la nueva suscripción en la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el formulario de creación.
import { createSubscriptionSchema } from "../schemas/subscription.schema";

// Importamos el tipo del estado que devuelve el formulario.
import type { SubscriptionFormState } from "../types/subscription.types";

// Esta función convierte una fecha de formulario en Date.
// Si el campo viene vacío, devuelve undefined para dejar que Prisma use defaults.
function parseOptionalDate(value?: string) {
  if (!value) {
    return undefined;
  }

  return new Date(value);
}

// Esta Server Action crea una nueva suscripción.
// Se ejecuta en el servidor cuando el admin envía el formulario.
export async function createSubscriptionAction(
  _previousState: SubscriptionFormState,
  formData: FormData,
): Promise<SubscriptionFormState> {
  // Comprobamos que solo un ADMIN pueda crear suscripciones.
  await requireAdmin();

  // Convertimos FormData en un objeto normal para poder validarlo.
  const rawData = {
    trainerId: formData.get("trainerId"),
    plan: formData.get("plan"),
    status: formData.get("status"),
    monthlyPrice: formData.get("monthlyPrice"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
  };

  // Validamos los datos usando Zod.
  const parsedData = createSubscriptionSchema.safeParse(rawData);

  // Si hay errores de validación, los devolvemos al formulario.
  if (!parsedData.success) {
    return {
      success: false,
      message: "Please check the subscription form.",
      fieldErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  // Comprobamos que el trainer existe y no está archivado.
  const trainer = await prisma.trainerProfile.findFirst({
    where: {
      id: parsedData.data.trainerId,
      isArchived: false,
      user: {
        isActive: true,
        role: "TRAINER",
      },
    },
    select: {
      id: true,
    },
  });

  // Si el trainer no existe, devolvemos un error claro.
  if (!trainer) {
    return {
      success: false,
      message: "Selected trainer does not exist or is archived.",
    };
  }

  // Si se crea directamente como ARCHIVED, guardamos también los campos de archivo.
  const isArchived = parsedData.data.status === "ARCHIVED";

  // Creamos la suscripción en la base de datos.
  await prisma.subscription.create({
    data: {
      trainerId: parsedData.data.trainerId,
      plan: parsedData.data.plan,
      status: parsedData.data.status,
      monthlyPrice: parsedData.data.monthlyPrice,
      startsAt: parseOptionalDate(parsedData.data.startsAt),
      endsAt: parseOptionalDate(parsedData.data.endsAt),
      isArchived,
      archivedAt: isArchived ? new Date() : null,
    },
  });

  // Refrescamos la página de suscripciones para mostrar el nuevo dato.
  revalidatePath("/dashboard/admin/subscriptions");

  // Devolvemos un mensaje de éxito al formulario.
  return {
    success: true,
    message: "Subscription created successfully.",
  };
}