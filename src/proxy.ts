// Importamos NextAuth para crear un proxy compatible con Auth.js.
import NextAuth from "next-auth";

// Importamos NextResponse para poder redirigir usuarios.
import { NextResponse } from "next/server";

// Importamos la configuración ligera de Auth.js.
// No importamos auth.ts aquí para evitar meter Prisma o bcrypt en el proxy.
import { authConfig } from "@/features/auth/server/auth.config";

// Creamos una versión ligera de auth para el proxy.
// Esta versión puede leer la sesión sin cargar toda la lógica de login.
const { auth } = NextAuth(authConfig);

// Este proxy se ejecuta antes de entrar en ciertas rutas.
// Lo usamos para proteger /dashboard y controlar /login.
export default auth((request) => {
  // Comprobamos si existe usuario en la sesión.
  const isLoggedIn = Boolean(request.auth?.user);

  // Leemos la URL que el usuario intenta abrir.
  const { nextUrl } = request;

  // Comprobamos si está intentando entrar en el dashboard.
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  // Comprobamos si está intentando entrar en login.
  const isLoginRoute = nextUrl.pathname === "/login";

  // Si no está logueado e intenta entrar al dashboard, lo mandamos a login.
  if (!isLoggedIn && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Si ya está logueado e intenta entrar a login, lo mandamos al dashboard.
  if (isLoggedIn && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Si no hay nada que bloquear, dejamos continuar.
  return NextResponse.next();
});

// Indicamos en qué rutas debe ejecutarse este proxy.
// Así no se ejecuta en imágenes, CSS, assets o rutas innecesarias.
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};