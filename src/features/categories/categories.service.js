import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

/**
 * GET    /api/admin/categories        -> { success, data: [{ category_id, category_name }] }
 * GET    /api/admin/categories/:id    -> { success, data: { category_id, category_name } }
 * POST   /api/admin/categories        { category_name } -> { success, message, category_id }
 * DELETE /api/admin/categories/:id    -> { success, message }
 * (The API has no update endpoint, no pagination and no search.)
 */
export const categoriesService = {
  async list() {
    const body = unwrapResponse(await api.get(ENDPOINTS.categories.list), "Could not load categories.");
    return Array.isArray(body.data) ? body.data : [];
  },

  async getById(id) {
    const body = unwrapResponse(await api.get(ENDPOINTS.categories.detail(id)), "Could not load this category.");
    return body.data;
  },

  async create({ category_name }) {
    const body = unwrapResponse(
      await api.post(ENDPOINTS.categories.create, { category_name: category_name.trim() }),
      "Could not create the category."
    );
    return { message: body.message, category_id: body.category_id };
  },

  async remove(id) {
    const body = unwrapResponse(await api.delete(ENDPOINTS.categories.remove(id)), "Could not delete the category.");
    return body.message;
  },
};