import { useEffect, useRef, useState } from "react";

export function DropdownItem({ icon: Icon, children, onClick, danger = false, disabled = false }) {
  return (
    <button type="button" role="menuitem" disabled={disabled} onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors disabled:opacity-50 ${danger ? "text-danger hover:bg-danger/10" : "hover:bg-surface-2"}`}>
      {Icon && <Icon size={16} className={danger ? "" : "text-muted"} />}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="my-1 border-t border-line" role="separator" />;
}

export default function Dropdown({ trigger, children, align = "right", width = "w-56", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div role="menu" onClick={() => setOpen(false)}
          className={`card absolute z-50 mt-2 animate-fade-in p-1 shadow-pop ${width} ${align === "right" ? "right-0" : "left-0"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
