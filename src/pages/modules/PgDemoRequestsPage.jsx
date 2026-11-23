import { useMemo, useState } from "react";
import { Building2, Eye, MonitorPlay, Phone, Trash2, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { pgDemoRequestsService } from "@/features/pgDemoRequests/pgDemoRequests.service";
import PgDemoRequestViewModal from "@/features/pgDemoRequests/components/PgDemoRequestViewModal";
import { formatDateTime } from "@/utils/formatDate";

const PAGE_SIZE = 10;
export default function PgDemoRequestsPage() {
  const [page, setPage] = useState(1); const [query, setQuery] = useState(""); const [selected, setSelected] = useState(null); const [deleteTarget, setDeleteTarget] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => pgDemoRequestsService.list({ page, limit: PAGE_SIZE }), { deps: [page] });
  const { mutate: remove, loading: deleting } = useMutation(pgDemoRequestsService.remove, { successMessage: "PG demo request deleted successfully", onSuccess: () => { setDeleteTarget(null); refetch(); } });
  const rows = useMemo(() => { const q = query.trim().toLowerCase(); return (data?.items || []).filter((item) => !q || [item.full_name, item.property_name, item.email, item.phone_number, item.special_requests].some((value) => value?.toLowerCase().includes(q))); }, [data, query]);
  const columns = [{ key: "full_name", header: "Guest", render: (row) => <div><p className="font-semibold">{row.full_name}</p><p className="mt-0.5 text-xs text-muted">{row.email}</p></div> }, { key: "property_name", header: "Property", render: (row) => <span className="inline-flex items-center gap-1.5 text-muted"><Building2 size={14} />{row.property_name}</span> }, { key: "phone_number", header: "Phone", render: (row) => <span className="inline-flex items-center gap-1.5 text-muted"><Phone size={14} />{row.phone_number || "—"}</span> }, { key: "number_of_guests", header: "Guests", render: (row) => <span className="inline-flex items-center gap-1.5"><Users size={14} />{row.number_of_guests || "—"}</span> }, { key: "created_at", header: "Received", render: (row) => formatDateTime(row.created_at) }, { key: "actions", header: "", className: "w-24", render: (row) => <div className="flex justify-end gap-1"><button aria-label="View request" onClick={() => setSelected(row)} className="rounded p-2 text-primary hover:bg-primary-soft"><Eye size={16} /></button><button aria-label="Delete request" onClick={() => setDeleteTarget(row)} className="rounded p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button></div> }];
  return <><PageHeader title="PG Demo Requests" description="Requests received for PG property demonstrations." /><Card><div className="border-b border-line p-4"><SearchInput placeholder="Search guest, property, email or phone..." className="max-w-md" onChange={setQuery} /></div><Table columns={columns} data={rows} rowKey="demo_id" loading={loading} error={error} onRetry={refetch} emptyIcon={MonitorPlay} emptyTitle={query ? "No matching requests" : "No PG demo requests yet"} emptyText={query ? "Try a different search." : "New property demo requests will appear here."} />{!loading && !error && <Pagination page={data?.pagination?.page || page} pageSize={data?.pagination?.limit || PAGE_SIZE} total={data?.pagination?.total || 0} onChange={setPage} />}</Card><PgDemoRequestViewModal request={selected} onClose={() => setSelected(null)} /><ConfirmDialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => remove(deleteTarget.demo_id)} loading={deleting} title="Delete PG demo request?" message={`Request from “${deleteTarget?.full_name || ""}” will be removed.`} confirmText="Delete" /></>;
}
