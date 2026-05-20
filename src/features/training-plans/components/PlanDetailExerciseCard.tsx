import type { PlanExerciseItem } from "@/features/training-plans/types/training-plan.types";
import type { TrainingPlanStatus } from "@/generated/prisma/enums";

import { RemovePlanExerciseButton } from "./RemovePlanExerciseButton";

type PlanDetailExerciseCardProps = {
  exercise: PlanExerciseItem;
  planStatus: TrainingPlanStatus;
};

const DAY_LABELS: Record<number, string> = {
  1: "Monday", 2: "Tuesday", 3: "Wednesday",
  4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday",
};

const DIFFICULTY_CLASSES: Record<string, string> = {
  BEGINNER: "badge-success",
  INTERMEDIATE: "badge-warning",
  ADVANCED: "badge-error",
};

function formatOptional(value: string | number | null) {
  return value !== null && value !== "" ? value : "—";
}

export function PlanDetailExerciseCard({ exercise, planStatus }: PlanDetailExerciseCardProps) {
  const canRemove = planStatus !== "ARCHIVED";

  return (
    <div className="rounded-2xl bg-base-100 p-5 shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-base-content/40">#{exercise.position}</span>
            <h3 className="text-lg font-bold">{exercise.exerciseName}</h3>
            <span className={["badge badge-outline badge-sm", DIFFICULTY_CLASSES[exercise.difficulty] ?? ""].join(" ")}>
              {exercise.difficulty.charAt(0) + exercise.difficulty.slice(1).toLowerCase()}
            </span>
          </div>

          <p className="mt-1 text-sm text-base-content/60">{exercise.muscleGroup}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span className="font-semibold">{exercise.sets} sets × {exercise.reps} reps</span>
            {exercise.restSeconds ? <span>Rest: {exercise.restSeconds}s</span> : null}
            {exercise.intensity ? <span>Intensity: {exercise.intensity}</span> : null}
            {exercise.dayOfWeek ? (
              <span className="badge badge-ghost">{DAY_LABELS[exercise.dayOfWeek] ?? `Day ${exercise.dayOfWeek}`}</span>
            ) : null}
          </div>

          {exercise.description ? (
            <p className="mt-2 text-sm text-base-content/70">{exercise.description}</p>
          ) : null}

          {exercise.notes ? (
            <p className="mt-1 text-xs text-base-content/50">Note: {exercise.notes}</p>
          ) : null}
        </div>

        {canRemove ? (
          <div className="shrink-0">
            <RemovePlanExerciseButton planExerciseId={exercise.id} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
