import { CreateExerciseDialog } from "@/features/exercises/components/CreateExerciseDialog";
import { ExercisePagination } from "@/features/exercises/components/ExercisePagination";
import { ExercisesFilters } from "@/features/exercises/components/ExercisesFilters";
import { ExercisesPageHeader } from "@/features/exercises/components/ExercisesPageHeader";
import { ExercisesTable } from "@/features/exercises/components/ExercisesTable";
import { getTrainerExercises } from "@/features/exercises/server/get-trainer-exercises.query";
import { requireTrainer } from "@/lib/permissions";

type TrainerExercisesPageProps = {
  searchParams: Promise<{
    page?: string;
    archived?: string;
    difficulty?: string;
  }>;
};

function parsePage(page?: string) {
  if (!page) return 1;
  const parsed = Number(page);
  if (Number.isNaN(parsed)) return 1;
  return Math.max(parsed, 1);
}

function parseArchived(archived?: string) {
  return archived === "true";
}

export default async function TrainerExercisesPage({
  searchParams,
}: TrainerExercisesPageProps) {
  await requireTrainer();

  const params = await searchParams;
  const page = parsePage(params.page);
  const archived = parseArchived(params.archived);
  const difficulty = params.difficulty;

  const { exercises, pagination } = await getTrainerExercises({
    page,
    archived,
    difficulty,
  });

  return (
    <div className="space-y-6">
      <ExercisesPageHeader
        totalItems={pagination.totalItems}
        archived={archived}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <ExercisesFilters archived={archived} difficulty={difficulty} />

        {!archived ? <CreateExerciseDialog /> : null}
      </div>

      <ExercisesTable exercises={exercises} archived={archived} />

      <ExercisePagination
        pagination={pagination}
        archived={archived}
        difficulty={difficulty}
      />
    </div>
  );
}
