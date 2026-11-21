import { useMemo, useState } from "react";

// Client-side paging helper. For server paging, keep `page` in state and send it to the API instead.
export function usePagination(items = [], initialSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialSize);
  const pageItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize]);
  return { page, setPage, pageSize, setPageSize, pageItems, total: items.length };
}
