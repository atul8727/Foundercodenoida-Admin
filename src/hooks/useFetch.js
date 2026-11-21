import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "@/services/errorHandler";

// Async/await data loader used by every list screen.
//   const { data, loading, error, refetch } = useFetch(() => xService.list(params), { deps: [params] });
//
// Stale-response safe: if filters / page change quickly, only the LATEST request updates state.
export function useFetch(fetcher, { enabled = true, deps = [] } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const run = useCallback(async () => {
    if (!enabled) return;
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (id === requestId.current) setData(result);
    } catch (err) {
      if (id === requestId.current) setError(getErrorMessage(err));
    } finally {
      if (id === requestId.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  useEffect(() => {
    run();
    return () => {
      requestId.current++; // ignore in-flight request on dependency change / unmount
    };
  }, [run]);

  return { data, loading, error, refetch: run };
}
