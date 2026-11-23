import { useMemo, useState } from "react";
import { Download, FileText, Mail, Phone, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { useToast } from "@/components/ui/Toast";
import { getErrorMessage } from "@/services/errorHandler";
import { jobRequestsService } from "@/features/jobRequests/jobRequests.service";
import { formatDateTime } from "@/utils/formatDate";

const PAGE_SIZE = 10;
export default function JobRequestsPage() {
  const [page, setPage] = useState(1); const [query, setQuery] = useState(""); const [deleteTarget, setDeleteTarget] = useState(null); const [downloadingId, setDownloadingId] = useState(null); const toast = useToast();
  const { data, loading, error, refetch } = useFetch(() => jobRequestsService.list({ page, limit: PAGE_SIZE }), { deps: [page] });
  const { mutate: remove, loading: deleting } = useMutation(jobRequestsService.remove, { successMessage: "Job request deleted successfully", onSuccess: () => { setDeleteTarget(null); refetch(); } });
  const rows = useMemo(() => { const q = query.trim().toLowerCase(); return (data?.items || []).filter((item) => !q || [item.full_name, item.email, item.phone].some((value) => value?.toLowerCase().includes(q))); }, [data, query]);
  const download = async (row) => { setDownloadingId(row.job_request_id); try { await jobRequestsService.downloadResume(row.job_request_id, row.resume || `${row.full_name}-resume`); toast.success("Resume download started"); } catch (err) { toast.error(getErrorMessage(err)); } finally { setDownloadingId(null); } };
  const columns = [
    { key: "full_name", header: "Applicant", render: (row) => <div><p className="font-semibold">{row.full_name}</p><p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted"><Mail size={12} />{row.email}</p></div> },
    { key: "phone", header: "Phone", render: (row) => <span className="inline-flex items-center gap-1.5 text-muted"><Phone size={14} />{row.phone || "—"}</span> },
    { key: "resume", header: "Resume", render: (row) => row.resume ? <button onClick={() => download(row)} disabled={downloadingId === row.job_request_id} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline disabled:opacity-50"><Download size={15} />{downloadingId === row.job_request_id ? "Downloading..." : "Download"}</button> : "—" },
    { key: "created_at", header: "Received", render: (row) => formatDateTime(row.created_at) },
    { key: "actions", header: "", className: "w-16", render: (row) => <button aria-label="Delete job request" onClick={() => setDeleteTarget(row)} className="rounded p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button> },
  ];
  return <><PageHeader title="Job Requests" description="Applications submitted through your careers page." /><Card><div className="border-b border-line p-4"><SearchInput placeholder="Search applicant, email or phone..." className="max-w-md" onChange={setQuery} /></div><Table columns={columns} data={rows} rowKey="job_request_id" loading={loading} error={error} onRetry={refetch} emptyIcon={FileText} emptyTitle={query ? "No matching job requests" : "No job requests yet"} emptyText={query ? "Try a different search." : "New career applications will appear here."} />{!loading && !error && <Pagination page={data?.pagination?.page || page} pageSize={data?.pagination?.limit || PAGE_SIZE} total={data?.pagination?.total || 0} onChange={setPage} />}</Card><ConfirmDialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => remove(deleteTarget.job_request_id)} loading={deleting} title="Delete job request?" message={`Application from “${deleteTarget?.full_name || ""}” will be deleted permanently.`} confirmText="Delete" /></>;
}
