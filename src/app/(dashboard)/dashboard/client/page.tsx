// Importamos el helper que exige rol de cliente.
// Si el usuario no es CLIENT, lo redirige a su dashboard correcto.
import { requireClient } from "@/lib/permissions";

// Esta es la página principal del dashboard de client.
// El layout general ya lo pone src/app/(dashboard)/dashboard/layout.tsx.
export default async function ClientDashboardPage() {
  // Comprobamos que el usuario actual sea CLIENT.
  const user = await requireClient();

  return (
    <div className="space-y-6">
      {/* Cabecera específica de la página de client */}
      <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
        <p className="badge badge-primary mb-4">Client Dashboard</p>

        <h1 className="text-4xl font-black">
          Welcome, {user.name}
        </h1>

        <p className="mt-3 max-w-2xl text-base-content/60">
          This is the client overview. Later, this area will show the assigned
          training plan, progress logs, messages and nutrition plan.
        </p>
      </section>

      {/* Cards temporales de resumen */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">My Plan</h2>

            <p className="text-sm text-base-content/60">
              View assigned exercises and repetitions.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">My Progress</h2>

            <p className="text-sm text-base-content/60">
              Log weights and track improvements.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Nutrition</h2>

            <p className="text-sm text-base-content/60">
              View reviewed nutrition plans.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}