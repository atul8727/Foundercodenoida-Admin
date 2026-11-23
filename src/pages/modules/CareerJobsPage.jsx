import { useMemo, useState } from "react";
import { BriefcaseBusiness, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { careerJobsService } from "@/features/careerJobs/careerJobs.service";
import CareerJobFormModal from "@/features/careerJobs/components/CareerJobFormModal";
import { formatDate } from "@/utils/formatDate";

const PAGE_SIZE = 10;
export default function CareerJobsPage() {
  const [page, setPage] = useState(1); const [query, setQuery] = useState(""); const [formJob, setFormJob] = useState(null); const [deleteTarget, setDeleteTarget] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => careerJobsService.list({ page, limit: PAGE_SIZE }), { deps: [page] });
  const { mutate: create, loading: creating } = useMutation(careerJobsService.create, { successMessage: "Job created successfully", onSuccess: () => { setFormJob(null); refetch(); } });
  const { mutate: update, loading: updating } = useMutation((payload) => careerJobsService.update(formJob.id, payload), { successMessage: "Job updated successfully", onSuccess: () => { setFormJob(null); refetch(); } });
  const { mutate: remove, loading: deleting } = useMutation(careerJobsService.remove, { successMessage: "Job deleted successfully", onSuccess: () => { setDeleteTarget(null); refetch(); } });
  const jobs = useMemo(() => (data?.items || []).filter((job) => { const q = query.trim().toLowerCase(); return !q || [job.job_title, job.location, job.job_type].some((value) => value?.toLowerCase().includes(q)); }), [data, query]);
  const columns = [
    { key: "job_title", header: "Job", render: (job) => <div><p className="font-semibold">{job.job_title}</p><p className="mt-0.5 line-clamp-1 max-w-md text-xs text-muted">{job.job_description}</p></div> },
    { key: "location", header: "Location", render: (job) => <span className="inline-flex items-center gap-1.5 text-muted"><MapPin size={14} />{job.location}</span> },
    { key: "job_type", header: "Type" }, { key: "created_at", header: "Created", render: (job) => formatDate(job.created_at) },
    { key: "actions", header: "", className: "w-24", render: (job) => <div className="flex justify-end gap-1"><button aria-label="Edit job" onClick={() => setFormJob(job)} className="rounded p-2 text-primary hover:bg-primary-soft"><Pencil size={16} /></button><button aria-label="Delete job" onClick={() => setDeleteTarget(job)} className="rounded p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button></div> },
  ];
  return <><PageHeader title="Career Jobs" description="Create and manage job openings." action={<Button icon={Plus} onClick={() => setFormJob({})}>Create job</Button>} />
    <Card><div className="border-b border-line p-4"><SearchInput placeholder="Search jobs, locations or type..." className="max-w-sm" onChange={setQuery} /></div><Table columns={columns} data={jobs} rowKey="id" loading={loading} error={error} onRetry={refetch} emptyIcon={BriefcaseBusiness} emptyTitle="No career jobs yet" emptyText="Create a job opening to publish it on your website." emptyAction={<Button size="sm" icon={Plus} onClick={() => setFormJob({})}>Create job</Button>} />{!loading && !error && <Pagination page={data?.pagination?.page || page} pageSize={data?.pagination?.limit || PAGE_SIZE} total={data?.pagination?.total || 0} onChange={setPage} />}</Card>
    {formJob && <CareerJobFormModal job={formJob.id ? formJob : null} onClose={() => setFormJob(null)} onSubmit={formJob.id ? update : create} loading={creating || updating} />}
    <ConfirmDialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => remove(deleteTarget.id)} loading={deleting} title="Delete career job?" message={`“${deleteTarget?.job_title || ""}” will be deleted permanently.`} confirmText="Delete" />
  </>;
}
