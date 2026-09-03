import { beforeEach, describe, expect, it } from "vitest";
import profileService from "./profileService";
import { getToken, getUser, setAuthData } from "../utils/auth";

vi.mock("../utils/auth");

describe("profileService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  const createFetchResponse = (data, ok = true, status = 200) =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(data),
    });

  describe("getProfile", () => {
    it("fetches user profile and updates auth storage when data is returned", async () => {
      vi.mocked(getToken).mockReturnValue("auth-token-123");
      vi.mocked(getUser).mockReturnValue({ id: "1", role: "admin", fullName: "Old Name" });

      const mockResponse = {
        data: {
          fullName: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://example.com/avatar.jpg",
        },
      };

      global.fetch.mockImplementation(() =>
        createFetchResponse(mockResponse, true, 200)
      );

      const result = await profileService.getProfile();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile"),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer auth-token-123",
            "Content-Type": "application/json",
          }),
        })
      );

      expect(setAuthData).toHaveBeenCalledWith({
        user: {
          id: "1",
          role: "admin",
          fullName: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://example.com/avatar.jpg",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("does not update auth data if response data object is omitted", async () => {
      vi.mocked(getToken).mockReturnValue("auth-token-123");
      global.fetch.mockImplementation(() =>
        createFetchResponse({}, true, 200)
      );

      await profileService.getProfile();

      expect(setAuthData).not.toHaveBeenCalled();
    });
  });

  describe("updateProfile", () => {
    it("sends PUT request with profile payload and updates cached user data", async () => {
      vi.mocked(getToken).mockReturnValue("auth-token-123");
      vi.mocked(getUser).mockReturnValue({ id: "1", avatar: "avatar.jpg" });

      const profilePayload = {
        fullName: "Alex Smith",
        email: "alex@example.com",
      };

      const mockResponse = {
        data: {
          fullName: "Alex Smith",
          email: "alex@example.com",
        },
      };

      global.fetch.mockImplementation(() =>
        createFetchResponse(mockResponse, true, 200)
      );

      const result = await profileService.updateProfile(profilePayload);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(profilePayload),
        })
      );

      expect(setAuthData).toHaveBeenCalledWith({
        user: {
          id: "1",
          avatar: "avatar.jpg",
          fullName: "Alex Smith",
          email: "alex@example.com",
        },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateSkills", () => {
    it("sends updated skills list to backend", async () => {
      const skills = ["JavaScript", "React", "Node.js"];
      global.fetch.mockImplementation(() =>
        createFetchResponse({ success: true }, true, 200)
      );

      await profileService.updateSkills(skills);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile/skills"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ skills }),
        })
      );
    });
  });

  describe("updateSocialLinks", () => {
    it("sends social links object to backend", async () => {
      const socialLinks = { github: "https://github.com/user" };
      global.fetch.mockImplementation(() =>
        createFetchResponse({ success: true }, true, 200)
      );

      await profileService.updateSocialLinks(socialLinks);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile/social-links"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ socialLinks }),
        })
      );
    });
  });

  describe("updateAvatar", () => {
    it("sends avatar URL/base64 to backend", async () => {
      const avatar = "https://example.com/new-avatar.png";
      global.fetch.mockImplementation(() =>
        createFetchResponse({ success: true }, true, 200)
      );

      await profileService.updateAvatar(avatar);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile/avatar"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ avatar }),
        })
      );
    });
  });

  describe("changePassword", () => {
    it("sends current and new password values to backend", async () => {
      const passwordValues = {
        oldPassword: "secretOld123",
        newPassword: "secretNew123",
      };

      global.fetch.mockImplementation(() =>
        createFetchResponse({ message: "Password updated successfully" }, true, 200)
      );

      await profileService.changePassword(passwordValues);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile/password"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(passwordValues),
        })
      );
    });
  });

  describe("deleteAccount", () => {
    it("sends DELETE request to profile endpoint", async () => {
      global.fetch.mockImplementation(() =>
        createFetchResponse({ success: true }, true, 200)
      );

      await profileService.deleteAccount();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/profile"),
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });
  });

  describe("error handling", () => {
    it("throws structured error when backend returns non-ok status", async () => {
      const errorData = { message: "Unauthorized access" };
      global.fetch.mockImplementation(() =>
        createFetchResponse(errorData, false, 401)
      );

      await expect(profileService.getProfile()).rejects.toMatchObject({
        message: "Unauthorized access",
        status: 401,
        data: errorData,
      });
    });

    it("falls back to default error message if error payload is empty", async () => {
      global.fetch.mockImplementation(() =>
        createFetchResponse({}, false, 500)
      );

      await expect(profileService.getProfile()).rejects.toThrow("Something went wrong.");
    });
  });
});