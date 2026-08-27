import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import AuthBrandPanel from "./components/AuthBrandPanel";
import AuthForm from "./components/AuthForm";
import { loginUser, registerUser } from "./services/authService";
import "./styles/AuthPage.css";

const initialLoginState = {
  email: "",
  password: "",
};

const initialRegisterState = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

const AuthPage = () => {
  const { restoreSession } = useAuth();
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState(initialLoginState);
  const [registerData, setRegisterData] = useState(initialRegisterState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await loginUser(loginData);
      setMessage({
        type: "success",
        text: "Login successful! Redirecting to your dashboard...",
      });
      await restoreSession();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong while logging in.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await registerUser(registerData);
      setMessage({
        type: "success",
        text: "Registration successful! Please log in to continue.",
      });
      setMode("login");
      setRegisterData(initialRegisterState);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.message || "Something went wrong while creating your account.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <AuthBrandPanel />
        <AuthForm
          mode={mode}
          loginData={loginData}
          registerData={registerData}
          isSubmitting={isSubmitting}
          message={message}
          onModeChange={setMode}
          onLoginChange={handleLoginChange}
          onRegisterChange={handleRegisterChange}
          onLoginSubmit={handleLoginSubmit}
          onRegisterSubmit={handleRegisterSubmit}
        />
      </div>
    </div>
  );
};

export default AuthPage;
