import Link from "next/link";

const TECH_STACK = [
  "Built with Next.js 16",
  "Powered by Google Gemini",
  "Secured with NextAuth",
  "PostgreSQL on Neon",
];

export function CtaSection() {
  return (
    <section className="bg-grid flex min-h-screen items-center justify-center py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
          Get started today
        </p>

        <h2 className="text-gradient text-6xl font-black leading-tight tracking-tight md:text-8xl">
          Scale your
          <br />
          coaching.
        </h2>

        <p className="mx-auto mt-8 max-w-lg text-lg text-white/50">
          Join TrainForge and manage your fitness business from one professional
          platform. Free to start — no credit card needed.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="btn btn-primary btn-lg rounded-full px-10 text-base shadow-2xl shadow-primary/30"
          >
            Start for free
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-white/20">
          {TECH_STACK.map((item, i) => (
            <span key={item} className="flex items-center gap-6">
              {item}
              {i < TECH_STACK.length - 1 ? <span>·</span> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
