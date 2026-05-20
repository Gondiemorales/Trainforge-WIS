"use client";

import { useFormStatus } from "react-dom";

export function CreateClientSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={pending}
    >
      {pending ? "Creating..." : "Create client"}
    </button>
  );
}