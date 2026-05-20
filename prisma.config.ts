// Cargamos las variables privadas del archivo .env.
// Aquí están DATABASE_URL y DIRECT_URL.
import "dotenv/config";

// Importamos las herramientas que Prisma usa para crear su configuración.
import { defineConfig, env } from "prisma/config";

// Configuramos Prisma para leer todos los archivos .prisma dentro de la carpeta prisma.
export default defineConfig({
  // Usamos la carpeta completa porque ahora tenemos un schema dividido en varios archivos.
  schema: "prisma/",

  // Aquí Prisma guardará el historial de cambios de la base de datos.
  migrations: {
    path: "prisma/migrations",
  },

  // Usamos DIRECT_URL porque Prisma necesita una conexión directa para crear o modificar tablas.
  datasource: {
    url: env("DIRECT_URL"),
  },
});