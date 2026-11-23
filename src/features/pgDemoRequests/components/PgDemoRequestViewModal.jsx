import { Building2, Mail, Phone, Users } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { formatDateTime } from "@/utils/formatDate";

export default function PgDemoRequestViewModal({ request, onClose }) {
  if (!request) return null;
  return <Modal open onClose={onClose} title="PG demo request" footer={<Button onClick={onClose}>Close</Button>}><div className="space-y-5"><div><p className="text-lg font-bold">{request.full_name}</p><p className="mt-1 text-sm text-muted">{request.property_name}</p></div><div className="grid gap-3 sm:grid-cols-2"><Info icon={Mail} label="Email" value={request.email} /><Info icon={Phone} label="Phone" value={request.phone_number || "—"} /><Info icon={Users} label="Guests" value={request.number_of_guests || "—"} /><Info icon={Building2} label="Property" value={request.property_name || "—"} /></div><div><p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted">Special requests</p><p className="whitespace-pre-wrap rounded-lg bg-surface-2 p-3 text-sm leading-6">{request.special_requests || "—"}</p></div><p className="text-xs text-muted">Received {formatDateTime(request.created_at)}</p></div></Modal>;
}
function Info({ icon: Icon, label, value }) { return <div className="rounded-lg border border-line p-3"><p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-muted"><Icon size={14} />{label}</p><p className="break-words text-sm font-medium">{value}</p></div>; }
