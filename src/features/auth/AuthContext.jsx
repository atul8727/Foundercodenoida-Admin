import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { loadSession, loginRequest, logoutRequest } from "./auth.service";
import { clearSession, getToken, getTokenExpiryMs, isTokenExpired, SESSION_CLEARED_EVENT } from "@/services/tokenService";
import { useToast } from "@/components/ui/Toast";

export const AuthContext = createContext(null);

const MAX_TIMEOUT = 2 ** 31 - 1; // setTimeout limit (~24 days)

export function AuthProvider({ children }) {
  const toast = useToast();
  const [user, setUser] = useState(loadSession);

  // Any clearSession() (401, expired token, logout) signs the user out of the UI.
  useEffect(() => {
    const onCleared = (e) => {
      setUser(null);
      const reason = e.detail?.reason;
      if (reason === "expired" || reason === "unauthorized") toast.warning("Session expired. Please sign in again.");
    };
    window.addEventListener(SESSION_CLEARED_EVENT, onCleared);
    return () => window.removeEventListener(SESSION_CLEARED_EVENT, onCleared);
  }, [toast]);

  // Auto sign-out the moment the token expires, even if the admin is idle on a page.
  useEffect(() => {
    if (!user) return undefined;
    const token = getToken();
    const exp = getTokenExpiryMs(token);
    if (!exp) return undefined;
    const t = setTimeout(() => {
      if (isTokenExpired(getToken())) clearSession("expired");
    }, Math.min(Math.max(exp - Date.now(), 0), MAX_TIMEOUT));
    return () => clearTimeout(t);
  }, [user]);

  const login = useCallback(async (credentials) => {
    const res = await loginRequest(credentials);
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      /* the token is removed on the client anyway */
    } finally {
      clearSession("logout");
    }
  }, []);

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
