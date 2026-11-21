import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { getErrorMessage } from "@/services/errorHandler";
import { isEmail } from "@/utils/validators";
import { HOME_PATH } from "@/config/app";

const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 30;

// Only go back to normal in-app pages (never /login, never external URLs)
const safeReturnPath = (from) => {
  const path = from?.pathname;
  if (!path || !path.startsWith("/") || path.startsWith("//") || path === "/login") return null;
  return `${path}${from.search || ""}`;
};

export default function LoginForm() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockLeft, setLockLeft] = useState(0);

  // Small cool-down after repeated failures (the real protection is rate limiting on the server)
  useEffect(() => {
    if (lockLeft <= 0) return undefined;
    const t = setTimeout(() => setLockLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [lockLeft]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Email is required";
    else if (!isEmail(form.email.trim())) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading || lockLeft > 0 || !validate()) return;

    setLoading(true);
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name}`);
      navigate(safeReturnPath(location.state?.from) || HOME_PATH, { replace: true });
    } catch (err) {
      const next = attempts + 1;
      if (next >= MAX_ATTEMPTS) {
        setLockLeft(LOCK_SECONDS);
        setAttempts(0);
        toast.error(`Too many failed attempts. Please wait ${LOCK_SECONDS} seconds.`);
      } else {
        setAttempts(next);
        toast.error(getErrorMessage(err));
      }
      setForm((f) => ({ ...f, password: "" })); // never keep a wrong password in the field
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Input label="Email" name="email" type="email" required value={form.email} error={errors.email} onChange={onChange}
        placeholder="admin@foundercode.in" autoComplete="username" autoFocus />

      <Input label="Password" name="password" type={showPassword ? "text" : "password"} required value={form.password} error={errors.password}
        onChange={onChange} placeholder="Enter your password" autoComplete="current-password" className="pr-10"
        suffix={
          <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}
            className="rounded p-1 text-muted hover:text-ink" tabIndex={-1}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        } />

      <Button type="submit" className="mt-2 w-full" loading={loading} disabled={lockLeft > 0}>
        {lockLeft > 0 ? `Try again in ${lockLeft}s` : "Login"}
      </Button>
    </form>
  );
}
