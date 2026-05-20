"use client";

import { useState } from "react";

import type { ExerciseListItem } from "@/features/exercises/types/exercise.types";

import { ArchiveExerciseButton } from "./ArchiveExerciseButton";
import { EditExerciseDialog } from "./EditExerciseDialog";
import { ExerciseDifficultyBadge } from "./ExerciseDifficultyBadge";
import { RestoreExerciseButton } from "./RestoreExerciseButton";

type ExerciseTableRowProps = {
  exercise: ExerciseListItem;
};

function formatOptionalValue(value: string | number | null) {
  if (value === null || value === "") {
    return "—";
  }

  return value;
}

function formatDate(value: Date | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function ExerciseDetails({ exercise }: ExerciseTableRowProps) {
  return (
    <tr>
      <td colSpan={7} className="bg-base-200/60">
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Description</h3>

            <p className="mt-2 text-sm text-base-content/70">{exercise.description}</p>
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Instructions</h3>

            <p className="mt-2 text-sm text-base-content/70">
              {formatOptionalValue(exercise.instructions)}
            </p>
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Default load</h3>

            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p>Sets: {formatOptionalValue(exercise.defaultSets)}</p>
              <p>Reps: {formatOptionalValue(exercise.defaultReps)}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Metadata</h3>

            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p>Source: {exercise.isGlobal ? "Global (system)" : "Custom (yours)"}</p>
              <p>Created: {formatDate(exercise.createdAt)}</p>
              <p>Archived: {formatDate(exercise.archivedAt)}</p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function ExerciseTableRow({ exercise }: ExerciseTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr>
        <td>
          <div className="font-bold">{exercise.name}</div>

          {exercise.isGlobal ? (
            <div className="mt-1">
              <span className="badge badge-ghost badge-sm">Global</span>
            </div>
          ) : (
            <div className="mt-1">
              <span className="badge badge-primary badge-sm badge-outline">Custom</span>
            </div>
          )}
        </td>

        <td>{exercise.muscleGroup}</td>

        <td>
          <ExerciseDifficultyBadge difficulty={exercise.difficulty} />
        </td>

        <td>{formatOptionalValue(exercise.defaultSets)}</td>

        <td>{formatOptionalValue(exercise.defaultReps)}</td>

        <td>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm btn-info btn-outline"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? "Hide details" : "View details"}
            </button>

            <EditExerciseDialog exercise={exercise} />

            {exercise.isOwned && !exercise.isArchived ? (
              <ArchiveExerciseButton exerciseId={exercise.id} />
            ) : null}

            {exercise.isOwned && exercise.isArchived ? (
              <RestoreExerciseButton exerciseId={exercise.id} />
            ) : null}
          </div>
        </td>
      </tr>

      {isOpen ? <ExerciseDetails exercise={exercise} /> : null}
    </>
  );
}
