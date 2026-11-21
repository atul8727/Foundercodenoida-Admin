import { TOKEN_STORAGE } from "@/config/app";

/**
 * Low-level session storage (token + admin).
 * One place only - nothing else in the app touches localStorage for auth.
 */
const TOKEN_KEY = "fc-token";
const USER_KEY = "fc-user";

export const SESSION_CLEARED_EVENT = "auth:session-cleared";

const store = () => (TOKEN_STORAGE === "session" ? window.sessionStorage : window.localStorage);

const read = (k) => {
  try {
    return store().getItem(k);
  } catch {
    return null;
  }
};
const write = (k, v) => {
  try {
    store().setItem(k, v);
  } catch {
    /* storage blocked / full - ignore */
  }
};

export const getToken = () => read(TOKEN_KEY);
export const setToken = (t) => t && write(TOKEN_KEY, t);

export const getStoredUser = () => {
  try {
    const raw = read(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
export const setStoredUser = (u) => write(USER_KEY, JSON.stringify(u));

// JWT helpers. No verification here - the SERVER verifies; this only reads the expiry.
export const decodeJwt = (token) => {
  try {
    const part = String(token).split(".")[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const getTokenExpiryMs = (token) => {
  const p = decodeJwt(token);
  return p?.exp ? p.exp * 1000 : null;
};

// A token without a readable expiry is treated as valid - the server decides.
export const isTokenExpired = (token, skewMs = 5000) => {
  const exp = getTokenExpiryMs(token);
  return exp ? Date.now() >= exp - skewMs : false;
};

/**
 * Remove the session and tell the app (AuthProvider listens and signs the user out).
 * reason: "logout" | "expired" | "unauthorized" | "invalid"
 */
export const clearSession = (reason = "logout") => {
  try {
    [TOKEN_KEY, USER_KEY].forEach((k) => store().removeItem(k));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(SESSION_CLEARED_EVENT, { detail: { reason } }));
};
