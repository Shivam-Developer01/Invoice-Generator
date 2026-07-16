function StatusBadge({
  active,
  activeText = "Active",
  inactiveText = "Inactive",
}) {
  return (
    <span className={`badge ${active ? "bg-success" : "bg-danger"}`}>
      {active ? activeText : inactiveText}
    </span>
  );
}

export default StatusBadge;
