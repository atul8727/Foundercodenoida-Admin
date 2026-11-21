import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "./IconButton";

// Works with server paging: pass page, pageSize and total from the API response.
export default function Pagination({ page, pageSize, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (!total) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm">
      <p className="muted">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <IconButton icon={ChevronLeft} label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)} />
        {nums.map((n) => (
          <button key={n} type="button" onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined}
            className={`h-9 min-w-9 rounded-md px-2 font-medium ${n === page ? "bg-primary text-on-solid" : "text-ink hover:bg-surface-2"}`}>
            {n}
          </button>
        ))}
        <IconButton icon={ChevronRight} label="Next page" disabled={page >= pages} onClick={() => onChange(page + 1)} />
      </div>
    </div>
  );
}
