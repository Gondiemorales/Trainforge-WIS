// Importamos el helper que exige rol de entrenador.
// Si el usuario no es TRAINER, lo redirige a su dashboard correcto.
import { requireTrainer } from "@/lib/permissions";

// Esta es la página principal del dashboard de trainer.
// El layout general ya lo pone src/app/(dashboard)/dashboard/layout.tsx.
export default async function TrainerDashboardPage() {
  // Comprobamos que el usuario actual sea TRAINER.
  const user = await requireTrainer();

  return (
    <div className="space-y-6">
      {/* Cabecera específica de la página de trainer */}
      <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
        <p className="badge badge-primary mb-4">Trainer Dashboard</p>

        <h1 className="text-4xl font-black">
          Welcome, {user.name}
        </h1>

        <p className="mt-3 max-w-2xl text-base-content/60">
          This is the trainer overview. Later, this area will show clients,
          exercises, training plans, appointments and progress tracking.
        </p>
      </section>

      {/* Cards temporales de resumen */}
      <section className="grid gap-4 md:grid-cols-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Clients</h2>

            <p className="text-sm text-base-content/60">
              Manage your assigned clients.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Plans</h2>

            <p className="text-sm text-base-content/60">
              Build personalised training plans.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Calendar</h2>

            <p className="text-sm text-base-content/60">
              Schedule client appointments.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Progress</h2>

            <p className="text-sm text-base-content/60">
              Track progress per exercise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}