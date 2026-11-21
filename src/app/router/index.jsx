import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./guards";
import { useAuth } from "@/features/auth/useAuth";
import { HOME_PATH } from "@/config/app";
import { MODULES, isModuleVisible } from "@/config/modules";
import AppLayout from "@/components/layout/AppLayout";
import ModulePage from "@/components/ui/ModulePage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/common/NotFoundPage";

const Home = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? HOME_PATH : "/login"} replace />;
};

// Protected routes are generated from config/modules.js - no edit needed here for a new module.
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {MODULES.filter(isModuleVisible).map((m) => {
            const Page = m.page;
            return <Route key={m.key} path={m.path} element={Page ? <Page /> : <ModulePage module={m} />} />;
          })}
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
