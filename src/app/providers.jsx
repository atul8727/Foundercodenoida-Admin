import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/features/theme/ThemeContext";
import { AuthProvider } from "@/features/auth/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
