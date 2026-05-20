// Importamos Zod para validar datos antes de guardarlos.
import { z } from "zod";

// Este schema valida precios escritos como texto.
// Los formularios HTML envían strings, por eso validamos el texto.
const hourlyRateSchema = z
  .string()
  .trim()
  .min(1, "Hourly rate is required.")
  .regex(
    /^\d+(\.\d{1,2})?$/,
    "Hourly rate must be a valid amount, for example 75.00.",
  );

// Este schema valida el formulario para crear un trainer.
export const createTrainerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),

  specialty: z
    .string()
    .trim()
    .min(1, "Specialty is required.")
    .max(80, "Specialty is too long."),

  bio: z
    .string()
    .trim()
    .max(500, "Bio is too long.")
    .optional(),

  hourlyRate: hourlyRateSchema,
});

// Este schema valida el formulario para editar un trainer.
export const updateTrainerSchema = z.object({
  trainerId: z
    .string()
    .uuid("A valid trainer is required."),

  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  specialty: z
    .string()
    .trim()
    .min(1, "Specialty is required.")
    .max(80, "Specialty is too long."),

  bio: z
    .string()
    .trim()
    .max(500, "Bio is too long.")
    .optional(),

  hourlyRate: hourlyRateSchema,

  isActive: z.enum(["true", "false"]),
});

// Este schema valida el id antes de archivar un trainer.
export const archiveTrainerSchema = z.object({
  trainerId: z
    .string()
    .uuid("A valid trainer is required."),
});

// Este schema valida el id antes de restaurar un trainer.
export const restoreTrainerSchema = z.object({
  trainerId: z
    .string()
    .uuid("A valid trainer is required."),
});

// Tipos generados automáticamente desde los schemas.
export type CreateTrainerSchema = z.infer<typeof createTrainerSchema>;

export type UpdateTrainerSchema = z.infer<typeof updateTrainerSchema>;

export type ArchiveTrainerSchema = z.infer<typeof archiveTrainerSchema>;

export type RestoreTrainerSchema = z.infer<typeof restoreTrainerSchema>;