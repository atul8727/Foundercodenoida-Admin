import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const enquiriesService = {
  async list({ page = 1, limit = 10 } = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.enquiries.list, { params: { page, limit } }), "Could not load enquiries.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.enquiries.remove(id)), "Could not delete enquiry.").message;
  },
};
