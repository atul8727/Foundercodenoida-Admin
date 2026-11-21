import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, Info, TriangleAlert, X } from "lucide-react";

const ToastContext = createContext(null);

const types = {
  success: { icon: CheckCircle2, bar: "bg-success", color: "text-success" },
  error: { icon: AlertCircle, bar: "bg-danger", color: "text-danger" },
  warning: { icon: TriangleAlert, bar: "bg-warning", color: "text-warning" },
  info: { icon: Info, bar: "bg-primary", color: "text-primary" },
};

//   const toast = useToast();  toast.success("Saved");  toast.error("Failed");
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const remove = useCallback((id) => setItems((l) => l.filter((t) => t.id !== id)), []);

  const push = useCallback(
    (type, message, duration = 4000) => {
      const id = Date.now() + Math.random();
      setItems((l) => [...l, { id, type, message }]);
      if (duration) setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  const toast = useMemo(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m, 6000),
      warning: (m) => push("warning", m),
      info: (m) => push("info", m),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed right-4 top-4 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2.5">
        {items.map((t) => {
          const cfg = types[t.type] || types.info;
          const Icon = cfg.icon;
          return (
            <div key={t.id} role="status" className="card pointer-events-auto relative flex animate-slide-up items-start gap-3 py-3 pl-5 pr-3 shadow-pop">
              <span className={`absolute inset-y-0 left-0 w-1.5 ${cfg.bar}`} />
              <Icon size={18} className={`mt-0.5 shrink-0 ${cfg.color}`} />
              <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
              <button type="button" onClick={() => remove(t.id)} aria-label="Dismiss" className="rounded p-1 text-muted hover:bg-surface-2 hover:text-ink">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
