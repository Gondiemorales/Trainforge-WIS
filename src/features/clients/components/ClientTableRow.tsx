"use client";

import { useState } from "react";

import type { ClientListItem } from "@/features/clients/types/client.types";

import { ArchiveClientButton } from "./ArchiveClientButton";
import { ClientExperienceBadge } from "./ClientExperienceBadge";
import { ClientGoalBadge } from "./ClientGoalBadge";
import { ClientStatusBadge } from "./ClientStatusBadge";
import { EditClientDialog } from "./EditClientDialog";
import { RestoreClientButton } from "./RestoreClientButton";

type ClientTableRowProps = {
  client: ClientListItem;
};

const DAY_LABELS: Record<string, string> = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

function formatOptionalValue(value: string | number | null) {
  if (value === null || value === "") {
    return "—";
  }

  return value;
}

function formatDate(value: Date | null) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function parsePreferredTimes(value: string | null) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) => item.day && Array.isArray(item.times),
    ) as { day: string; times: string[] }[];
  } catch {
    return [];
  }
}

function ClientDetails({ client }: ClientTableRowProps) {
  const preferredTimes = parsePreferredTimes(
    client.preferredAppointmentTimes,
  );

  return (
    <tr>
      <td colSpan={7} className="bg-base-200/60">
        <div className="grid gap-4 p-4 md:grid-cols-3">
          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Goal details</h3>

            <p className="mt-2 text-sm text-base-content/70">
              {formatOptionalValue(client.goalDescription)}
            </p>
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Body data</h3>

            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p>Age: {formatOptionalValue(client.age)}</p>
              <p>Height: {formatOptionalValue(client.heightCm)} cm</p>
              <p>Weight: {formatOptionalValue(client.currentWeightKg)} kg</p>
            </div>
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Account</h3>

            <div className="mt-2 space-y-1 text-sm text-base-content/70">
              <p>Created: {formatDate(client.createdAt)}</p>
              <p>Archived: {formatDate(client.archivedAt)}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm md:col-span-2">
            <h3 className="font-bold">Preferred appointment times</h3>

            {preferredTimes.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {preferredTimes.map((item) => (
                  <div key={item.day} className="badge badge-outline p-4">
                    {DAY_LABELS[item.day] ?? item.day}:{" "}
                    {item.times.join(", ")}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-base-content/60">
                No preferred time slots selected.
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <h3 className="font-bold">Internal notes</h3>

            <p className="mt-2 text-sm text-base-content/70">
              {formatOptionalValue(client.notes)}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function ClientTableRow({ client }: ClientTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr>
        <td>
          <div className="font-bold">{client.name}</div>

          <div className="text-sm text-base-content/60">
            {client.email}
          </div>
        </td>

        <td>
          <ClientGoalBadge goal={client.goal} />
        </td>

        <td>
          <ClientExperienceBadge
            experienceLevel={client.experienceLevel}
          />
        </td>

        <td>{formatOptionalValue(client.age)}</td>

        <td>{formatOptionalValue(client.currentWeightKg)}</td>

        <td>
          <ClientStatusBadge
            isActive={client.isActive}
            isArchived={client.isArchived}
          />
        </td>

        <td>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm btn-info btn-outline"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? "Hide details" : "View details"}
            </button>

            <EditClientDialog client={client} />

            {client.isArchived ? (
              <RestoreClientButton clientId={client.id} />
            ) : (
              <ArchiveClientButton clientId={client.id} />
            )}
          </div>
        </td>
      </tr>

      {isOpen ? <ClientDetails client={client} /> : null}
    </>
  );
}