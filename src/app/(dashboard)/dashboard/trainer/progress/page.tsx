import { ClientProgressCard } from "@/features/progress/components/ClientProgressCard";
import { ProgressPageHeader } from "@/features/progress/components/ProgressPageHeader";
import { getClientsWithStats } from "@/features/progress/server/get-clients-with-stats.query";
import { getProgressLogs } from "@/features/progress/server/get-progress-logs.query";
import { requireTrainer } from "@/lib/permissions";

export default async function TrainerProgressPage() {
  await requireTrainer();

  const [clients, { pagination }] = await Promise.all([
    getClientsWithStats(),
    getProgressLogs({}),
  ]);

  return (
    <div className="space-y-6">
      <ProgressPageHeader totalItems={pagination.totalItems} />

      {clients.length === 0 ? (
        <div className="rounded-3xl bg-base-100 p-8 text-center shadow-md">
          <h2 className="text-xl font-bold">No active clients</h2>
          <p className="mt-2 text-base-content/60">
            Add clients in the Clients section to start tracking their progress.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl bg-base-100 p-4 shadow-sm">
            <p className="text-sm text-base-content/60">
              Select a client to view their full profile — exercise progress,
              training plans, appointments and nutrition plans.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <ClientProgressCard key={client.id} client={client} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
