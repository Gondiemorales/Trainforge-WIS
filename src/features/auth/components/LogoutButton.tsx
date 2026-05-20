// Importamos la acción del servidor que cierra sesión.
import { logoutAction } from "../server/logout.action";

// Este componente muestra un botón para cerrar sesión.
// Usa un formulario porque las Server Actions se pueden ejecutar desde forms.
export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="btn btn-outline btn-sm">
        Logout
      </button>
    </form>
  );
}