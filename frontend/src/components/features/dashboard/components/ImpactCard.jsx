const stats = [
  { label: "Items Listed", value: "12", icon: "📦" },
  { label: "Successful Swaps", value: "5", icon: "✅" },
  { label: "CO₂ Saved", value: "320 kg", icon: "🌿" },
];

const ImpactCard = () => {
  return (
    <aside className="impact-card">
      <h3>Your Impact</h3>
      <div className="impact-list">
        {stats.map((stat) => (
          <div key={stat.label} className="impact-item">
            <span className="impact-icon">{stat.icon}</span>
            <div className="impact-value-block">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ImpactCard;
