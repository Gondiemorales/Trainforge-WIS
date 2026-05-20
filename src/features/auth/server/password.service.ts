// Importamos bcryptjs para comparar contraseñas.
// Lo usamos porque las contraseñas guardadas en la base de datos están cifradas.
import bcrypt from "bcryptjs";

// Esta función compara la contraseña escrita por el usuario
// con la contraseña cifrada guardada en la base de datos.
export async function verifyPassword(
  plainPassword: string,
  passwordHash: string,
) {
  return bcrypt.compare(plainPassword, passwordHash);
}

// Esta función cifra una contraseña normal.
// La usaremos más adelante si creamos usuarios desde formularios.
export async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, 10);
}