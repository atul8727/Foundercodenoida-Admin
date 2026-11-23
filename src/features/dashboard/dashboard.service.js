import api from "@/services/apiClient";
import { unwrapResponse } from "@/services/apiResponse";
import { ENDPOINTS } from "@/config/endpoints";

export const dashboardService = {
  async getStats() {
    return unwrapResponse(await api.get(ENDPOINTS.dashboard.stats), "Could not load dashboard statistics.").data || {};
  },
};
