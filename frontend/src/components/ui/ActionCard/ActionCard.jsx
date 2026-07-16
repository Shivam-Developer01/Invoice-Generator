import { FaArrowRight } from "react-icons/fa";

function ActionCard({ title, description, icon, color = "primary", onClick }) {
  return (
    <div className="action-card" onClick={onClick}>
      <div className={`action-card-icon ${color}`}>{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>

      <div className="action-footer">
        <span>Open Module</span>

        <FaArrowRight />
      </div>
    </div>
  );
}

export default ActionCard;
