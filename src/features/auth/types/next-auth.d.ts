// Importamos el tipo Role generado por Prisma.
// Así la sesión solo podrá tener roles válidos: ADMIN, TRAINER o CLIENT.
import type { Role } from "@/generated/prisma/enums";

// Importamos el tipo base de sesión de Auth.js.
import type { DefaultSession } from "next-auth";

// Activamos la ampliación de tipos de Auth.js.
import "next-auth";
import "next-auth/jwt";

// Ampliamos los tipos principales de Auth.js.
declare module "next-auth" {
  // Este tipo representa el usuario que Auth.js maneja internamente.
  interface User {
    id: string;
    role: Role;
  }

  // Este tipo representa la sesión que podremos leer en la app.
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

// Ampliamos el JWT interno de Auth.js.
// Guardaremos aquí el id y el rol para poder reconstruir la sesión.
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}