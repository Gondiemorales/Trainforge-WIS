type TrainerStatusBadgeProps = {
  isActive: boolean;
};

// Este componente muestra si el usuario del trainer está activo o desactivado.
export function TrainerStatusBadge({ isActive }: TrainerStatusBadgeProps) {
  if (isActive) {
    return <span className="badge badge-success">Active</span>;
  }

  return <span className="badge badge-error">Inactive</span>;
}