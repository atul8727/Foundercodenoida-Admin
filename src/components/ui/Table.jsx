import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import { Skeleton } from "./Spinner";

/**
 * Reusable data table with loading, error and empty states built in.
 * columns: [{ key: "name", header: "Name", render: (row) => <b>{row.name}</b>, className: "w-40" }]
 * Wide tables scroll sideways on small screens.
 */
export default function Table({
  columns,
  data = [],
  loading = false,
  error = null,
  onRetry,
  rowKey = "id",
  emptyTitle = "No records found",
  emptyText = "Try changing the search or filters.",
  emptyIcon,
  emptyAction,
  onRowClick,
}) {
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  return (
    <div className="no-scrollbar overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-surface-2">
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted ${c.className || ""}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-4">
                      <Skeleton className="h-4 w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, idx) => (
                <tr
                  key={row[rowKey] ?? idx}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`transition-colors hover:bg-surface-2/60 ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {columns.map((c) => (
                    <td key={c.key} className={`px-4 py-3.5 align-middle ${c.className || ""}`}>
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      {!loading && data.length === 0 && <EmptyState icon={emptyIcon} title={emptyTitle} text={emptyText} action={emptyAction} />}
    </div>
  );
}
