// Checks an API response body and returns it. Used by every module service.
// The backend answers { success: true/false, message, ... }.
export const unwrapResponse = (res, fallbackMessage = "Request failed. Please try again.") => {
  const body = res?.data;
  if (typeof body === "string") {
    throw new Error("API URL looks wrong: the server returned a web page, not JSON. Check VITE_API_URL.");
  }
  if (!body || body.success === false) throw new Error(body?.message || fallbackMessage);
  return body;
};