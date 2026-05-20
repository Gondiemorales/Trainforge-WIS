"use client";

import { useActionState } from "react";

import { archiveClientAction } from "@/features/clients/server/archive-client.action";
import type { ClientFormState } from "@/features/clients/types/client.types";

const INITIAL_STATE: ClientFormState = {
  success: false,
  message: "",
};

type ArchiveClientButtonProps = {
  clientId: string;
};

export function ArchiveClientButton({
  clientId,
}: ArchiveClientButtonProps) {
  const [state, formAction] = useActionState(
    archiveClientAction,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="clientId" value={clientId} />

      <button
        type="submit"
        className="btn btn-sm btn-error btn-outline"
      >
        Archive
      </button>

      {state.message ? (
        <p
          className={[
            "text-xs",
            state.success ? "text-success" : "text-error",
          ].join(" ")}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}