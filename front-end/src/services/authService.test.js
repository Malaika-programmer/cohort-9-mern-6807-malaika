import { beforeEach, describe, expect, it } from "vitest";
import authService from "./authService";
import { clearAuthData, setAuthData } from "../utils/auth";

vi.mock("../utils/auth");

describe("authService", () => {
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

  describe("register", () => {
    it("sends registration payload to backend and returns response data", async () => {
      const mockUserData = {
        email: "user@example.com",
        password: "password123",
      };
      const mockResponse = {
        message: "User registered successfully.",
      };

      global.fetch.mockImplementation(() =>
        createFetchResponse(mockResponse, true, 201)
      );

      const result = await authService.register(mockUserData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/auth/register"),
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockUserData),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("login", () => {
    it("stores token and user when response contains unnested auth data", async () => {
      const credentials = {
        email: "user@example.com",
        password: "password123",
      };
      const mockResponse = {
        token: "jwt-token-123",
        user: { id: "1", email: "user@example.com" },
      };

      global.fetch.mockImplementation(() =>
        createFetchResponse(mockResponse, true, 200)
      );

      const result = await authService.login(credentials);

      expect(setAuthData).toHaveBeenCalledWith({
        token: "jwt-token-123",
        user: { id: "1", email: "user@example.com" },
      });
      expect(result).toEqual(mockResponse);
    });

    it("stores token and user when response contains nested auth data inside data property", async () => {
      const credentials = {
        email: "user@example.com",
        password: "password123",
      };
      const mockResponse = {
        data: {
          token: "jwt-token-nested",
          user: { id: "2", email: "nested@example.com" },
        },
      };

      global.fetch.mockImplementation(() =>
        createFetchResponse(mockResponse, true, 200)
      );

      await authService.login(credentials);

      expect(setAuthData).toHaveBeenCalledWith({
        token: "jwt-token-nested",
        user: { id: "2", email: "nested@example.com" },
      });
    });

    it("does not call setAuthData if token is missing from response", async () => {
      const credentials = {
        email: "user@example.com",
        password: "password123",
      };
      const mockResponse = { message: "Login successful without token" };

      global.fetch.mockImplementation(() =>
        createFetchResponse(mockResponse, true, 200)
      );

      await authService.login(credentials);

      expect(setAuthData).not.toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("clears local authentication data", () => {
      authService.logout();

      expect(clearAuthData).toHaveBeenCalledTimes(1);
    });
  });

  describe("error handling", () => {
    it("throws structured error with response status and custom backend message", async () => {
      const errorData = { message: "Invalid credentials provided." };

      global.fetch.mockImplementation(() =>
        createFetchResponse(errorData, false, 401)
      );

      await expect(
        authService.login({ email: "wrong@example.com", password: "bad" })
      ).rejects.toMatchObject({
        message: "Invalid credentials provided.",
        status: 401,
        data: errorData,
      });
    });

    it("falls back to default error message when response message is missing", async () => {
      global.fetch.mockImplementation(() =>
        createFetchResponse({}, false, 500)
      );

      await expect(
        authService.register({ email: "test@example.com" })
      ).rejects.toThrow("Something went wrong.");
    });
  });
});