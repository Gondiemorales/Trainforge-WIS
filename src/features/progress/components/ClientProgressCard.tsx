import Link from "next/link";

import type { ClientWithStats } from "@/features/progress/server/get-clients-with-stats.query";

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

function formatDate(d: Date | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(d));
}

export function ClientProgressCard({ client }: { client: ClientWithStats }) {
  return (
    <div className="flex flex-col rounded-3xl bg-base-100 p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black">{client.name}</h3>
          <p className="text-sm text-base-content/60">{client.email}</p>
        </div>
        <span className={["badge badge-outline", EXPERIENCE_CLASSES[client.experienceLevel] ?? ""].join(" ")}>
          {client.experienceLevel.charAt(0) + client.experienceLevel.slice(1).toLowerCase()}
        </span>
      </div>

      <div className="mt-3">
        <span className="badge badge-ghost text-xs">
          {GOAL_LABELS[client.goal] ?? client.goal}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-base-200 p-2">
          <p className="text-lg font-black text-primary">{client.totalProgressLogs}</p>
          <p className="text-xs text-base-content/50">Sessions</p>
        </div>
        <div className="rounded-xl bg-base-200 p-2">
          <p className="text-lg font-black text-success">{client.activePlans}</p>
          <p className="text-xs text-base-content/50">Plans</p>
        </div>
        <div className="rounded-xl bg-base-200 p-2">
          <p className="text-xs font-semibold text-base-content/70 leading-tight">
            {client.nextAppointment ? formatDate(client.nextAppointment) : "No appt."}
          </p>
          <p className="text-xs text-base-content/50">Next appt.</p>
        </div>
      </div>

      <div className="mt-3 text-xs text-base-content/50">
        Last session: {formatDate(client.lastSessionDate)}
      </div>

      <div className="mt-auto pt-4">
        <Link
          href={`/dashboard/trainer/progress/${client.id}`}
          className="btn btn-primary btn-sm w-full"
        >
          View full profile
        </Link>
      </div>
    </div>
  );
}
