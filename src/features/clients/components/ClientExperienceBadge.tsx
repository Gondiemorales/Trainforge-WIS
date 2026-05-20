import type { ExperienceLevel } from "@/generated/prisma/enums";

type ClientExperienceBadgeProps = {
  experienceLevel: ExperienceLevel;
};

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function ClientExperienceBadge({
  experienceLevel,
}: ClientExperienceBadgeProps) {
  return (
    <span className="badge badge-outline">
      {EXPERIENCE_LABELS[experienceLevel]}
    </span>
  );
}