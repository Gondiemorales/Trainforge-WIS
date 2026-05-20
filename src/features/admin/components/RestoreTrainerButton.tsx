// Importamos la acción que restaura trainers.
import { restoreTrainerAction } from "../server/restore-trainer.action";

type RestoreTrainerButtonProps = {
  trainerId: string;
};

// Este botón restaura un trainer archivado.
export function RestoreTrainerButton({
  trainerId,
}: RestoreTrainerButtonProps) {
  return (
    <form action={restoreTrainerAction}>
      <input type="hidden" name="trainerId" value={trainerId} />

      <button type="submit" className="btn btn-success btn-outline btn-xs">
        Restore
      </button>
    </form>
  );
}