function SectionCard({ title, children }) {
  return (
    <div className="section-card">
      <div className="section-title">
        <h3>{title}</h3>
      </div>

      {children}
    </div>
  );
}

export default SectionCard;