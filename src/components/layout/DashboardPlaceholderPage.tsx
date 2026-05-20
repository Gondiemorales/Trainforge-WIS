// Este tipo define cada item pequeño que podemos mostrar en la página temporal.
type PlaceholderItem = {
  title: string;
  description: string;
};

// Este tipo define los datos que necesita la página temporal.
type DashboardPlaceholderPageProps = {
  badge: string;
  title: string;
  description: string;
  items: PlaceholderItem[];
};

// Este componente crea una página temporal reutilizable.
// Lo usamos mientras construimos las funcionalidades reales una por una.
export function DashboardPlaceholderPage({
  badge,
  title,
  description,
  items,
}: DashboardPlaceholderPageProps) {
  return (
    <div className="space-y-6">
      {/* Cabecera principal de la página temporal */}
      <section className="rounded-3xl bg-base-100 p-8 shadow-xl">
        <p className="badge badge-primary mb-4">{badge}</p>

        <h1 className="text-4xl font-black">{title}</h1>

        <p className="mt-3 max-w-2xl text-base-content/60">
          {description}
        </p>
      </section>

      {/* Cards temporales para explicar qué tendrá esta sección */}
      <section className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>

              <p className="text-sm text-base-content/60">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}