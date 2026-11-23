import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const schoolInquiriesService = {
  async list({ page = 1, limit = 10 } = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.schoolInquiries.list, { params: { page, limit } }), "Could not load school inquiries.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.schoolInquiries.remove(id)), "Could not delete school inquiry.").message;
  },
};
