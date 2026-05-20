// Importamos Zod para validar datos de formularios.
// Zod nos permite comprobar datos reales antes de usarlos en el servidor.
import { z } from "zod";

// Este schema valida los datos del formulario de login.
// Comprueba que el email tenga formato válido y que la contraseña no esté vacía.
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

// Este tipo se genera automáticamente a partir del schema.
// Así TypeScript sabe qué forma tienen los datos válidos del login.
export type LoginSchema = z.infer<typeof loginSchema>;