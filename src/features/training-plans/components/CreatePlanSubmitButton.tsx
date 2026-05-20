"use client";

import { useFormStatus } from "react-dom";

export function CreatePlanSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Creating..." : "Create plan"}
    </button>
  );
}
