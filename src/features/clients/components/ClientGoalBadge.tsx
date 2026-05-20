import type { FitnessGoal } from "@/generated/prisma/enums";

type ClientGoalBadgeProps = {
  goal: FitnessGoal;
};

const GOAL_LABELS: Record<FitnessGoal, string> = {
  FAT_LOSS: "Fat loss",
  MUSCLE_GAIN: "Muscle gain",
  STRENGTH: "Strength",
  ENDURANCE: "Endurance",
  MOBILITY: "Mobility",
  GENERAL_FITNESS: "General fitness",
};

export function ClientGoalBadge({ goal }: ClientGoalBadgeProps) {
  return (
    <span className="badge badge-secondary">
      {GOAL_LABELS[goal]}
    </span>
  );
}