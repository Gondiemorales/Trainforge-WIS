// Este import asegura que este archivo solo se use en el servidor.
// No queremos que la lógica de login ni la base de datos lleguen al navegador.
import "server-only";

// Importamos Prisma para poder buscar usuarios en la base de datos.
import { prisma } from "@/lib/prisma";

// Importamos la función que compara la contraseña escrita con el hash guardado.
import { verifyPassword } from "./password.service";

// Este tipo representa el usuario seguro que puede usar Auth.js.
// No incluimos passwordHash porque nunca debe salir de este archivo.
export type SafeAuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TRAINER" | "CLIENT";
};

// Esta función verifica si el email y la contraseña son correctos.
// Si algo falla, devuelve null.
export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<SafeAuthUser | null> {
  // Buscamos el usuario por email en la base de datos.
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      role: true,
      isActive: true,
    },
  });

  // Si no existe ningún usuario con ese email, no dejamos iniciar sesión.
  if (!user) {
    return null;
  }

  // Si el usuario está desactivado, tampoco puede iniciar sesión.
  if (!user.isActive) {
    return null;
  }

  // Comparamos la contraseña escrita con la contraseña cifrada guardada.
  const isPasswordValid = await verifyPassword(password, user.passwordHash);

  // Si la contraseña no coincide, no dejamos iniciar sesión.
  if (!isPasswordValid) {
    return null;
  }

  // Devolvemos solo datos seguros para la sesión.
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}