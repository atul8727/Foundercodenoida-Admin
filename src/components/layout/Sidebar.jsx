import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import Logo from "./Logo";
import Tooltip from "@/components/ui/Tooltip";
import { MODULES, isModuleVisible } from "@/config/modules";
import { APP_SUBTITLE } from "@/config/app";

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const menu = MODULES.filter((m) => isModuleVisible(m) && !m.hideInSidebar);
  const groups = [...new Set(menu.map((m) => m.group))];

  const link = ({ path, label, icon: Icon }) => (
    <NavLink
      to={path}
      onClick={onCloseMobile}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${collapsed ? "lg:justify-center lg:px-2" : ""} ${
          isActive ? "bg-primary text-on-solid" : "text-muted hover:bg-surface-2 hover:text-ink"
        }`
      }
    >
      <Icon size={20} className="shrink-0" />
      <span className={`truncate ${collapsed ? "lg:hidden" : ""}`}>{label}</span>
    </NavLink>
  );

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/55 lg:hidden" onClick={onCloseMobile} aria-hidden="true" />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface transition-all duration-200 ${
          mobileOpen ? "translate-x-0 shadow-pop" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "lg:w-[76px]" : "lg:w-64"}`}
      >
        <div className={`flex h-16 shrink-0 items-center justify-between border-b border-line px-4 ${collapsed ? "lg:justify-center lg:px-2" : ""}`}>
          <div className="lg:hidden"><Logo /></div>
          <div className="hidden lg:block"><Logo collapsed={collapsed} /></div>
          <button type="button" onClick={onCloseMobile} aria-label="Close menu" className="rounded-md p-1.5 text-muted hover:bg-surface-2 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Main navigation">
          {groups.map((g) => (
            <div key={g} className="space-y-1">
              <p className={`px-3 text-[11px] font-semibold uppercase tracking-wider text-muted ${collapsed ? "lg:hidden" : ""}`}>{g}</p>
              <ul className="space-y-1">
                {menu.filter((m) => m.group === g).map((m) => (
                  <li key={m.key}>
                    {collapsed ? (
                      <>
                        <div className="hidden lg:block"><Tooltip content={m.label} position="right">{link(m)}</Tooltip></div>
                        <div className="lg:hidden">{link(m)}</div>
                      </>
                    ) : (
                      link(m)
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className={`shrink-0 border-t border-line px-4 py-3 text-xs text-muted ${collapsed ? "lg:hidden" : ""}`}>{APP_SUBTITLE}</p>
      </aside>
    </>
  );
}
