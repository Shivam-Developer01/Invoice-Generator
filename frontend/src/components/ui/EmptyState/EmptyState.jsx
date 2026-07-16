import { FaInbox } from "react-icons/fa";

function EmptyState({
  icon = <FaInbox />,
  title = "No Data Found",
  description = "There is nothing to display.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </div>
  );
}

export default EmptyState;
