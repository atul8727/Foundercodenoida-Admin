import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const pgDemoRequestsService = {
  async list({ page = 1, limit = 10 } = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.pgDemoRequests.list, { params: { page, limit } }), "Could not load PG demo requests.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.pgDemoRequests.remove(id)), "Could not delete PG demo request.").message;
  },
};
