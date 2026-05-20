// Importamos el tipo de plan generado por Prisma.
// Así solo aceptamos planes reales: FREE, STARTER o PRO.
import type { SubscriptionPlan } from "@/generated/prisma/enums";

// Este tipo define los datos que necesita el badge.
type SubscriptionPlanBadgeProps = {
  plan: SubscriptionPlan;
};

// Esta función devuelve el estilo visual según el plan.
// Nos ayuda a mantener el JSX más limpio.
function getPlanBadgeClass(plan: SubscriptionPlan) {
  if (plan === "PRO") {
    return "badge badge-primary";
  }

  if (plan === "STARTER") {
    return "badge badge-secondary";
  }

  return "badge badge-ghost";
}

// Este componente muestra el plan de suscripción como una etiqueta visual.
export function SubscriptionPlanBadge({ plan }: SubscriptionPlanBadgeProps) {
  return (
    <span className={getPlanBadgeClass(plan)}>
      {plan}
    </span>
  );
}