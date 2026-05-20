import Link from "next/link";

const AI_FEATURES = [
  "Caloric deficit, maintenance or surplus",
  "Custom macro split (protein / carbs / fat)",
  "Allergies and dietary preferences respected",
  "Full breakdown per meal, per day",
];

const AI_MOCK_DAYS = [
  {
    day: "Monday",
    cal: "2,140 kcal",
    meals: ["Oats 80g · Banana · Milk", "Chicken 180g · Rice 90g · Broccoli", "Salmon 160g · Sweet potato 150g"],
  },
  {
    day: "Tuesday",
    cal: "2,080 kcal",
    meals: ["Greek yogurt 200g · Granola", "Turkey wrap · Spinach · Avocado", "Beef 160g · Quinoa 100g · Asparagus"],
  },
  {
    day: "Wednesday",
    cal: "2,200 kcal",
    meals: ["Eggs 3 · Whole toast · OJ", "Tuna salad · Chickpeas · Olive oil", "Pork loin 170g · Basmati rice 90g"],
  },
];

function AiMockup() {
  return (
    <div
      className="hidden p-10 md:block"
      style={{ background: "rgba(255,255,255,0.02)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
        Generating plan for Alex M.
      </div>

      <div className="space-y-2">
        {AI_MOCK_DAYS.map((d) => (
          <div
            key={d.day}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-white">{d.day}</span>
              <span className="text-xs font-semibold text-primary">{d.cal}</span>
            </div>
            {d.meals.map((meal, i) => (
              <p key={i} className="text-xs leading-5 text-white/40">{meal}</p>
            ))}
          </div>
        ))}

        <div
          className="rounded-2xl p-3 text-center text-xs text-white/30"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.06)" }}
        >
          + 4 more days generated
        </div>
      </div>
    </div>
  );
}

export function AiSection() {
  return (
    <section className="flex min-h-screen items-center bg-white py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl bg-gray-950">
          <div className="grid items-center gap-0 md:grid-cols-2">

            <div className="p-12 md:p-16">
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/50"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
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
                Our AI generates a complete 7-day meal plan in seconds. You
                review it, adjust if needed, and publish — the human always
                stays in control.
              </p>

              <ul className="mt-8 space-y-3">
                {AI_FEATURES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/login" className="btn btn-primary mt-10 rounded-full px-8">
                Generate a plan →
              </Link>
            </div>

            <AiMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
