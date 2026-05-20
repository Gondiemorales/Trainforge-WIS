// Importamos redirect para mover al usuario desde el servidor.
import { redirect } from "next/navigation";

// Importamos la función que exige sesión activa.
import { requireUser } from "@/lib/permissions";

// Importamos la función central que decide el dashboard correcto por rol.
import { getDashboardPathByRole } from "@/features/auth/utils/get-dashboard-path-by-role";

// Esta página funciona como repartidor.
// Según el rol del usuario, lo manda a su dashboard correcto.
export default async function DashboardPage() {
  // Exigimos que el usuario esté logueado.
  const user = await requireUser();

  // Redirigimos al dashboard correcto según su rol.
  redirect(getDashboardPathByRole(user.role));
}