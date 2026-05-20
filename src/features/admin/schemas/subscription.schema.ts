// Importamos Zod para validar datos antes de guardarlos en la base de datos.
import { z } from "zod";

// Lista de planes permitidos para una suscripción.
// Deben coincidir con el enum SubscriptionPlan de Prisma.
export const subscriptionPlanSchema = z.enum(["FREE", "STARTER", "PRO"]);

// Lista de estados permitidos para una suscripción.
// Deben coincidir con el enum SubscriptionStatus de Prisma.
export const subscriptionStatusSchema = z.enum([
  "ACTIVE",
  "PAST_DUE",
  "CANCELLED",
  "ARCHIVED",
]);

// Este schema valida precios escritos como texto.
// Lo hacemos así porque los formularios HTML envían strings.
const monthlyPriceSchema = z
  .string()
  .trim()
  .min(1, "Monthly price is required.")
  .regex(
    /^\d+(\.\d{1,2})?$/,
    "Monthly price must be a valid amount, for example 29.99.",
  );

// Este schema permite fechas opcionales desde formularios.
// Si el input viene vacío, lo convertiremos luego en undefined.
const optionalDateInputSchema = z
  .string()
  .trim()
  .optional();

// Este schema valida los datos necesarios para crear una suscripción.
export const createSubscriptionSchema = z.object({
  trainerId: z
    .string()
    .uuid("A valid trainer is required."),

  plan: subscriptionPlanSchema,

  status: subscriptionStatusSchema,

  monthlyPrice: monthlyPriceSchema,

  startsAt: optionalDateInputSchema,

  endsAt: optionalDateInputSchema,
});

// Este schema valida los datos necesarios para editar una suscripción.
export const updateSubscriptionSchema = z.object({
  subscriptionId: z
    .string()
    .uuid("A valid subscription is required."),

  plan: subscriptionPlanSchema,

  status: subscriptionStatusSchema,

  monthlyPrice: monthlyPriceSchema,

  startsAt: optionalDateInputSchema,

  endsAt: optionalDateInputSchema,
});

// Este schema valida el id de una suscripción antes de archivarla.
export const archiveSubscriptionSchema = z.object({
  subscriptionId: z
    .string()
    .uuid("A valid subscription is required."),
});

// Estos tipos salen automáticamente de los schemas.
// Así TypeScript sabe qué datos son válidos.
export type CreateSubscriptionSchema = z.infer<
  typeof createSubscriptionSchema
>;

export type UpdateSubscriptionSchema = z.infer<
  typeof updateSubscriptionSchema
>;

export type ArchiveSubscriptionSchema = z.infer<
  typeof archiveSubscriptionSchema
>;

// Este schema valida el id de una suscripción antes de restaurarla.
export const restoreSubscriptionSchema = z.object({
  subscriptionId: z
    .string()
    .uuid("A valid subscription is required."),
});

// Este tipo sale automáticamente del schema de restaurar.
export type RestoreSubscriptionSchema = z.infer<
  typeof restoreSubscriptionSchema
>;