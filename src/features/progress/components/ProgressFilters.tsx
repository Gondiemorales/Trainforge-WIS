import Link from "next/link";

type SelectOption = { id: string; name: string };

type ProgressFiltersProps = {
  clients: SelectOption[];
  exercises: { id: string; name: string; muscleGroup: string }[];
  selectedClientId?: string;
  selectedExerciseId?: string;
};

function buildHref(clientId?: string, exerciseId?: string) {
  const params = new URLSearchParams();
  if (clientId) params.set("clientId", clientId);
  if (exerciseId) params.set("exerciseId", exerciseId);
  const q = params.toString();
  return q ? `/dashboard/trainer/progress?${q}` : "/dashboard/trainer/progress";
}

export function ProgressFilters({
  clients,
  exercises,
  selectedClientId,
  selectedExerciseId,
}: ProgressFiltersProps) {
  return (
    <div className="rounded-2xl bg-base-100 p-4 shadow-md">
      <h2 className="mb-3 font-bold">Filter logs</h2>

      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-base-content/60">Client</label>
          <div className="flex flex-wrap gap-1">
            <Link
              href={buildHref(undefined, selectedExerciseId)}
              className={["btn btn-sm", !selectedClientId ? "btn-primary" : "btn-ghost"].join(" ")}
            >
              All clients
            </Link>
            {clients.map((c) => (
              <Link
                key={c.id}
                href={buildHref(c.id, selectedExerciseId)}
                className={["btn btn-sm", selectedClientId === c.id ? "btn-primary" : "btn-ghost"].join(" ")}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {selectedClientId ? (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-base-content/60">Exercise</label>
            <div className="flex flex-wrap gap-1">
              <Link
                href={buildHref(selectedClientId, undefined)}
                className={["btn btn-sm", !selectedExerciseId ? "btn-secondary" : "btn-ghost"].join(" ")}
              >
                All exercises
              </Link>
              {exercises.map((e) => (
                <Link
                  key={e.id}
                  href={buildHref(selectedClientId, e.id)}
                  className={["btn btn-sm", selectedExerciseId === e.id ? "btn-secondary" : "btn-ghost"].join(" ")}
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
