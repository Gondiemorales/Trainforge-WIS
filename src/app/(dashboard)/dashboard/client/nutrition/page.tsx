// Importamos el componente reutilizable para páginas temporales.
import { DashboardPlaceholderPage } from "@/components/layout/DashboardPlaceholderPage";

// Importamos el helper que exige rol de cliente.
import { requireClient } from "@/lib/permissions";

// Esta página temporal representa el plan nutricional del cliente.
export default async function ClientNutritionPage() {
  // Comprobamos que el usuario actual sea CLIENT.
  await requireClient();

  return (
    <DashboardPlaceholderPage
      badge="Client"
      title="Nutrition"
      description="This section will allow clients to view nutrition plans reviewed and published by their trainer."
      items={[
        {
          title: "Published meal plans",
          description: "View weekly meal plans assigned by the trainer.",
        },
        {
          title: "Meal details",
          description: "See meals, ingredients and estimated calories.",
        },
        {
          title: "AI-assisted disclaimer",
          description: "Show responsible AI information for generated nutrition plans.",
        },
      ]}
    />
  );
}