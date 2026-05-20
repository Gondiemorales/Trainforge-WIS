"use client";

import { useActionState } from "react";

import { deleteProgressLogAction } from "@/features/progress/server/delete-progress-log.action";
import type { ProgressFormState } from "@/features/progress/types/progress.types";

const INITIAL_STATE: ProgressFormState = { success: false, message: "" };

export function DeleteProgressLogButton({ logId }: { logId: string }) {
  const [, formAction] = useActionState(deleteProgressLogAction, INITIAL_STATE);

  return (
    <form action={formAction}>
      <input type="hidden" name="logId" value={logId} />
      <button type="submit" className="btn btn-xs btn-error btn-outline">
        Delete
      </button>
    </form>
  );
}
