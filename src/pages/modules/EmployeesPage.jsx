import { useMemo, useState } from "react";
import { ImageOff, Plus, Search, Trash2, UsersRound } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Spinner";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { employeesService } from "@/features/employees/employees.service";
import EmployeeFormModal from "@/features/employees/components/EmployeeFormModal";
import { blogImageUrl } from "@/features/blogs/blogs.service";

const PAGE_SIZE = 12;
export default function EmployeesPage() {
  const [page, setPage] = useState(1); const [query, setQuery] = useState(""); const [showForm, setShowForm] = useState(false); const [deleteTarget, setDeleteTarget] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => employeesService.list({ page, limit: PAGE_SIZE }), { deps: [page] });
  const { mutate: create, loading: creating } = useMutation(employeesService.create, { successMessage: "Employee added successfully", onSuccess: () => { setShowForm(false); refetch(); } });
  const { mutate: remove, loading: deleting } = useMutation(employeesService.remove, { successMessage: "Employee deleted successfully", onSuccess: () => { setDeleteTarget(null); refetch(); } });
  const employees = useMemo(() => { const q = query.trim().toLowerCase(); return (data?.items || []).filter((employee) => !q || employee.name?.toLowerCase().includes(q) || employee.profile?.toLowerCase().includes(q)); }, [data, query]);
  return <><PageHeader title="Employees" description="Showcase the people behind your organization." action={<Button icon={Plus} onClick={() => setShowForm(true)}>Add employee</Button>} />
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center"><SearchInput placeholder="Search name or profile..." className="max-w-sm" onChange={setQuery} /><p className="text-sm text-muted sm:ml-auto">{data?.pagination?.total || 0} team members</p></div>
    {error ? <Card><ErrorState message={error} onRetry={refetch} /></Card> : loading ? <EmployeeSkeletons /> : employees.length === 0 ? <Card><EmptyState icon={UsersRound} title={query ? "No matching employees" : "No employees yet"} text={query ? "Try a different search." : "Add your first team member."} action={!query && <Button size="sm" icon={Plus} onClick={() => setShowForm(true)}>Add employee</Button>} /></Card> : <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">{employees.map((employee) => <EmployeeCard key={employee.id} employee={employee} onDelete={() => setDeleteTarget(employee)} />)}</div>}
    {!loading && !error && <div className="mt-5"><Card><Pagination page={data?.pagination?.page || page} pageSize={data?.pagination?.limit || PAGE_SIZE} total={data?.pagination?.total || 0} onChange={setPage} /></Card></div>}
    {showForm && <EmployeeFormModal onClose={() => setShowForm(false)} onSubmit={create} loading={creating} />}
    <ConfirmDialog open={!!deleteTarget} onClose={() => !deleting && setDeleteTarget(null)} onConfirm={() => remove(deleteTarget.id)} loading={deleting} title="Delete employee?" message={`“${deleteTarget?.name || ""}” will be deleted permanently.`} confirmText="Delete" />
  </>;
}

function EmployeeCard({ employee, onDelete }) {
  const [failed, setFailed] = useState(false); const image = blogImageUrl(employee.image);
  return <article className="group relative min-w-0 overflow-hidden rounded-xl border border-line bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"><div className="aspect-[4/3] overflow-hidden bg-surface-2">{image && !failed ? <img src={image} alt={employee.name} onError={() => setFailed(true)} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-muted"><ImageOff size={25} /></div>}</div><div className="p-3"><p className="truncate text-sm font-bold">{employee.name}</p><p className="mt-0.5 truncate text-xs text-muted">{employee.profile}</p></div><button onClick={onDelete} aria-label={`Delete ${employee.name}`} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md bg-surface/90 text-danger opacity-0 shadow-sm transition hover:bg-danger hover:text-on-solid focus:opacity-100 group-hover:opacity-100"><Trash2 size={15} /></button></article>;
}

function EmployeeSkeletons() { return <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">{Array.from({ length: PAGE_SIZE }).map((_, index) => <Card key={index} className="p-0"><Skeleton className="aspect-[4/3] w-full rounded-none" /><div className="space-y-2 p-3"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></Card>)}</div>; }
