export const APP_NAME = "Founder Code";
export const APP_SUBTITLE = "Admin Dashboard";

/**
 * API root - SINGLE source of truth. Set it in .env:  VITE_API_URL=https://fcadmin.fctesting.space
 * Endpoint paths live in config/endpoints.js.
 */
const rawUrl = String(import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
export const API_BASE_URL = rawUrl.endsWith("/api") ? rawUrl.slice(0, -4) : rawUrl;

export const HOME_PATH = "/dashboard";

/**
 * Session
 *  TOKEN_STORAGE: "local"   -> stays signed in after the browser is closed
 *                 "session" -> signed out when the tab / browser is closed (safer on shared PCs)
 */
export const TOKEN_STORAGE = "local";
