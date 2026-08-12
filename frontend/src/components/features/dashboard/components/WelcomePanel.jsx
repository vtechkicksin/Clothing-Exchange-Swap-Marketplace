import { useNavigate } from "react-router-dom";

const WelcomePanel = () => {
  const navigate = useNavigate();

  return (
    <section className="welcome-panel">
      <div>
        <h1>
          Welcome back, Neha! <span>👋</span>
        </h1>
        <p>Let&apos;s make fashion sustainable together.</p>

        <div className="cta-row">
          <button type="button" className="primary-action">
            Browse Items
          </button>
          <button
            type="button"
            className="secondary-action"
            onClick={() => navigate("/list-item")}
          >
            List Your Item
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomePanel;
