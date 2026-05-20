"use client";

import { useActionState, useState } from "react";

import { updateAppointmentAction } from "@/features/appointments/server/update-appointment.action";
import type {
  AppointmentFormState,
  AppointmentListItem,
} from "@/features/appointments/types/appointment.types";
import { AppointmentType } from "@/generated/prisma/enums";

import { EditAppointmentSubmitButton } from "./EditAppointmentSubmitButton";

const INITIAL_STATE: AppointmentFormState = { success: false, message: "" };

const TYPE_OPTIONS = [
  [AppointmentType.VIDEO_CALL, "Video call"],
  [AppointmentType.IN_PERSON, "In person"],
  [AppointmentType.CONSULTATION, "Consultation"],
] as const;

type EditAppointmentFormProps = { appointment: AppointmentListItem; dialogId: string };

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-sm text-error">{message}</p> : null;
}

function toDatetimeLocal(date: Date) {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function closeDialog(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  dialog?.close();
}

export function EditAppointmentForm({ appointment, dialogId }: EditAppointmentFormProps) {
  const [state, formAction] = useActionState(updateAppointmentAction, INITIAL_STATE);
  const [type, setType] = useState<AppointmentType>(appointment.type);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="appointmentId" value={appointment.id} />
      <input type="hidden" name="clientId" value={appointment.clientId} />

      {state.message ? (
        <div className={["alert", state.success ? "alert-success" : "alert-error"].join(" ")}>
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor={`title-${appointment.id}`} className="text-sm font-semibold">Title</label>
          <input id={`title-${appointment.id}`} name="title" type="text" className="input input-bordered w-full" defaultValue={appointment.title} required />
          <FieldError message={state.errors?.title?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`type-${appointment.id}`} className="text-sm font-semibold">Type</label>
          <select
            id={`type-${appointment.id}`}
            name="type"
            className="select select-bordered w-full"
            value={type}
            onChange={(e) => setType(e.target.value as AppointmentType)}
          >
            {TYPE_OPTIONS.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`startTime-${appointment.id}`} className="text-sm font-semibold">Start time</label>
          <input id={`startTime-${appointment.id}`} name="startTime" type="datetime-local" className="input input-bordered w-full" defaultValue={toDatetimeLocal(appointment.startTime)} required />
          <FieldError message={state.errors?.startTime?.[0]} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`endTime-${appointment.id}`} className="text-sm font-semibold">End time</label>
          <input id={`endTime-${appointment.id}`} name="endTime" type="datetime-local" className="input input-bordered w-full" defaultValue={toDatetimeLocal(appointment.endTime)} required />
          <FieldError message={state.errors?.endTime?.[0]} />
        </div>

        {type === AppointmentType.VIDEO_CALL ? (
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor={`meetingUrl-${appointment.id}`} className="text-sm font-semibold">Meeting URL (optional)</label>
            <input id={`meetingUrl-${appointment.id}`} name="meetingUrl" type="url" className="input input-bordered w-full" defaultValue={appointment.meetingUrl ?? ""} placeholder="https://..." />
          </div>
        ) : null}

        {type === AppointmentType.IN_PERSON ? (
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor={`location-${appointment.id}`} className="text-sm font-semibold">Location (optional)</label>
            <input id={`location-${appointment.id}`} name="location" type="text" className="input input-bordered w-full" defaultValue={appointment.location ?? ""} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`notes-${appointment.id}`} className="text-sm font-semibold">Notes (optional)</label>
        <textarea id={`notes-${appointment.id}`} name="notes" className="textarea textarea-bordered w-full resize-y" defaultValue={appointment.notes ?? ""} />
      </div>

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={() => closeDialog(dialogId)}>Close</button>
        <EditAppointmentSubmitButton />
      </div>
    </form>
  );
}
