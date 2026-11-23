import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import { PageLoader } from "@/components/ui/Spinner";
import { useFetch } from "@/hooks/useFetch";
import { categoriesService } from "../categories.service";

// Shows one category loaded with GET /api/admin/categories/:id. Mount it only while it is open.
export default function CategoryViewModal({ id, onClose }) {
  const { data, loading, error, refetch } = useFetch(() => categoriesService.getById(id), { deps: [id] });

  return (
    <Modal open onClose={onClose} title="Category Details" size="sm" footer={<Button variant="outline" size="sm" onClick={onClose}>Close</Button>}>
      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="muted text-xs font-semibold uppercase tracking-wide">ID</dt>
            <dd className="mt-1 font-medium">{data?.category_id}</dd>
          </div>
          <div>
            <dt className="muted text-xs font-semibold uppercase tracking-wide">Category Name</dt>
            <dd className="mt-1 font-medium">{data?.category_name}</dd>
          </div>
        </dl>
      )}
    </Modal>
  );
}