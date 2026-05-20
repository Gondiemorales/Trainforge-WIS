// Importamos el formulario real de login.
// Esta card solo se encarga de la presentación visual.
import { LoginForm } from "./LoginForm";

// Este componente muestra una card moderna de login.
// A la izquierda tenemos branding de TrainForge y a la derecha el formulario.
export function LoginCard() {
  return (
    <section className="w-full max-w-5xl overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl">
      <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Panel visual izquierdo */}
        <div className="relative hidden overflow-hidden bg-neutral p-10 text-neutral-content lg:flex lg:flex-col lg:justify-between">
          {/* Fondo decorativo */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

          {/* Branding principal */}
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Personal trainer SaaS platform
            </div>

            <h1 className="max-w-md text-5xl font-black leading-tight tracking-tight">
              Build stronger client relationships with{" "}
              <span className="text-primary">TrainForge</span>.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-content/70">
              Manage clients, training plans, appointments and progress tracking
              from one clean dashboard.
            </p>
          </div>

          {/* Mini panel de métricas demo */}
          <div className="relative z-10 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-content/60">This week</p>
                <p className="text-2xl font-bold">12 sessions</p>
              </div>

              <div className="badge badge-primary badge-lg">+18%</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                <span className="text-sm">Bench Press progress</span>
                <span className="font-semibold text-primary">62.5 kg</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                <span className="text-sm">Next check-in</span>
                <span className="font-semibold">10:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho con formulario */}
        <div className="flex items-center justify-center bg-base-100 px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            {/* Logo y título */}
            <div className="mb-8">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-content shadow-lg shadow-primary/20">
                TF
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-base-content/60">
                Sign in to manage your clients, training plans and progress.
              </p>
            </div>

            {/* Cuentas demo para el proyecto */}
            <div className="mb-6 rounded-2xl border border-base-300 bg-base-200/70 p-4 text-sm">
              <p className="mb-2 font-semibold">Demo accounts</p>
              <div className="space-y-1 text-base-content/70">
                <p>Admin: admin@trainforge.com</p>
                <p>Trainer: trainer@trainforge.com</p>
                <p className="text-xs text-base-content/50">Password: password123</p>
              </div>
            </div>

            {/* Formulario real de login */}
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}