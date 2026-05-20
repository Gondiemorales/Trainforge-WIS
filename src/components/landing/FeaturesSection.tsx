import { FEATURES } from "./landing-data";

export function FeaturesSection() {
  return (
    <section id="features" className="flex min-h-screen items-center bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="text-5xl font-black tracking-tight text-gray-950 md:text-6xl">
            Everything a trainer needs.
            <br />
            Nothing they don&apos;t.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-gray-500">
            From client onboarding to AI-generated nutrition — TrainForge covers
            the entire workflow so you can focus on coaching.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-gray-100 bg-gray-50 p-8 transition-all duration-200 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-gray-100 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                {f.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="text-sm leading-6 text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
