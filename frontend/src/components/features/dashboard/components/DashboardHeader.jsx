import { useNavigate } from "react-router-dom";

const navItems = [
  "Dashboard",
  "Browse Items",
  "List Your Item",
  "Chat Support",
  "Calendar",
];

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const DashboardHeader = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const userName = user?.fullName || user?.name || "User";
  const initials = getInitials(userName);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <div className="brand-row">
        <div className="brand-logo">
          <span className="logo-icon">◌</span>
          <div>
            <div className="brand-name">SwapStyle</div>
            <div className="brand-subtitle">Exchange. Sustain. Inspire.</div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={index === 0 ? "nav-link active" : "nav-link"}
              onClick={() => {
                if (item === "Dashboard") navigate("/dashboard");
                if (item === "List Your Item") navigate("/list-item");
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="profile-mini">
        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          🔔
        </button>
        <div className="user-chip">
          <div className="avatar">{initials}</div>
          <span>{userName}</span>
        </div>
        <button
          type="button"
          className="secondary-action"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
