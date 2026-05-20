"use client";

import { useActionState } from "react";

import { restoreClientAction } from "@/features/clients/server/restore-client.action";
import type { ClientFormState } from "@/features/clients/types/client.types";

const INITIAL_STATE: ClientFormState = {
  success: false,
  message: "",
};

type RestoreClientButtonProps = {
  clientId: string;
};

export function RestoreClientButton({
  clientId,
}: RestoreClientButtonProps) {
  const [state, formAction] = useActionState(
    restoreClientAction,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="clientId" value={clientId} />

      <button
        type="submit"
        className="btn btn-sm btn-success btn-outline"
      >
        Restore
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