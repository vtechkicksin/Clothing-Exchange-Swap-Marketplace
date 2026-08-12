import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./components/features/auth/AuthPage";
import DashboardPage from "./components/features/dashboard/DashboardPage";
import ListYourItemPage from "./components/features/dashboard/pages/ListYourItemPage";
import "./App.css";

const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.localStorage.getItem("swapstyle_token"));
};

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(getStoredAuth());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLoginSuccess = (result) => {
    const token = result?.token || result?.data?.token;

    if (token) {
      window.localStorage.setItem("swapstyle_token", token);
    }

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("swapstyle_token");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/list-item"
        element={
          isAuthenticated ? (
            <ListYourItemPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
