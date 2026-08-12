const AuthForm = ({
  mode,
  loginData,
  registerData,
  isSubmitting,
  message,
  onModeChange,
  onLoginChange,
  onRegisterChange,
  onLoginSubmit,
  onRegisterSubmit,
}) => {
  return (
    <div className="form-panel">
      <div
        className="switcher"
        role="tablist"
        aria-label="Authentication toggle"
      >
        <button
          type="button"
          className={mode === "login" ? "active" : ""}
          onClick={() => onModeChange("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={mode === "register" ? "active" : ""}
          onClick={() => onModeChange("register")}
        >
          Register
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {mode === "login" ? (
        <form className="auth-form" onSubmit={onLoginSubmit}>
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue your wardrobe journey</p>
          </div>

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={onLoginChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={onLoginChange}
              placeholder="Enter your password"
              required
            />
          </label>

          <div className="form-row">
            <label className="checkbox-wrap">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={onRegisterSubmit}>
          <div className="form-header">
            <h2>Create account</h2>
            <p>Join the exchange community today</p>
          </div>

          <label>
            <span>Full Name</span>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={onRegisterChange}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={onRegisterChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Phone</span>
            <input
              type="tel"
              name="phone"
              value={registerData.phone}
              onChange={onRegisterChange}
              placeholder="Optional phone number"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={onRegisterChange}
              placeholder="Create a strong password"
              required
            />
          </label>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
