import { useEffect } from "react";
import { createPortal } from "react-dom";

// Shared base for Modal: backdrop, Esc to close, page scroll lock.
export default function Overlay({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-fade-in bg-black/55" onClick={onClose} aria-hidden="true" />
      {children}
    </div>,
    document.body
  );
}
