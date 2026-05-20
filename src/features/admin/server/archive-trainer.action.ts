"use server";

// Importamos revalidatePath para refrescar la página después de archivar.
import { revalidatePath } from "next/cache";

// Importamos Prisma para actualizar el trainer.
import { prisma } from "@/lib/prisma";

// Importamos el helper que exige rol de administrador.
import { requireAdmin } from "@/lib/permissions";

// Importamos el schema que valida el id.
import { archiveTrainerSchema } from "../schemas/trainer.schema";

// Esta Server Action archiva un trainer.
// No lo borra: marca su perfil como archivado y desactiva su usuario.
export async function archiveTrainerAction(formData: FormData) {
  await requireAdmin();

  const rawData = {
    trainerId: formData.get("trainerId"),
  };

  const parsedData = archiveTrainerSchema.safeParse(rawData);

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

  if (!trainer || trainer.isArchived) {
    return;
  }

  await prisma.$transaction([
    prisma.trainerProfile.update({
      where: {
        id: trainer.id,
      },
      data: {
        isArchived: true,
        archivedAt: new Date(),
      },
    }),

    prisma.user.update({
      where: {
        id: trainer.userId,
      },
      data: {
        isActive: false,
      },
    }),
  ]);

  revalidatePath("/dashboard/admin/trainers");
}