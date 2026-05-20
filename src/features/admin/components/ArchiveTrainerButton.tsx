// Importamos la acción que archiva trainers.
import { archiveTrainerAction } from "../server/archive-trainer.action";

type ArchiveTrainerButtonProps = {
  trainerId: string;
  isArchived: boolean;
};

// Este botón archiva un trainer sin borrarlo de la base de datos.
export function ArchiveTrainerButton({
  trainerId,
  isArchived,
}: ArchiveTrainerButtonProps) {
  if (isArchived) {
    return (
      <button className="btn btn-ghost btn-xs" disabled>
        Archived
      </button>
    );
  }

  return (
    <form action={archiveTrainerAction}>
      <input type="hidden" name="trainerId" value={trainerId} />

      <button type="submit" className="btn btn-error btn-outline btn-xs">
        Archive
      </button>
    </form>
  );
}