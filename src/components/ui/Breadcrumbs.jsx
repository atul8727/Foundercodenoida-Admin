import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { HOME_PATH } from "@/config/app";
import { getModuleByPath } from "@/config/modules";

// Built from the route + config/modules.js. Pass `items` to override.
export default function Breadcrumbs({ items, className = "" }) {
  const { pathname } = useLocation();
  const current = getModuleByPath(pathname);
  const list = items || [
    { label: "Home", href: HOME_PATH, icon: Home },
    ...(current && current.path !== HOME_PATH ? [{ label: current.label, href: current.path }] : []),
  ];
  if (list.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-muted ${className}`}>
      <ol className="flex items-center gap-1.5">
        {list.map((item, i) => {
          const last = i === list.length - 1;
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="shrink-0" aria-hidden="true" />}
              {last ? (
                <span className="font-semibold text-ink" aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.href} className="flex items-center gap-1.5 hover:text-primary">
                  {Icon && <Icon size={14} />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
