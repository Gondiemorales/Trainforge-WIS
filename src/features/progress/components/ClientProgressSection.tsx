import type { ClientOverview } from "@/features/progress/server/get-client-overview.query";
import { DeleteProgressLogButton } from "./DeleteProgressLogButton";

type Log = ClientOverview["progressLogs"][number];

function fmt(v: string | number | null) {
  return v !== null ? v : "—";
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(d));
}

function ProgressRow({ log }: { log: Log }) {
  return (
    <tr>
      <td className="text-sm">{formatDate(log.date)}</td>
      <td>
        <div className="font-bold">{log.exerciseName}</div>
        <div className="text-xs text-base-content/50">{log.muscleGroup}</div>
      </td>
      <td>
        <span className="text-lg font-black text-primary">{fmt(log.weightKg)}</span>
        {log.weightKg ? <span className="ml-1 text-xs text-base-content/50">kg</span> : null}
      </td>
      <td>
        {log.sets && log.reps ? (
          <span className="font-semibold">{log.sets} × {log.reps}</span>
        ) : <span className="text-base-content/40">—</span>}
      </td>
      <td className="text-sm text-base-content/60">
        {fmt(log.bodyWeightKg)}{log.bodyWeightKg ? " kg" : ""}
      </td>
      <td className="max-w-xs truncate text-sm text-base-content/60">{fmt(log.notes)}</td>
      <td><DeleteProgressLogButton logId={log.id} /></td>
    </tr>
  );
}

export function ClientProgressSection({
  logs,
}: {
  logs: ClientOverview["progressLogs"];
}) {
  return (
    <div className="rounded-3xl bg-base-100 p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Exercise Progress</h2>
        <span className="badge badge-ghost">{logs.length} sessions</span>
      </div>

      {logs.length === 0 ? (
        <p className="mt-4 text-sm text-base-content/50">
          No sessions logged yet. Use the form on the right to start tracking.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Sets × Reps</th>
                <th>Body wt.</th>
                <th>Notes</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <ProgressRow key={log.id} log={log} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
