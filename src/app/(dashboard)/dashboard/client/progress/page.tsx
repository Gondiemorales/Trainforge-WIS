// Importamos el componente reutilizable para páginas temporales.
import { DashboardPlaceholderPage } from "@/components/layout/DashboardPlaceholderPage";

// Importamos el helper que exige rol de cliente.
import { requireClient } from "@/lib/permissions";

// Esta página temporal representa el progreso del cliente.
export default async function ClientProgressPage() {
  // Comprobamos que el usuario actual sea CLIENT.
  await requireClient();

  return (
    <DashboardPlaceholderPage
      badge="Client"
      title="My Progress"
      description="This section will allow clients to log weights, sets and reps, and view their progress over time."
      items={[
        {
          title: "Log progress",
          description: "Record weight lifted, sets and reps after each training session.",
        },
        {
          title: "Progress charts",
          description: "View progress per exercise using clear visual charts.",
        },
        {
          title: "Training history",
          description: "Review previous logs and compare performance over time.",
        },
      ]}
    />
  );
}