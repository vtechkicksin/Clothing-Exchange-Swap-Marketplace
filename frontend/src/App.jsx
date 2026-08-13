import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { API_BASE_URL } from "./config/api";
import AuthPage from "./components/features/auth/AuthPage";
import DashboardPage from "./components/features/dashboard/DashboardPage";
import ListYourItemPage from "./components/features/dashboard/pages/ListYourItemPage";
import "./App.css";

const fetchCurrentSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch (error) {
    return null;
  }
};

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const user = await fetchCurrentSession();
      setIsAuthenticated(Boolean(user));
    };

    restoreSession();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthenticated(false);
    }
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
