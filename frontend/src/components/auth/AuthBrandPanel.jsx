const AuthBrandPanel = () => {
  return (
    <div className="brand-panel">
      <div className="brand-header">
        <div className="brand-mark">SwapStyle</div>
        <div className="brand-meta">Sustainable Style</div>
      </div>

      <div className="brand-copy">
        <h1>
          Welcome back,
          <br />
          Neha!
        </h1>
        <p>Let&apos;s make fashion sustainable together.</p>
      </div>

      <div className="feature-list">
        <span>Browse items</span>
        <span>List your item</span>
        <span>Save favorites</span>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
