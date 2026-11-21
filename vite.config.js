import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const useProxy = env.VITE_DEV_PROXY === "true";
  const rawTarget = env.VITE_API_URL || "https://fcadmin.fctesting.space";
  const target = rawTarget.replace(/\/api\/?$/, "");

  return {
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    server: {
      proxy: useProxy
        ? {
            "/api": {
              target,
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
  };
});
