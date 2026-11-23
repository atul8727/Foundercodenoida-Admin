import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const careerJobsService = {
  async list({ page = 1, limit = 10 } = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.careerJobs.list, { params: { page, limit } }), "Could not load career jobs.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async create(payload) {
    return unwrapResponse(await api.post(ENDPOINTS.careerJobs.create, payload), "Could not create job.").data;
  },
  async update(id, payload) {
    return unwrapResponse(await api.put(ENDPOINTS.careerJobs.update(id), payload), "Could not update job.").data;
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.careerJobs.remove(id)), "Could not delete job.").message;
  },
};
