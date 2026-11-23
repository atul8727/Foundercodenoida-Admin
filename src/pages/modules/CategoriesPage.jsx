import { useMemo, useState } from "react";
import { Plus, Tags } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { categoriesService } from "@/features/categories/categories.service";
import { getCategoryColumns } from "@/features/categories/categories.columns";
import CategoryFormModal from "@/features/categories/components/CategoryFormModal";
import CategoryViewModal from "@/features/categories/components/CategoryViewModal";

const PAGE_SIZE = 10;

export default function CategoriesPage() {
  const { data, loading, error, refetch } = useFetch(() => categoriesService.list());
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [viewId, setViewId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { mutate: createCategory, loading: creating } = useMutation(categoriesService.create, {
    successMessage: "Category created successfully",
    onSuccess: () => {
      setShowForm(false);
      refetch();
    },
  });

  const { mutate: removeCategory, loading: deleting } = useMutation(categoriesService.remove, {
    successMessage: "Category deleted successfully",
    onSuccess: () => {
      setDeleteTarget(null);
      refetch();
    },
  });

  // The API returns the full list (no search / paging), so both are done here.
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = data || [];
    return q ? list.filter((c) => c.category_name?.toLowerCase().includes(q) || String(c.category_id).includes(q)) : list;
  }, [data, query]);

  const lastPage = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, lastPage);
  const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = getCategoryColumns({ onView: (c) => setViewId(c.category_id), onDelete: setDeleteTarget });

  return (
    <>
      <PageHeader
        title="Categories"
        description="Blog categories."
        action={<Button icon={Plus} onClick={() => setShowForm(true)}>Add Category</Button>}
      />

      <Card>
        <div className="border-b border-line p-4">
          <SearchInput
            placeholder="Search by name or ID..."
            className="max-w-sm"
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
          />
        </div>

        <Table
          columns={columns}
          data={pageRows}
          rowKey="category_id"
          loading={loading}
          error={error}
          onRetry={refetch}
          emptyIcon={Tags}
          emptyTitle={query ? "No matching categories" : "No categories yet"}
          emptyText={query ? "Try a different search." : "Click “Add Category” to create the first one."}
        />

        {!loading && !error && <Pagination page={currentPage} pageSize={PAGE_SIZE} total={rows.length} onChange={setPage} />}
      </Card>

      {showForm && <CategoryFormModal onClose={() => setShowForm(false)} onSubmit={createCategory} loading={creating} />}
      {viewId !== null && <CategoryViewModal id={viewId} onClose={() => setViewId(null)} />}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
        onConfirm={() => removeCategory(deleteTarget.category_id)}
        loading={deleting}
        title="Delete category?"
        message={`“${deleteTarget?.category_name ?? ""}” will be deleted permanently. This cannot be undone.`}
        confirmText="Delete"
      />
    </>
  );
}