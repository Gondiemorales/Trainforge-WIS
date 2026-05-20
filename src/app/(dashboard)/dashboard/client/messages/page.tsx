// Importamos el componente reutilizable para páginas temporales.
import { DashboardPlaceholderPage } from "@/components/layout/DashboardPlaceholderPage";

// Importamos el helper que exige rol de cliente.
import { requireClient } from "@/lib/permissions";

// Esta página temporal representa los mensajes del cliente.
export default async function ClientMessagesPage() {
  // Comprobamos que el usuario actual sea CLIENT.
  await requireClient();

  return (
    <DashboardPlaceholderPage
      badge="Client"
      title="Messages"
      description="This section will allow clients to communicate directly with their assigned trainer."
      items={[
        {
          title: "Trainer conversation",
          description: "View messages exchanged with the assigned personal trainer.",
        },
        {
          title: "Send replies",
          description: "Reply to trainer messages from the client dashboard.",
        },
        {
          title: "Unread messages",
          description: "See which messages are new or unread.",
        },
      ]}
    />
  );
}