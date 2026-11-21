import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { PageLoader } from "@/components/ui/Spinner";

const KEY = "fc-sidebar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(KEY) === "collapsed"; } catch { return false; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const next = !collapsed;
      setCollapsed(next);
      try { localStorage.setItem(KEY, next ? "collapsed" : "open"); } catch { /* ignore */ }
    } else {
      setMobileOpen((o) => !o);
    }
  };

  return (
    <div className="min-h-full">
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className={`transition-all duration-200 ${collapsed ? "lg:pl-[76px]" : "lg:pl-64"}`}>
        <Topbar onToggleSidebar={toggle} />
        <main className="p-4 sm:p-6">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
