// Importamos el componente reutilizable para páginas temporales.
import { DashboardPlaceholderPage } from "@/components/layout/DashboardPlaceholderPage";

// Importamos el helper que exige rol de cliente.
import { requireClient } from "@/lib/permissions";

// Esta página temporal representa el plan asignado al cliente.
export default async function ClientPlanPage() {
  // Comprobamos que el usuario actual sea CLIENT.
  await requireClient();

  return (
    <DashboardPlaceholderPage
      badge="Client"
      title="My Plan"
      description="This section will allow clients to view their assigned training plan and exercise instructions."
      items={[
        {
          title: "Assigned workouts",
          description: "View the exercises included in the current training plan.",
        },
        {
          title: "Sets and reps",
          description: "See the assigned sets, reps, rest time and intensity for each exercise.",
        },
        {
          title: "Trainer notes",
          description: "Read specific instructions added by the personal trainer.",
        },
      ]}
    />
  );
}