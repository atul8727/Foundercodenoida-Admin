import { Navigate, useLocation } from "react-router-dom";
import { Inbox, ListFilter, Lock, Search } from "lucide-react";
import LoginForm from "@/features/auth/components/LoginForm";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAuth } from "@/features/auth/useAuth";
import { APP_NAME, APP_SUBTITLE, HOME_PATH } from "@/config/app";

const POINTS = [
  { icon: Inbox, text: "Enquiries from every product and website form in one place" },
  { icon: ListFilter, text: "Track status from New to Converted" },
  { icon: Search, text: "Search, filter and export" },
];

// Mobile: bottom edge is a "V". Desktop: right edge is an arrow pointing into the form side.
const HERO_SHAPE =
  "[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_44px),50%_100%,0_calc(100%_-_44px))] " +
  "lg:[clip-path:polygon(0_0,calc(100%_-_70px)_0,100%_50%,calc(100%_-_70px)_100%,0_100%)]";

// Makes inputs and the submit button pill-shaped without touching LoginForm.
const PILL_FORM =
  "[&_input:not([type=checkbox])]:rounded-full [&_button[type=submit]]:rounded-full";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    const back = from && from.startsWith("/") && !from.startsWith("//") && from !== "/login" ? from : null;
    return <Navigate to={back || HOME_PATH} replace />;
  }

  return (
    <div className="relative flex min-h-full flex-col bg-surface lg:flex-row">
      {/* Brand side */}
      <header className="relative z-10 lg:w-[52%] lg:shrink-0">
        <div className={`relative overflow-hidden bg-primary-soft lg:absolute lg:inset-0 ${HERO_SHAPE}`}>
          <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full bg-primary/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-primary/10" />

          <div className="relative flex justify-center px-6 pb-20 pt-7 lg:min-h-screen lg:flex-col lg:justify-between lg:gap-8 lg:py-12 lg:pl-16 lg:pr-32">
            <Logo className="self-center lg:self-start [&_img]:h-12 lg:[&_img]:h-14" />

            <div className="hidden max-w-md space-y-6 lg:block">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold leading-tight tracking-tight">{APP_SUBTITLE}</h2>
                <p className="muted leading-relaxed">Manage all enquiries and leads for {APP_NAME} Noida.</p>
              </div>
              <ul className="divide-y divide-primary/15 border-y border-primary/15">
                {POINTS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 py-3 text-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
                      <Icon size={18} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="hidden text-xs text-muted lg:block">
              © {new Date().getFullYear()} {APP_NAME} Noida
            </p>
          </div>
        </div>

        {/* Lock badge on the tip (desktop) / bottom centre (mobile) */}
        <div
          aria-hidden="true"
          className="absolute -bottom-[30px] left-1/2 flex h-[62px] w-[62px] -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-surface bg-primary text-white lg:-right-[6px] lg:bottom-auto lg:left-auto lg:top-1/2 lg:h-[76px] lg:w-[76px] lg:-translate-y-1/2 lg:translate-x-0 lg:border-8"
        >
          <Lock size={24} />
        </div>
      </header>

      {/* Form side */}
      <main className="flex min-w-0 flex-1 flex-col px-6 pb-8 pt-12 sm:px-10 lg:p-10">
        <div className="absolute right-3 top-3 z-20 lg:static lg:flex lg:justify-end">
          <ThemeToggle />
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-6 lg:pl-8">
          <div className="mb-7 space-y-1 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
            <p className="muted text-sm">Sign in to open your dashboard.</p>
          </div>

          <div className={PILL_FORM}>
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-xs text-muted">Authorised admins only</p>
        </div>
      </main>
    </div>
  );
}