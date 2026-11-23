import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const jobRequestsService = {
  async list({ page = 1, limit = 10 } = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.jobRequests.list, { params: { page, limit } }), "Could not load job requests.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async downloadResume(id, fallbackName = "resume") {
    const response = await api.get(ENDPOINTS.jobRequests.resume(id), { responseType: "blob" });
    const header = response.headers["content-disposition"] || "";
    const filename = header.match(/filename\*?=(?:UTF-8''|\")?([^\";]+)/i)?.[1] || fallbackName;
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a"); link.href = url; link.download = decodeURIComponent(filename); document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.jobRequests.remove(id)), "Could not delete job request.").message;
  },
};
