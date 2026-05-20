import type { ProgressLogItem } from "@/features/progress/types/progress.types";

import { ProgressTableRow } from "./ProgressTableRow";

type ProgressTableProps = {
  logs: ProgressLogItem[];
  selectedClientId?: string;
  selectedExerciseId?: string;
};

export function ProgressTable({ logs, selectedClientId, selectedExerciseId }: ProgressTableProps) {
  const showClient = !selectedClientId;

  if (logs.length === 0) {
    return (
      <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
        <h2 className="text-xl font-bold">No progress logs found</h2>
        <p className="mt-2 text-base-content/60">
          {!selectedClientId
            ? "Select a client to view their logs, or log a new session using the form above."
            : selectedExerciseId
            ? "No logs yet for this exercise. Log a session using the form above."
            : "No sessions logged yet for this client. Use the form above to start tracking."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-base-100 shadow-md">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              {showClient ? <th>Client</th> : null}
              <th>Exercise</th>
              <th>Weight</th>
              <th>Sets × Reps</th>
              <th>Body weight</th>
              <th>Notes</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <ProgressTableRow key={log.id} log={log} showClient={showClient} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
