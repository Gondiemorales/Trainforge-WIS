import type { ExerciseListItem } from "@/features/exercises/types/exercise.types";

import { ExerciseTableRow } from "./ExerciseTableRow";

type ExercisesTableProps = {
  exercises: ExerciseListItem[];
  archived: boolean;
};

export function ExercisesTable({ exercises, archived }: ExercisesTableProps) {
  if (exercises.length === 0) {
    return (
      <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
        <h2 className="text-xl font-bold">
          No {archived ? "archived" : "active"} exercises found
        </h2>

        <p className="mt-2 text-base-content/60">
          {archived
            ? "Archived exercises will appear here."
            : "Create your first custom exercise or adjust the filters to see global exercises."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-base-100 shadow-md">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Muscle group</th>
              <th>Difficulty</th>
              <th>Sets</th>
              <th>Reps</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exercises.map((exercise) => (
              <ExerciseTableRow key={exercise.id} exercise={exercise} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
