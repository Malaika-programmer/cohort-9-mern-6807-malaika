import { beforeEach, describe, expect, it } from "vitest";
import { settingsService } from "./settingsService";
import apiClient from "./apiClient";

vi.mock("./apiClient");

describe("settingsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getSettings", () => {
    it("fetches settings configuration from backend", async () => {
      const mockSettings = {
        data: {
          appearance: { theme: "dark" },
          notifications: { emailNotifications: true },
        },
      };
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockSettings);

      const result = await settingsService.getSettings();

      expect(apiClient.get).toHaveBeenCalledWith("/settings");
      expect(result).toEqual(mockSettings);
    });
  });

  describe("saveSection", () => {
    it("sends PUT request to update specified settings section", async () => {
      const section = "appearance";
      const values = { theme: "light" };
      const mockResponse = { data: { message: "Section saved successfully" } };

      vi.mocked(apiClient.put).mockResolvedValueOnce(mockResponse);

      const result = await settingsService.saveSection(section, values);

      expect(apiClient.put).toHaveBeenCalledWith("/settings/appearance", values);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteAccount", () => {
    it("sends DELETE request to settings account endpoint", async () => {
      const mockResponse = { data: { message: "Account deleted" } };
      vi.mocked(apiClient.delete).mockResolvedValueOnce(mockResponse);

      const result = await settingsService.deleteAccount();

      expect(apiClient.delete).toHaveBeenCalledWith("/settings/account");
      expect(result).toEqual(mockResponse);
    });
  });

  describe("exportData", () => {
    it("fetches export data with blob response type", async () => {
      const mockBlob = new Blob(['{"user":"data"}'], {
        type: "application/json",
      });
      const mockResponse = { data: mockBlob };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

      const result = await settingsService.exportData();

      expect(apiClient.get).toHaveBeenCalledWith("/settings/export", {
        responseType: "blob",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});