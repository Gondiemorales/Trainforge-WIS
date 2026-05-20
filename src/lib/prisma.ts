// Este import asegura que este archivo solo se use en el servidor.
// No queremos que la conexión a la base de datos llegue al navegador.
import "server-only";

// Importamos el adaptador de Neon.
// Esto permite que Prisma se conecte correctamente a nuestra base de datos Neon.
import { PrismaNeon } from "@prisma/adapter-neon";

// Importamos el Prisma Client que hemos generado desde nuestro schema.
import { PrismaClient } from "@/generated/prisma/client";

// Creamos el adaptador usando la URL con pooler.
// DATABASE_URL viene del archivo .env.
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

// Creamos un tipo global para guardar Prisma en desarrollo.
// Esto evita crear muchas conexiones cuando Next.js recarga la app automáticamente.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Creamos Prisma una sola vez.
// Si ya existe una conexión, la reutilizamos.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

// En desarrollo guardamos Prisma en globalThis.
// Así evitamos abrir conexiones nuevas en cada recarga.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}