"use client";

import { useActionState, useState } from "react";

import { createAppointmentAction } from "@/features/appointments/server/create-appointment.action";
import type { AppointmentFormState } from "@/features/appointments/types/appointment.types";
import { AppointmentType } from "@/generated/prisma/enums";

import { CreateAppointmentSubmitButton } from "./CreateAppointmentSubmitButton";

const DIALOG_ID = "create-appointment-dialog";
const INITIAL_STATE: AppointmentFormState = { success: false, message: "" };

const TYPE_OPTIONS = [
  [AppointmentType.VIDEO_CALL, "Video call"],
  [AppointmentType.IN_PERSON, "In person"],
  [AppointmentType.CONSULTATION, "Consultation"],
] as const;

type ClientOption = { id: string; name: string };
type CreateAppointmentFormProps = { clients: ClientOption[] };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function closeDialog() {
  const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement | null;
  dialog?.close();
}

export function CreateAppointmentForm({ clients }: CreateAppointmentFormProps) {
  const [state, formAction] = useActionState(createAppointmentAction, INITIAL_STATE);
  const [type, setType] = useState<AppointmentType>(AppointmentType.VIDEO_CALL);

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="title" className="text-sm font-semibold">Title</label>
          <input id="title" name="title" type="text" className="input input-bordered w-full" placeholder="e.g. Weekly check-in" required />
          <FieldError message={state.errors?.title?.[0]} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="clientId" className="text-sm font-semibold">Client</label>
          {clients.length === 0 ? (
            <p className="text-sm text-warning">No active clients found.</p>
          ) : (
            <select id="clientId" name="clientId" className="select select-bordered w-full" required>
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          <FieldError message={state.errors?.clientId?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-sm font-semibold">Type</label>
          <select
            id="type"
            name="type"
            className="select select-bordered w-full"
            value={type}
            onChange={(e) => setType(e.target.value as AppointmentType)}
          >
            {TYPE_OPTIONS.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <FieldError message={state.errors?.type?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="startTime" className="text-sm font-semibold">Start time</label>
          <input id="startTime" name="startTime" type="datetime-local" className="input input-bordered w-full" required />
          <FieldError message={state.errors?.startTime?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="endTime" className="text-sm font-semibold">End time</label>
          <input id="endTime" name="endTime" type="datetime-local" className="input input-bordered w-full" required />
          <FieldError message={state.errors?.endTime?.[0]} />
        </div>

        {type === AppointmentType.VIDEO_CALL ? (
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="meetingUrl" className="text-sm font-semibold">Meeting URL (optional)</label>
            <input id="meetingUrl" name="meetingUrl" type="url" className="input input-bordered w-full" placeholder="https://meet.google.com/..." />
            <FieldError message={state.errors?.meetingUrl?.[0]} />
          </div>
        ) : null}

        {type === AppointmentType.IN_PERSON ? (
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="location" className="text-sm font-semibold">Location (optional)</label>
            <input id="location" name="location" type="text" className="input input-bordered w-full" placeholder="Gym name, address..." />
            <FieldError message={state.errors?.location?.[0]} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-semibold">Notes (optional)</label>
        <textarea id="notes" name="notes" className="textarea textarea-bordered w-full resize-y" placeholder="Preparation notes, agenda..." />
        <FieldError message={state.errors?.notes?.[0]} />
      </div>

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={closeDialog}>Close</button>
        <CreateAppointmentSubmitButton />
      </div>
    </form>
  );
}
