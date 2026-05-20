import Link from "next/link";

import type { ClientOverview } from "@/features/progress/server/get-client-overview.query";

const GOAL_LABELS: Record<string, string> = {
  FAT_LOSS: "Fat loss",
  MUSCLE_GAIN: "Muscle gain",
  STRENGTH: "Strength",
  ENDURANCE: "Endurance",
  MOBILITY: "Mobility",
  GENERAL_FITNESS: "General fitness",
};

const EXPERIENCE_CLASSES: Record<string, string> = {
  BEGINNER: "badge-success",
  INTERMEDIATE: "badge-warning",
  ADVANCED: "badge-error",
};

function fmt(v: string | number | null) {
  return v !== null ? v : "—";
}

export function ClientOverviewHeader({ client }: { client: ClientOverview }) {
  return (
    <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
      <div className="mb-4">
        <Link href="/dashboard/trainer/progress" className="btn btn-sm btn-ghost">
          ← Back to clients
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="badge badge-primary">Client Profile</p>
            <span className={["badge badge-outline", EXPERIENCE_CLASSES[client.experienceLevel] ?? ""].join(" ")}>
              {client.experienceLevel.charAt(0) + client.experienceLevel.slice(1).toLowerCase()}
            </span>
            {!client.isActive ? <span className="badge badge-error">Inactive</span> : null}
          </div>

          <h1 className="mt-4 text-4xl font-black">{client.name}</h1>
          <p className="mt-1 text-base-content/60">{client.email}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge badge-ghost">{GOAL_LABELS[client.goal] ?? client.goal}</span>
            {client.goalDescription ? (
              <span className="text-sm text-base-content/60">{client.goalDescription}</span>
            ) : null}
          </div>
        </div>

        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">Age</div>
            <div className="stat-value text-sm">{fmt(client.age)}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Height</div>
            <div className="stat-value text-sm">{fmt(client.heightCm)}{client.heightCm ? " cm" : ""}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Weight</div>
            <div className="stat-value text-sm">{fmt(client.currentWeightKg)}{client.currentWeightKg ? " kg" : ""}</div>
          </div>
        </div>
      </div>

      {client.notes ? (
        <div className="mt-4 rounded-2xl bg-base-200 p-4">
          <p className="text-xs font-semibold text-base-content/50">Internal notes</p>
          <p className="mt-1 text-sm">{client.notes}</p>
        </div>
      ) : null}
    </section>
  );
}
