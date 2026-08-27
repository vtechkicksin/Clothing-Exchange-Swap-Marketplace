import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { setUnauthorizedHandler } from "../config/api";
import {
  getCurrentUser,
  logoutUser,
} from "../components/features/auth/services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticatedRef = useRef(false);

  const clearSession = useCallback(() => {
    setUser(null);
    isAuthenticatedRef.current = false;
  }, []);

  const restoreSession = useCallback(async () => {
    const userData = await getCurrentUser();

    if (userData) {
      setUser(userData);
      isAuthenticatedRef.current = true;
    } else {
      clearSession();
    }

    return userData;
  }, [clearSession]);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);
      await restoreSession();
      setIsLoading(false);
    };

    initSession();
  }, [restoreSession]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (isAuthenticatedRef.current) {
        clearSession();
      }
    });

    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    restoreSession,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
