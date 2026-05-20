"use client";

import { useFormStatus } from "react-dom";

export function CreateExerciseSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Creating..." : "Create exercise"}
    </button>
  );
}
