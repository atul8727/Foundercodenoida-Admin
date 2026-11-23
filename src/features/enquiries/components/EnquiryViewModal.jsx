import { Mail, Phone } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { formatDateTime } from "@/utils/formatDate";

export default function EnquiryViewModal({ enquiry, onClose }) {
  if (!enquiry) return null;
  return <Modal open onClose={onClose} title="Enquiry details" footer={<Button onClick={onClose}>Close</Button>}>
    <div className="space-y-5"><div><p className="text-lg font-bold">{enquiry.name}</p><p className="mt-1 text-sm text-muted">{enquiry.subject || "No subject"}</p></div><div className="grid gap-3 sm:grid-cols-2"><Info icon={Mail} label="Email" value={enquiry.email} /><Info icon={Phone} label="Phone" value={enquiry.phone || "—"} /></div><div><p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted">Message</p><p className="whitespace-pre-wrap rounded-lg bg-surface-2 p-3 text-sm leading-6">{enquiry.message || "—"}</p></div><p className="text-xs text-muted">Received {formatDateTime(enquiry.created_at)}</p></div>
  </Modal>;
}
function Info({ icon: Icon, label, value }) { return <div className="rounded-lg border border-line p-3"><p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-muted"><Icon size={14} />{label}</p><p className="break-words text-sm font-medium">{value}</p></div>; }
