import apiClient from "./apiClient";

export const settingsService = {
  async getSettings() {
    return apiClient.get("/settings");
  },

  async saveSection(section, values) {
    return apiClient.put(`/settings/${section}`, values);
  },

  async deleteAccount() {
    return apiClient.delete("/settings/account");
  },

  async exportData() {
    return apiClient.get("/settings/export", { responseType: "blob" });
  },
};