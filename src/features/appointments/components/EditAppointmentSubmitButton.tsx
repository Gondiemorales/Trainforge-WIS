"use client";

import { useFormStatus } from "react-dom";

export function EditAppointmentSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}
