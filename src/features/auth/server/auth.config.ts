// Importamos el tipo de configuración de Auth.js.
// Esto nos ayuda a que TypeScript revise si la configuración está bien escrita.
import type { NextAuthConfig } from "next-auth";

// Configuración base de Auth.js para TrainForge.
export const authConfig = {
  // Indicamos cuál será nuestra página personalizada de login.
  pages: {
    signIn: "/login",
  },

  // Usamos JWT para guardar una sesión ligera.
  // Guardaremos datos mínimos: id, email, name y role.
  session: {
    strategy: "jwt",
  },

  // Los callbacks nos permiten controlar qué datos entran en el token y en la sesión.
  callbacks: {
    // Este callback se ejecuta cuando Auth.js crea o actualiza el token.
    jwt({ token, user }) {
      // Cuando el usuario inicia sesión, copiamos su id y role al token.
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    // Este callback se ejecuta cuando la app pide la sesión actual.
    session({ session, token }) {
      // Copiamos el id y role del token a session.user.
      if (session.user && token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  // Auth.js exige una lista de providers.
  // De momento la dejamos vacía y añadiremos Credentials en auth.ts.
  providers: [],
} satisfies NextAuthConfig;