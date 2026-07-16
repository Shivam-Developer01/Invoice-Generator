function StatCard({ title, value, icon, color = "primary", onClick }) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div className={`stat-icon ${color}`}>{icon}</div>

      <div className="stat-content">
        <h2 className="stat-value">{value}</h2>

        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
