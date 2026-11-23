import { useMemo, useState } from "react";
import { Eye, Inbox, Mail, Phone, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { enquiriesService } from "@/features/enquiries/enquiries.service";
import EnquiryViewModal from "@/features/enquiries/components/EnquiryViewModal";
import { formatDateTime } from "@/utils/formatDate";

const PAGE_SIZE = 10;
export default function EnquiriesPage() {
  const [page, setPage] = useState(1); const [query, setQuery] = useState(""); const [selected, setSelected] = useState(null); const [deleteTarget, setDeleteTarget] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => enquiriesService.list({ page, limit: PAGE_SIZE }), { deps: [page] });
  const { mutate: remove, loading: deleting } = useMutation(enquiriesService.remove, { successMessage: "Enquiry deleted successfully", onSuccess: () => { setDeleteTarget(null); refetch(); } });
  const rows = useMemo(() => { const q = query.trim().toLowerCase(); return (data?.items || []).filter((item) => !q || [item.name, item.email, item.phone, item.subject, item.message].some((value) => value?.toLowerCase().includes(q))); }, [data, query]);
  const columns = [
    { key: "name", header: "Contact", render: (row) => <div><p className="font-semibold">{row.name}</p><p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted"><Mail size={12} />{row.email}</p></div> },
    { key: "phone", header: "Phone", render: (row) => row.phone ? <span className="inline-flex items-center gap-1.5 text-muted"><Phone size={14} />{row.phone}</span> : "—" },
    { key: "subject", header: "Subject", render: (row) => <span className="line-clamp-2 max-w-[240px]">{row.subject || "—"}</span> },
    { key: "created_at", header: "Received", render: (row) => formatDateTime(row.created_at) },
    { key: "actions", header: "", className: "w-24", render: (row) => <div className="flex justify-end gap-1"><button aria-label="View enquiry" onClick={() => setSelected(row)} className="rounded p-2 text-primary hover:bg-primary-soft"><Eye size={16} /></button><button aria-label="Delete enquiry" onClick={() => setDeleteTarget(row)} className="rounded p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button></div> },
  ];
  return <><PageHeader title="Enquiries" description="Messages submitted from your website contact form." /><Card><div className="border-b border-line p-4"><SearchInput placeholder="Search name, email, subject or message..." className="max-w-md" onChange={setQuery} /></div><Table columns={columns} data={rows} rowKey="id" loading={loading} error={error} onRetry={refetch} emptyIcon={Inbox} emptyTitle={query ? "No matching enquiries" : "No enquiries yet"} emptyText={query ? "Try a different search." : "New website enquiries will appear here."} />{!loading && !error && <Pagination page={data?.pagination?.page || page} pageSize={data?.pagination?.limit || PAGE_SIZE} total={data?.pagination?.total || 0} onChange={setPage} />}</Card><EnquiryViewModal enquiry={selected} onClose={() => setSelected(null)} /><ConfirmDialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => remove(deleteTarget.id)} loading={deleting} title="Delete enquiry?" message={`“${deleteTarget?.name || ""}” will be deleted permanently.`} confirmText="Delete" /></>;
}
