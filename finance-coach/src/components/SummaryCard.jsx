function SummaryCard({ title, value, subtitle, icon }) {
  return (
    <div className="summary-card">
      <div className="summary-header">
        <span>{title}</span>

        <div className="summary-icon">
          {icon}
        </div>
      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>
    </div>
  );
}

export default SummaryCard;