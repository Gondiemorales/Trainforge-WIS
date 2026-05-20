"use server";

// Importamos revalidatePath para refrescar la página después de restaurar.
import { revalidatePath } from "next/cache";

// Importamos Prisma para actualizar el trainer.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el id.
import { restoreTrainerSchema } from "../schemas/trainer.schema";

// Esta Server Action restaura un trainer archivado.
// Vuelve a activar el perfil y el usuario.
export async function restoreTrainerAction(formData: FormData) {
  await requireAdmin();

  const rawData = {
    trainerId: formData.get("trainerId"),
  };

  const parsedData = restoreTrainerSchema.safeParse(rawData);

  if (!parsedData.success) {
    return;
  }

  const trainer = await prisma.trainerProfile.findUnique({
    where: {
      id: parsedData.data.trainerId,
    },
    select: {
      id: true,
      userId: true,
      isArchived: true,
    },
  });

  if (!trainer || !trainer.isArchived) {
    return;
  }

  await prisma.$transaction([
    prisma.trainerProfile.update({
      where: {
        id: trainer.id,
      },
      data: {
        isArchived: false,
        archivedAt: null,
      },
    }),

    prisma.user.update({
      where: {
        id: trainer.userId,
      },
      data: {
        isActive: true,
      },
    }),
  ]);

  revalidatePath("/dashboard/admin/trainers");
}