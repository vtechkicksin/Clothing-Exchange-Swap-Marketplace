const activityItems = [
  { label: "Swap Requests", count: "2 new requests", icon: "📦", active: true },
  { label: "Messages", count: "3 unread messages", icon: "💬", active: false },
  { label: "Saved Items", count: "8 items saved", icon: "♡", active: false },
  {
    label: "Swap History",
    count: "View your past swaps",
    icon: "🧥",
    active: false,
  },
];

const ActivityCard = () => {
  return (
    <div className="activity-card panel-box">
      <div className="panel-header">
        <h3>Your Activity</h3>
      </div>

      <div className="activity-list">
        {activityItems.map((item) => (
          <div key={item.label} className="activity-row">
            <div className="activity-main">
              <span className="activity-icon">{item.icon}</span>
              <div>
                <div className="activity-label">{item.label}</div>
                <small>{item.count}</small>
              </div>
            </div>
            <button type="button" className="ghost-button">
              {item.active ? "View" : "Open"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
