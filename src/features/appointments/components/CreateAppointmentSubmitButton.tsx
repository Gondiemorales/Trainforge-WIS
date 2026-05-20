"use client";

import { useFormStatus } from "react-dom";

export function CreateAppointmentSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Scheduling..." : "Schedule appointment"}
    </button>
  );
}
