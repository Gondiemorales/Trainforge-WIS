import Link from "next/link";

/* ── tiny inline SVG icons ─────────────────────────────── */
const IcoUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const IcoPlan = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
  </svg>
);

const IcoCal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
  </svg>
);

const IcoChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);

const IcoAI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const IcoLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

/* ── data ───────────────────────────────────────────────── */
const FEATURES = [
  { icon: <IcoUsers />, title: "Client Management", desc: "Full client profiles with goals, body metrics, experience levels and preferred schedules. Everything in one place." },
  { icon: <IcoPlan />, title: "Training Plans", desc: "Build personalised programs with exercises, sets, reps and intensity levels. Assign and manage with one click." },
  { icon: <IcoCal />, title: "Smart Calendar", desc: "Schedule video calls, in-person sessions and consultations. Full monthly view with colour-coded appointments." },
  { icon: <IcoChart />, title: "Progress Tracking", desc: "Log weights, reps and sets per session. Monitor each client's evolution with a detailed performance history." },
  { icon: <IcoAI />, title: "AI Nutrition Plans", desc: "Generate complete 7-day meal plans powered by Gemini AI. Review and publish tailored plans for every client." },
  { icon: <IcoLock />, title: "Secure by Design", desc: "Role-based access for admins and trainers. Your data is isolated, encrypted and never shared." },
];

const STEPS = [
  { n: "01", title: "Create your account", desc: "Sign up as a trainer in seconds. No setup complexity, no hidden configuration." },
  { n: "02", title: "Add your clients", desc: "Build rich client profiles with goals, body data and preferred session times." },
  { n: "03", title: "Build programs", desc: "Assign personalised training plans built from your own exercise catalogue." },
  { n: "04", title: "Track everything", desc: "Log sessions, monitor progress, schedule sessions and generate AI nutrition plans." },
];

/* ── page ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ╔══════════════════════════════════════╗
          ║  NAV                                 ║
          ╚══════════════════════════════════════╝ */}
      <nav className="fixed inset-x-0 top-0 z-50" style={{ background: "rgba(8,8,8,0.7)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-xl font-black tracking-tight text-white">
            Train<span className="text-primary">Forge</span>
          </span>
          <Link href="/login" className="btn btn-primary btn-sm rounded-full px-6">
            Sign in
          </Link>
        </div>
      </nav>

      {/* ╔══════════════════════════════════════╗
          ║  HERO  (full screen)                 ║
          ╚══════════════════════════════════════╝ */}
      <section className="bg-grid min-h-screen flex items-center justify-center pt-16">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">

          <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/60" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
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
            Manage clients, build training plans, schedule appointments,
            track progress and generate AI nutrition plans — all from a
            single professional dashboard.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login" className="btn btn-primary rounded-full px-8 text-base">
              Get started free
            </Link>
            <a href="#features" className="btn btn-ghost rounded-full px-8 text-base text-white/60 hover:text-white">
              Explore features →
            </a>
          </div>

          {/* mock dashboard card */}
          <div className="card-glass mx-auto mt-20 max-w-2xl rounded-3xl p-6 text-left">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-white/30">dashboard.trainforge.app</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-white">
              {[
                { label: "Active clients", value: "12" },
                { label: "Sessions this week", value: "8" },
                { label: "Plans active", value: "5" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs text-white/40">{s.label}</p>
                  <p className="mt-1 text-3xl font-black text-primary">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {[
                { name: "Alex M.", detail: "Bench Press · 82.5 kg · 3×8", pct: "78" },
                { name: "Sara K.", detail: "Next session today · 10:00 AM", pct: "55" },
                { name: "Tom R.", detail: "Squat · 120 kg · 5×5", pct: "91" },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
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
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
          ║  FEATURES  (full screen)             ║
          ╚══════════════════════════════════════╝ */}
      <section id="features" className="min-h-screen flex items-center bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
            <h2 className="text-5xl font-black tracking-tight text-gray-950 md:text-6xl">
              Everything a trainer needs.
              <br />
              Nothing they don&apos;t.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-gray-500">
              From client onboarding to AI-generated nutrition — TrainForge
              covers the entire workflow so you can focus on coaching.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-gray-100 bg-gray-50 p-8 transition-all duration-200 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-6 text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
          ║  HOW IT WORKS  (full screen, dark)   ║
          ╚══════════════════════════════════════╝ */}
      <section className="bg-dot min-h-screen flex items-center py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="text-gradient text-5xl font-black tracking-tight md:text-6xl">
              Up and running
              <br />in minutes.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="card-glass rounded-3xl p-8">
                <span className="mb-4 block text-6xl font-black text-primary/20 leading-none">{s.n}</span>
                <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-6 text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* stats row */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "100%", l: "Free to start" },
              { v: "<2 min", l: "To first client" },
              { v: "7-day", l: "AI meal plans" },
              { v: "∞", l: "Clients & plans" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl py-8 text-center card-glass">
                <p className="text-4xl font-black text-primary">{s.v}</p>
                <p className="mt-2 text-xs text-white/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
          ║  AI SECTION  (full screen)           ║
          ╚══════════════════════════════════════╝ */}
      <section className="min-h-screen flex items-center bg-white py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl bg-gray-950">
            <div className="grid items-center gap-0 md:grid-cols-2">

              {/* left text */}
              <div className="p-12 md:p-16">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/50" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-yellow-400">✦</span>
                  Powered by Google Gemini 2.5
                </div>
                <h2 className="text-gradient text-4xl font-black leading-tight md:text-5xl">
                  AI Nutritional
                  <br />
                  <span className="text-gradient-primary">Assistant.</span>
                </h2>
                <p className="mt-6 text-base leading-7 text-white/50">
                  Fill in a client&apos;s goals, macros and dietary restrictions.
                  Our AI generates a complete 7-day meal plan in seconds.
                  You review it, adjust if needed, and publish — the human
                  always stays in control.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Caloric deficit, maintenance or surplus",
                    "Custom macro split (protein / carbs / fat)",
                    "Allergies and dietary preferences respected",
                    "Full breakdown per meal, per day",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="btn btn-primary mt-10 rounded-full px-8">
                  Generate a plan →
                </Link>
              </div>

              {/* right mock */}
              <div className="hidden p-10 md:block" style={{ background: "rgba(255,255,255,0.02)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">Generating plan for Alex M.</div>
                <div className="space-y-2">
                  {[
                    { day: "Monday", cal: "2,140 kcal", items: ["Oats 80g · Banana · Milk", "Chicken 180g · Rice 90g · Broccoli", "Salmon 160g · Sweet potato 150g"] },
                    { day: "Tuesday", cal: "2,080 kcal", items: ["Greek yogurt 200g · Granola", "Turkey wrap · Spinach · Avocado", "Beef 160g · Quinoa 100g · Asparagus"] },
                    { day: "Wednesday", cal: "2,200 kcal", items: ["Eggs 3 · Whole toast · OJ", "Tuna salad · Chickpeas · Olive oil", "Pork loin 170g · Basmati rice 90g"] },
                  ].map((d) => (
                    <div key={d.day} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{d.day}</span>
                        <span className="text-xs text-primary font-semibold">{d.cal}</span>
                      </div>
                      {d.items.map((item, i) => (
                        <p key={i} className="text-xs text-white/40 leading-5">{item}</p>
                      ))}
                    </div>
                  ))}
                  <div className="rounded-2xl p-3 text-center text-xs text-white/30" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.06)" }}>
                    + 4 more days generated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
          ║  CTA  (full screen, dark)            ║
          ╚══════════════════════════════════════╝ */}
      <section className="bg-grid min-h-screen flex items-center justify-center py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">Get started today</p>
          <h2 className="text-gradient text-6xl font-black leading-tight tracking-tight md:text-8xl">
            Scale your
            <br />
            coaching.
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg text-white/50">
            Join TrainForge and manage your fitness business from one
            professional platform. Free to start — no credit card needed.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login" className="btn btn-primary btn-lg rounded-full px-10 text-base shadow-2xl shadow-primary/30">
              Start for free
            </Link>
          </div>

          {/* social proof micro-strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/20 text-sm">
            <span>Built with Next.js 16</span>
            <span>·</span>
            <span>Powered by Google Gemini</span>
            <span>·</span>
            <span>Secured with NextAuth</span>
            <span>·</span>
            <span>PostgreSQL on Neon</span>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
          ║  FOOTER                              ║
          ╚══════════════════════════════════════╝ */}
      <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <span className="text-lg font-black text-white">
            Train<span className="text-primary">Forge</span>
          </span>
          <p className="text-sm text-white/30">
            © 2026 TrainForge · SaaS platform for personal trainers
          </p>
          <Link href="/login" className="btn btn-ghost btn-sm rounded-full text-white/50 hover:text-white">
            Sign in →
          </Link>
        </div>
      </footer>

    </div>
  );
}
