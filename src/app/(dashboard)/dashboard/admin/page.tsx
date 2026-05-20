// Importamos el helper que exige rol de administrador.
// Si el usuario no es ADMIN, lo redirige a su dashboard correcto.
import { requireAdmin } from "@/lib/permissions";

// Esta es la página principal del dashboard de admin.
// El layout general ya lo pone src/app/(dashboard)/dashboard/layout.tsx.
export default async function AdminDashboardPage() {
  // Comprobamos que el usuario actual sea ADMIN.
  const user = await requireAdmin();

  return (
    <div className="space-y-6">
      {/* Cabecera específica de la página de admin */}
      <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
        <p className="badge badge-primary mb-4">Admin Dashboard</p>

        <h1 className="text-4xl font-black">
          Welcome, {user.name}
        </h1>

        <p className="mt-3 max-w-2xl text-base-content/60">
          This is the admin overview. Later, this area will manage trainers,
          SaaS subscriptions and archived platform records.
        </p>
      </section>

      {/* Cards temporales de resumen */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Subscriptions</h2>

            <p className="text-sm text-base-content/60">
              Create, edit and archive trainer subscriptions.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Trainers</h2>

            <p className="text-sm text-base-content/60">
              Manage trainer accounts and profiles.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Platform</h2>

            <p className="text-sm text-base-content/60">
              Review platform-level data and activity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}