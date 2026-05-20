type TrainerArchiveBadgeProps = {
  isArchived: boolean;
};

// Este componente muestra si el perfil del trainer está archivado o disponible.
export function TrainerArchiveBadge({
  isArchived,
}: TrainerArchiveBadgeProps) {
  if (isArchived) {
    return <span className="badge badge-neutral">Archived</span>;
  }

  return <span className="badge badge-primary">Available</span>;
}