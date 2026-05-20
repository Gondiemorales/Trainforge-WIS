import type { PlanDetail } from "@/features/training-plans/types/training-plan.types";

import { PlanDetailExerciseCard } from "./PlanDetailExerciseCard";

type PlanDetailExercisesListProps = {
  plan: PlanDetail;
};

export function PlanDetailExercisesList({ plan }: PlanDetailExercisesListProps) {
  if (plan.exercises.length === 0) {
    return (
      <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
        <h2 className="text-xl font-bold">No exercises yet</h2>
        <p className="mt-2 text-base-content/60">
          {plan.status === "ARCHIVED"
            ? "This plan was archived with no exercises."
            : "Add exercises below to build this training plan."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {plan.exercises.map((exercise) => (
        <PlanDetailExerciseCard
          key={exercise.id}
          exercise={exercise}
          planStatus={plan.status}
        />
      ))}
    </div>
  );
}
