import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";
import { API_BASE_URL } from "@/config/app";

// Content is intentionally sent as JSON, not HTML-only, so a public renderer can
// reproduce it. The API needs to accept: content_json, content_html and metadata.
export const blogsService = {
  async list(params = {}) {
    const body = unwrapResponse(await api.get(ENDPOINTS.blogs.list, { params }), "Could not load blogs.");
    return { items: Array.isArray(body.data) ? body.data : [], pagination: body.pagination || {} };
  },
  async getById(id) {
    return unwrapResponse(await api.get(ENDPOINTS.blogs.detail(id)), "Could not load this blog.").data;
  },
  async create(payload) {
    return unwrapResponse(await api.post(ENDPOINTS.blogs.create, toFormData(payload)), "Could not create blog.").data;
  },
  async update(id, payload) {
    return unwrapResponse(await api.put(ENDPOINTS.blogs.update(id), toFormData(payload)), "Could not update blog.").data;
  },
  async remove(id) {
    return unwrapResponse(await api.delete(ENDPOINTS.blogs.remove(id)), "Could not delete blog.").message;
  },
};

// The API returns an uploaded image filename; convert it to the public upload URL.
export const blogImageUrl = (image) => {
  if (!image || image instanceof File) return "";
  if (/^(https?:|data:|blob:)/i.test(image)) return image;
  const path = String(image).replace(/^\/+/, "");
  const uploadBase = String(import.meta.env.VITE_BLOG_IMAGE_URL || `${API_BASE_URL}/uploads`).replace(/\/+$/, "");
  return `${uploadBase}/${path.startsWith("uploads/") ? path.slice("uploads/".length) : path}`;
};

function toFormData({ image, ...fields }) {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, String(value));
  });
  if (image instanceof File) form.append("image", image);
  return form;
}
