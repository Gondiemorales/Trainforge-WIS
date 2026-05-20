import type { ProgressLogItem } from "@/features/progress/types/progress.types";

import { DeleteProgressLogButton } from "./DeleteProgressLogButton";

type ProgressTableRowProps = {
  log: ProgressLogItem;
  showClient: boolean;
};

function fmt(v: string | number | null) {
  return v !== null && v !== "" ? v : "—";
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(d));
}

export function ProgressTableRow({ log, showClient }: ProgressTableRowProps) {
  return (
    <tr>
      <td className="text-sm">{fmtDate(log.date)}</td>

      {showClient ? (
        <td>
          <div className="font-medium">{log.clientName}</div>
        </td>
      ) : null}

      <td>
        <div className="font-bold">{log.exerciseName}</div>
        <div className="text-xs text-base-content/50">{log.muscleGroup}</div>
      </td>

      <td>
        <span className="text-lg font-black text-primary">
          {fmt(log.weightKg)}
        </span>
        {log.weightKg ? <span className="ml-1 text-xs text-base-content/50">kg</span> : null}
      </td>

      <td>
        {log.sets && log.reps ? (
          <span className="font-semibold">{log.sets} × {log.reps}</span>
        ) : (
          <span className="text-base-content/40">—</span>
        )}
      </td>

      <td className="text-sm text-base-content/60">{fmt(log.bodyWeightKg)}{log.bodyWeightKg ? " kg" : ""}</td>

      <td className="max-w-xs truncate text-sm text-base-content/60">{fmt(log.notes)}</td>

      <td>
        <DeleteProgressLogButton logId={log.id} />
      </td>
    </tr>
  );
}
