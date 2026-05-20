// Importamos redirect para mandar al usuario a otra página desde el servidor.
import { redirect } from "next/navigation";

// Importamos la sesión actual de Auth.js.
import { auth } from "@/features/auth/server/auth";

// Importamos la card visual del login.
import { LoginCard } from "@/features/auth/components/LoginCard";

// Esta página muestra el login de TrainForge.
// Si el usuario ya tiene sesión, no le dejamos volver al login.
export default async function LoginPage() {
  // Leemos la sesión actual en el servidor.
  const session = await auth();

  // Si ya hay sesión, mandamos al usuario al dashboard.
  if (session?.user) {
    redirect("/dashboard");
  }

  // Si no hay sesión, mostramos la pantalla de login.
  return (
    <main className="min-h-screen bg-base-200 px-6 py-10">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <LoginCard />
      </div>
    </main>
  );
}