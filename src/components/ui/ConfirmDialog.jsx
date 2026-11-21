import { AlertTriangle, HelpCircle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({ open, onClose, onConfirm, title = "Are you sure?", message, confirmText = "Confirm", cancelText = "Cancel", variant = "danger", loading = false }) {
  const danger = variant === "danger";
  const Icon = danger ? AlertTriangle : HelpCircle;
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>{cancelText}</Button>
          <Button variant={variant} size="sm" loading={loading} onClick={onConfirm}>{confirmText}</Button>
        </>
      }>
      <div className="flex items-start gap-3.5 py-1">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${danger ? "bg-danger/15 text-danger" : "bg-primary-soft text-primary"}`}>
          <Icon size={20} />
        </div>
        <p className="muted flex-1 text-sm leading-relaxed">{message}</p>
      </div>
    </Modal>
  );
}
