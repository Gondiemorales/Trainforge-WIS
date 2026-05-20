// Importamos NextAuth para crear la configuración principal de autenticación.
import NextAuth from "next-auth";

// Importamos el provider de credenciales.
// Lo usamos para login con email y contraseña.
import Credentials from "next-auth/providers/credentials";

// Importamos la configuración base que ya creamos.
import { authConfig } from "./auth.config";

// Importamos la función que comprueba email y contraseña contra la base de datos.
import { verifyUserCredentials } from "./verify-user-credentials.query";

// Creamos la configuración principal de Auth.js.
// Aquí conectamos Auth.js con nuestro login por email y contraseña.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  // Definimos los métodos de login disponibles.
  // De momento solo usamos Credentials porque tenemos usuarios demo en la base de datos.
  providers: [
    Credentials({
      // Nombre interno del método de login.
      name: "Credentials",

      // Campos que espera recibir el formulario de login.
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Esta función se ejecuta cuando el usuario intenta iniciar sesión.
      async authorize(credentials) {
        // Comprobamos que email y password existan y sean texto.
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        // Buscamos el usuario en la base de datos y verificamos la contraseña.
        const user = await verifyUserCredentials(
          credentials.email,
          credentials.password,
        );

        // Si no hay usuario válido, Auth.js rechaza el login.
        if (!user) {
          return null;
        }

        // Si todo está bien, devolvemos el usuario seguro.
        // Este usuario pasará luego a los callbacks de auth.config.ts.
        return user;
      },
    }),
  ],
});