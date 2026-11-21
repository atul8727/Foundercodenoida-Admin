import axios from "axios";
import { getToken, isTokenExpired, clearSession } from "./tokenService";
import { API_BASE_URL } from "@/config/app";

const isDevProxy = import.meta.env.VITE_DEV_PROXY === "true";

const api = axios.create({
  baseURL: isDevProxy ? "" : API_BASE_URL,
  timeout: 20000,
  headers: { Accept: "application/json" },
});

// Attach the token. If it is already expired, stop the request and sign the user out.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !config.skipAuthHandling) {
    if (isTokenExpired(token)) {
      clearSession("expired");
      return Promise.reject(new axios.CanceledError("Session expired. Please sign in again."));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 from the server = token invalid / expired -> automatic sign-out.
// Login and logout use { skipAuthHandling: true } so they never trigger this.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !err.config?.skipAuthHandling) {
      clearSession("unauthorized");
    }
    return Promise.reject(err);
  }
);

export default api;
