import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  getToken,
  getStoredUser,
  setToken,
  setStoredUser,
  clearSession,
  isSessionExpired,
} from "../utils/token";

const AuthContext = createContext();

const EXPIRES_AT_KEY = "expiresAt";

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const [token, setTokenState] = useState(getToken());
  const [user, setUser] = useState(getStoredUser());
  const [loading] = useState(false);

  const login = useCallback(({ token, user, rememberMe }) => {
    const expiresAt = rememberMe
      ? Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      : Date.now() + 12 * 60 * 60 * 1000; // 12 hours

    localStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString());

    setToken(token);
    setStoredUser(user);

    setTokenState(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    clearSession();

    queryClient.clear();

    setTokenState(null);
    setUser(null);
  }, [queryClient]);

  useEffect(() => {
    if (token && isSessionExpired()) {
      logout();
    }
  }, [token, logout]);

  const updateUser = useCallback((updatedUser) => {
    setStoredUser(updatedUser);
    setUser(updatedUser);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
      updateUser,
    }),
    [token, user, loading, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
