"use server";

// Importamos AuthError para detectar errores propios de Auth.js.
import { AuthError } from "next-auth";

// Importamos signIn desde nuestra configuración central de Auth.js.
import { signIn } from "./auth";

// Importamos el schema de login para validar email y contraseña.
import { loginSchema } from "../schemas/login.schema";

// Este tipo representa el estado que puede devolver la acción al formulario.
export type LoginActionState = {
  message?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

// Esta Server Action se ejecuta cuando el usuario envía el formulario de login.
export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  // Convertimos los datos del formulario en un objeto normal.
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validamos los datos con Zod antes de intentar iniciar sesión.
  const parsedData = loginSchema.safeParse(rawData);

  // Si la validación falla, devolvemos errores para mostrarlos en el formulario.
  if (!parsedData.success) {
    return {
      message: "Please check the login form.",
      fieldErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    // Intentamos iniciar sesión con Auth.js usando el provider de credenciales.
    // Si funciona, Auth.js redirige al dashboard.
    await signIn("credentials", {
      email: parsedData.data.email,
      password: parsedData.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    // Si Auth.js detecta credenciales incorrectas, devolvemos un mensaje claro.
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          message: "Invalid email or password.",
        };
      }

      return {
        message: "Something went wrong while signing in.",
      };
    }

    // Si el error no es de Auth.js, lo relanzamos.
    // Esto permite que Next.js maneje redirecciones internas correctamente.
    throw error;
  }

  // Normalmente no llegaremos aquí porque signIn redirige si funciona.
  return {};
}