import api from "@/services/apiClient";
import { ENDPOINTS } from "@/config/endpoints";
import { API_BASE_URL } from "@/config/app";
import {
  setToken,
  setStoredUser,
  getToken,
  getStoredUser,
  isTokenExpired,
  clearSession,
} from "@/services/tokenService";

/**
 * POST /login   { email, password }
 * Response: { success, message, token, admin: { id, name, email, phone } }
 */
export const loginRequest = async ({ email, password }) => {
  if (!API_BASE_URL) throw new Error("API URL is not set. Add VITE_API_URL to your .env file.");

  const res = await api.post(
    ENDPOINTS.auth.login,
    { email: (email || "").trim(), password: password || "" }, // password is never trimmed or changed
    { skipAuthHandling: true } // a wrong password must not behave like an expired session
  );

  const body = res.data;
  if (!body || body.success === false) {
    throw new Error(body?.message || "Login failed. Please check your email and password.");
  }
  const { token, admin } = body;
  if (!token || !admin) throw new Error("Invalid response from server. Token or admin details are missing.");
  if (isTokenExpired(token)) throw new Error("Server returned an already-expired session. Please contact support.");

  const user = { id: admin.id, name: admin.name || "Admin", email: admin.email || email, phone: admin.phone || "" };
  setToken(token);
  setStoredUser(user);
  return { user, message: body.message || "Login successful." };
};

/**
 * POST /admin/logout  (Bearer token)
 * The server only says "remove the token on the client", so the caller always clears the session afterwards.
 */
export const logoutRequest = async () => {
  const token = getToken();
  if (!token || !API_BASE_URL) return;
  await api.post(ENDPOINTS.auth.logout, null, {
    headers: { Authorization: `Bearer ${token}` },
    skipAuthHandling: true, // a 401 here must not show "session expired"
  });
};

/**
 * Restore the session on page load. Returns the admin only if the token exists and is not expired.
 * The server still verifies the token on every API call.
 */
export const loadSession = () => {
  const token = getToken();
  const stored = getStoredUser();
  if (!token || !stored) {
    if (token || stored) clearSession("invalid");
    return null;
  }
  if (isTokenExpired(token)) {
    clearSession("expired");
    return null;
  }
  return stored;
};
