"use server";

// Importamos signOut desde nuestra configuración central de Auth.js.
// Esta función elimina la sesión actual del usuario.
import { signOut } from "./auth";

// Esta Server Action cierra la sesión del usuario.
// Después de cerrar sesión, lo manda de vuelta a /login.
export async function logoutAction() {
  await signOut({
    redirectTo: "/login",
  });
}