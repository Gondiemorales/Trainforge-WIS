import { STATS, STEPS } from "./landing-data";

export function HowItWorksSection() {
  return (
    <section className="bg-dot flex min-h-screen items-center py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="text-gradient text-5xl font-black tracking-tight md:text-6xl">
            Up and running
            <br />
            in minutes.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="card-glass rounded-3xl p-8">
              <span className="mb-4 block text-6xl font-black leading-none text-primary/20">
                {s.n}
              </span>
              <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
              <p className="text-sm leading-6 text-white/50">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="card-glass rounded-3xl py-8 text-center">
              <p className="text-4xl font-black text-primary">{s.v}</p>
              <p className="mt-2 text-xs text-white/40">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
