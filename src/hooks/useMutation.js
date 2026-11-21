import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { getErrorMessage } from "@/services/errorHandler";

// Async/await action (create / update / delete) with toast messages.
//   const { mutate, loading } = useMutation(xService.remove, { successMessage: "Deleted", onSuccess: refetch });
export function useMutation(action, { successMessage, onSuccess, onError } = {}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const mutate = async (...args) => {
    setLoading(true);
    try {
      const result = await action(...args);
      if (successMessage) toast.success(successMessage);
      onSuccess?.(result);
      return result;
    } catch (err) {
      toast.error(getErrorMessage(err));
      onError?.(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
}
