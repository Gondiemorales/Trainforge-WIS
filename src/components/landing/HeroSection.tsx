import Link from "next/link";

const DASHBOARD_STATS = [
  { label: "Active clients", value: "12" },
  { label: "Sessions this week", value: "8" },
  { label: "Plans active", value: "5" },
];

const DASHBOARD_CLIENTS = [
  { name: "Alex M.", detail: "Bench Press · 82.5 kg · 3×8", pct: "78" },
  { name: "Sara K.", detail: "Next session today · 10:00 AM", pct: "55" },
  { name: "Tom R.", detail: "Squat · 120 kg · 5×5", pct: "91" },
];

function DashboardMockup() {
  return (
    <div className="card-glass mx-auto mt-20 max-w-2xl rounded-3xl p-6 text-left">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-white/30">dashboard.trainforge.app</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-white">
        {DASHBOARD_STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs text-white/40">{s.label}</p>
            <p className="mt-1 text-3xl font-black text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {DASHBOARD_CLIENTS.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div>
              <p className="text-sm font-semibold text-white">{row.name}</p>
              <p className="text-xs text-white/40">{row.detail}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="text-xs text-white/50">{row.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-grid flex min-h-screen items-center justify-center pt-16">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/60"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          SaaS platform built for personal trainers
        </div>

        <h1 className="text-gradient text-6xl font-black leading-[1.05] tracking-tight md:text-8xl">
          Your entire
          <br />
          fitness business
          <br />
          <span className="text-gradient-primary">in one place.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-7 text-white/50">
          Manage clients, build training plans, schedule appointments, track
          progress and generate AI nutrition plans — all from a single
          professional dashboard.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/login" className="btn btn-primary rounded-full px-8 text-base">
            Get started free
          </Link>
          <a
            href="#features"
            className="btn btn-ghost rounded-full px-8 text-base text-white/60 hover:text-white"
          >
            Explore features →
          </a>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
