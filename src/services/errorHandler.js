// Turns any error (axios or plain Error) into one readable message.
export const getErrorMessage = (err) => {
  const data = err?.response?.data;

  if (data?.message) return data.message;

  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors
      .map((e) => (typeof e === "string" ? e : e?.message || e?.msg || ""))
      .filter(Boolean)
      .join(", ");
  }

  if (err?.code === "ECONNABORTED") return "Request timed out. Please try again.";
  if (err?.message === "Network Error") return "Cannot reach the server. Please check your internet connection.";

  return err?.message || "Something went wrong. Please try again.";
};
