import type { ClientOverview } from "@/features/progress/server/get-client-overview.query";

const STATUS_CLASSES: Record<string, string> = {
  SCHEDULED: "badge-primary",
  COMPLETED: "badge-success",
  CANCELLED: "badge-error",
};

const TYPE_LABELS: Record<string, string> = {
  VIDEO_CALL: "Video call",
  IN_PERSON: "In person",
  CONSULTATION: "Consultation",
};

function formatDateTime(d: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(d));
}

export function ClientAppointmentsSection({
  appointments,
}: {
  appointments: ClientOverview["appointments"];
}) {
  const upcoming = appointments.filter((a) => a.status === "SCHEDULED" && new Date(a.startTime) >= new Date());
  const past = appointments.filter((a) => a.status !== "SCHEDULED" || new Date(a.startTime) < new Date());

  return (
    <div className="rounded-3xl bg-base-100 p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Appointments</h2>
        <span className="badge badge-ghost">{appointments.length} total</span>
      </div>

      {appointments.length === 0 ? (
        <p className="mt-4 text-sm text-base-content/50">No appointments yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {upcoming.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/40">Upcoming</p>
              <div className="space-y-2">
                {upcoming.map((a) => (
                  <div key={a.id} className="flex items-start justify-between rounded-xl bg-success/10 p-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{a.title}</span>
                        <span className="badge badge-outline badge-sm badge-primary">{TYPE_LABELS[a.type] ?? a.type}</span>
                      </div>
                      <p className="text-xs text-base-content/60">{formatDateTime(a.startTime)}</p>
                      {a.meetingUrl ? (
                        <a href={a.meetingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-info underline truncate max-w-xs">
                          {a.meetingUrl}
                        </a>
                      ) : null}
                      {a.location ? <p className="text-xs text-base-content/50">{a.location}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {past.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/40">Past</p>
              <div className="space-y-2">
                {past.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-start justify-between rounded-xl bg-base-200 p-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{a.title}</span>
                        <span className={["badge badge-outline badge-sm", STATUS_CLASSES[a.status] ?? ""].join(" ")}>
                          {a.status.charAt(0) + a.status.slice(1).toLowerCase()}
                        </span>
                      </div>
                      <p className="text-xs text-base-content/50">{formatDateTime(a.startTime)} · {TYPE_LABELS[a.type] ?? a.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
