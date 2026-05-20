// Importamos el componente reutilizable para páginas temporales.
import { DashboardPlaceholderPage } from "@/components/layout/DashboardPlaceholderPage";

// Importamos el helper que exige rol de entrenador.
import { requireTrainer } from "@/lib/permissions";

// Esta página temporal representa los mensajes del entrenador.
export default async function TrainerMessagesPage() {
  // Comprobamos que el usuario actual sea TRAINER.
  await requireTrainer();

  return (
    <DashboardPlaceholderPage
      badge="Trainer"
      title="Messages"
      description="This section will allow trainers to communicate directly with their clients."
      items={[
        {
          title: "Conversations",
          description: "View message threads with assigned clients.",
        },
        {
          title: "Send messages",
          description: "Send direct messages to clients from the dashboard.",
        },
        {
          title: "Unread status",
          description: "Track which messages have been read or not.",
        },
      ]}
    />
  );
}