import { ClientAppointmentsSection } from "@/features/progress/components/ClientAppointmentsSection";
import { ClientNutritionSection } from "@/features/progress/components/ClientNutritionSection";
import { ClientOverviewHeader } from "@/features/progress/components/ClientOverviewHeader";
import { ClientPlansSection } from "@/features/progress/components/ClientPlansSection";
import { ClientProgressSection } from "@/features/progress/components/ClientProgressSection";
import { LogProgressForm } from "@/features/progress/components/LogProgressForm";
import { getClientOverview } from "@/features/progress/server/get-client-overview.query";
import { getClientsForSelect } from "@/features/progress/server/get-clients-for-select.query";
import { getExercisesForSelect } from "@/features/progress/server/get-exercises-for-select.query";
import { requireTrainer } from "@/lib/permissions";

type ClientProgressPageProps = {
  params: Promise<{ clientId: string }>;
};

export default async function ClientProgressPage({ params }: ClientProgressPageProps) {
  await requireTrainer();

  const { clientId } = await params;

  const [overview, clients, exercises] = await Promise.all([
    getClientOverview(clientId),
    getClientsForSelect(),
    getExercisesForSelect(),
  ]);

  return (
    <div className="space-y-6">
      <ClientOverviewHeader client={overview} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ClientProgressSection logs={overview.progressLogs} />
          <ClientPlansSection plans={overview.trainingPlans} />
          <ClientAppointmentsSection appointments={overview.appointments} />
          <ClientNutritionSection plans={overview.nutritionPlans} />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <LogProgressForm
              clients={clients}
              exercises={exercises}
              defaultClientId={clientId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
