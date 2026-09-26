import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

const navItems = [
  "Dashboard",
  "Browse Items",
  "List Your Item",
  "Messages",
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

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const userName = user?.fullName || user?.name || "User";
  const initials = getInitials(userName);

  const handleLogout = async () => {
    await logout();
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
              className={
                (index === 0 && pathname === "/dashboard") ||
                (item === "Messages" && pathname === "/messages")
                  ? "nav-link active"
                  : "nav-link"
              }
              onClick={() => {
                if (item === "Dashboard") navigate("/dashboard");
                if (item === "List Your Item") navigate("/list-item");
                if (item === "Messages") navigate("/messages");
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
