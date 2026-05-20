type ClientStatusBadgeProps = {
  isActive: boolean;
  isArchived: boolean;
};

export function ClientStatusBadge({
  isActive,
  isArchived,
}: ClientStatusBadgeProps) {
  if (isArchived) {
    return (
      <span className="badge badge-neutral">
        Archived
      </span>
    );
  }

  if (!isActive) {
    return (
      <span className="badge badge-warning">
        Inactive
      </span>
    );
  }

  return (
    <span className="badge badge-success">
      Active
    </span>
  );
}