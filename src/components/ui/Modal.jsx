import { X } from "lucide-react";
import Overlay from "./Overlay";
import IconButton from "./IconButton";

const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export default function Modal({ open, onClose, title, children, footer, size = "md" }) {
  return (
    <Overlay open={open} onClose={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title}
        className={`relative flex max-h-[90vh] w-full animate-slide-up flex-col rounded-xl border border-line bg-surface shadow-pop ${sizes[size]}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h3 className="text-base font-semibold">{title}</h3>
          <IconButton icon={X} label="Close" onClick={onClose} />
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2.5 border-t border-line px-5 py-3">{footer}</div>}
      </div>
    </Overlay>
  );
}
