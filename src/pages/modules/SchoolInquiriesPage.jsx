import { useMemo, useState } from "react";
import { GraduationCap, Mail, Phone, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { schoolInquiriesService } from "@/features/schoolInquiries/schoolInquiries.service";
import { formatDateTime } from "@/utils/formatDate";

const PAGE_SIZE = 10;
export default function SchoolInquiriesPage() {
  const [page, setPage] = useState(1); const [query, setQuery] = useState(""); const [deleteTarget, setDeleteTarget] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => schoolInquiriesService.list({ page, limit: PAGE_SIZE }), { deps: [page] });
  const { mutate: remove, loading: deleting } = useMutation(schoolInquiriesService.remove, { successMessage: "School inquiry deleted successfully", onSuccess: () => { setDeleteTarget(null); refetch(); } });
  const rows = useMemo(() => { const q = query.trim().toLowerCase(); return (data?.items || []).filter((item) => !q || [item.name, item.email, item.phone].some((value) => value?.toLowerCase().includes(q))); }, [data, query]);
  const columns = [
    { key: "name", header: "Name", render: (row) => <p className="font-semibold">{row.name}</p> },
    { key: "email", header: "Email", render: (row) => <span className="inline-flex items-center gap-1.5 text-muted"><Mail size={14} />{row.email}</span> },
    { key: "phone", header: "Phone", render: (row) => <span className="inline-flex items-center gap-1.5 text-muted"><Phone size={14} />{row.phone || "—"}</span> },
    { key: "created_at", header: "Received", render: (row) => formatDateTime(row.created_at) },
    { key: "actions", header: "", className: "w-16", render: (row) => <button aria-label="Delete school inquiry" onClick={() => setDeleteTarget(row)} className="rounded p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button> },
  ];
  return <><PageHeader title="School Inquiries" description="Contact requests received from schools." /><Card><div className="border-b border-line p-4"><SearchInput placeholder="Search name, email or phone..." className="max-w-sm" onChange={setQuery} /></div><Table columns={columns} data={rows} rowKey="id" loading={loading} error={error} onRetry={refetch} emptyIcon={GraduationCap} emptyTitle={query ? "No matching school inquiries" : "No school inquiries yet"} emptyText={query ? "Try a different search." : "New school inquiries will appear here."} />{!loading && !error && <Pagination page={data?.pagination?.page || page} pageSize={data?.pagination?.limit || PAGE_SIZE} total={data?.pagination?.total || 0} onChange={setPage} />}</Card><ConfirmDialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => remove(deleteTarget.id)} loading={deleting} title="Delete school inquiry?" message={`Inquiry from “${deleteTarget?.name || ""}” will be deleted permanently.`} confirmText="Delete" /></>;
}
