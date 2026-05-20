// Importamos los handlers de Auth.js desde nuestra feature de autenticación.
// Así mantenemos la lógica real dentro de src/features/auth.
import { handlers } from "@/features/auth/server/auth";

// Forzamos esta ruta a ejecutarse en Node.js.
// Esto evita problemas con librerías como Prisma o bcrypt en entornos Edge.
export const runtime = "nodejs";

// Auth.js necesita responder a peticiones GET y POST.
// GET se usa para leer información de sesión.
// POST se usa para acciones como iniciar sesión o cerrar sesión.
export const { GET, POST } = handlers;