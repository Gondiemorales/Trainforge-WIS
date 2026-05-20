"use client";

import { useActionState } from "react";

import { updateAppointmentStatusAction } from "@/features/appointments/server/update-appointment-status.action";
import type { AppointmentFormState } from "@/features/appointments/types/appointment.types";

const INITIAL_STATE: AppointmentFormState = { success: false, message: "" };

export function CompleteAppointmentButton({ appointmentId }: { appointmentId: string }) {
  const [state, formAction] = useActionState(updateAppointmentStatusAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-1">
      <input type="hidden" name="appointmentId" value={appointmentId} />
      <input type="hidden" name="status" value="COMPLETED" />
      <button type="submit" className="btn btn-sm btn-success btn-outline">Complete</button>
      {state.message && !state.success ? (
        <p className="text-xs text-error">{state.message}</p>
      ) : null}
    </form>
  );
}
