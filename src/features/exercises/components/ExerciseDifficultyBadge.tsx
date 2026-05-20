import type { DifficultyLevel } from "@/generated/prisma/enums";

type ExerciseDifficultyBadgeProps = {
  difficulty: DifficultyLevel;
};

const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; className: string }> = {
  BEGINNER: { label: "Beginner", className: "badge-success" },
  INTERMEDIATE: { label: "Intermediate", className: "badge-warning" },
  ADVANCED: { label: "Advanced", className: "badge-error" },
};

export function ExerciseDifficultyBadge({ difficulty }: ExerciseDifficultyBadgeProps) {
  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <span className={["badge badge-outline", config.className].join(" ")}>
      {config.label}
    </span>
  );
}
