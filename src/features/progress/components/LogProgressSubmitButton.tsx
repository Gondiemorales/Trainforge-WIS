"use client";

import { useFormStatus } from "react-dom";

export function LogProgressSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving..." : "Log session"}
    </button>
  );
}
