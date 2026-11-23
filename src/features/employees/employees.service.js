import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const employeesService = {
  async list({ page = 1, limit = 12 } = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.employees.list, { params: { page, limit } }), "Could not load employees.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async create({ name, profile, image }) {
    const form = new FormData();
    form.append("name", name.trim());
    form.append("profile", profile.trim());
    form.append("image", image);
    return unwrapResponse(await api.post(ENDPOINTS.employees.create, form), "Could not add employee.").data;
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.employees.remove(id)), "Could not delete employee.").message;
  },
};
