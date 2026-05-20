"use client";

import { useFormStatus } from "react-dom";

export function GeneratePlanSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary w-full" disabled={pending}>
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="loading loading-spinner loading-sm" />
          Generating plan... (this may take a few seconds)
        </span>
      ) : (
        "Generate nutrition plan"
      )}
    </button>
  );
}
