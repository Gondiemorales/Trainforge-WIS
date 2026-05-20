import Link from "next/link";

type ExercisesFiltersProps = {
  archived: boolean;
  difficulty?: string;
};

const DIFFICULTY_OPTIONS = [
  { value: "", label: "All levels" },
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

function buildHref(archived: boolean, difficulty?: string, overrides?: { archived?: boolean; difficulty?: string }) {
  const params = new URLSearchParams();

  const resolvedArchived = overrides?.archived ?? archived;
  const resolvedDifficulty = overrides?.difficulty !== undefined ? overrides.difficulty : (difficulty ?? "");

  if (resolvedArchived) {
    params.set("archived", "true");
  }

  if (resolvedDifficulty) {
    params.set("difficulty", resolvedDifficulty);
  }

  const query = params.toString();

  return query ? `/dashboard/trainer/exercises?${query}` : "/dashboard/trainer/exercises";
}

export function ExercisesFilters({ archived, difficulty }: ExercisesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-base-100 p-4 shadow-md md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div>
          <p className="mb-1 text-sm font-bold">Status</p>

          <div className="join">
            <Link
              href={buildHref(false, difficulty)}
              className={["btn btn-sm join-item", !archived ? "btn-primary" : "btn-ghost"].join(" ")}
            >
              Active
            </Link>

            <Link
              href={buildHref(true, difficulty)}
              className={["btn btn-sm join-item", archived ? "btn-primary" : "btn-ghost"].join(" ")}
            >
              Archived
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm font-bold">Difficulty</p>

          <div className="join">
            {DIFFICULTY_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={buildHref(archived, difficulty, { difficulty: option.value })}
                className={[
                  "btn btn-sm join-item",
                  (difficulty ?? "") === option.value ? "btn-secondary" : "btn-ghost",
                ].join(" ")}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
