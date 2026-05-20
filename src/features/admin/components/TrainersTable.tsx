// Importamos el tipo que representa un trainer listo para mostrar.
import type { TrainerListItem } from "../types/trainer.types";

// Importamos el botón real para archivar trainers.
import { ArchiveTrainerButton } from "./ArchiveTrainerButton";

// Importamos el modal real para editar trainers.
import { EditTrainerDialog } from "./EditTrainerDialog";

// Importamos el botón real para restaurar trainers.
import { RestoreTrainerButton } from "./RestoreTrainerButton";

// Importamos el badge que muestra si el perfil está archivado.
import { TrainerArchiveBadge } from "./TrainerArchiveBadge";

// Importamos el badge que muestra si el usuario está activo.
import { TrainerStatusBadge } from "./TrainerStatusBadge";

type TrainersTableProps = {
  trainers: TrainerListItem[];
};

// Esta función formatea fechas para mostrarlas de forma clara en la tabla.
function formatDate(date: Date | null) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Este componente muestra la tabla de trainers.
export function TrainersTable({ trainers }: TrainersTableProps) {
  if (trainers.length === 0) {
    return (
      <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-black">No trainers found</h2>

          <p className="mt-2 text-base-content/60">
            There are no trainers matching the current filter.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-base-100 shadow-xl">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Specialty</th>
              <th>Hourly rate</th>
              <th>User status</th>
              <th>Profile status</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id}>
                <td>
                  <div>
                    <p className="font-semibold">{trainer.name}</p>

                    <p className="text-sm text-base-content/60">
                      {trainer.email}
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p className="font-medium">{trainer.specialty}</p>

                    {trainer.bio ? (
                      <p className="mt-1 max-w-xs truncate text-sm text-base-content/60">
                        {trainer.bio}
                      </p>
                    ) : null}
                  </div>
                </td>

                <td>${trainer.hourlyRate}</td>

                <td>
                  <TrainerStatusBadge isActive={trainer.isActive} />
                </td>

                <td>
                  <TrainerArchiveBadge isArchived={trainer.isArchived} />
                </td>

                <td>{formatDate(trainer.createdAt)}</td>

                <td>
                  <div className="flex justify-end gap-2">
                    <EditTrainerDialog trainer={trainer} />

                    {trainer.isArchived ? (
                      <RestoreTrainerButton trainerId={trainer.id} />
                    ) : (
                      <ArchiveTrainerButton
                        trainerId={trainer.id}
                        isArchived={trainer.isArchived}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}