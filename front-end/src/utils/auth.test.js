import { beforeEach, describe, expect, it } from "vitest";
import auth, {
  getToken,
  getUser,
  setAuthData,
  isAuthenticated,
  clearAuthData,
  logout,
} from "./auth";

describe("auth utility", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("getToken", () => {
    it("returns token stored in localStorage", () => {
      localStorage.setItem("token", "mock-token-123");

      expect(getToken()).toBe("mock-token-123");
    });

    it("returns null if no token is in localStorage", () => {
      expect(getToken()).toBeNull();
    });
  });

  describe("getUser", () => {
    it("returns parsed user object when valid JSON exists in localStorage", () => {
      const mockUser = { id: "1", name: "John Doe", email: "john@example.com" };
      localStorage.setItem("user", JSON.stringify(mockUser));

      expect(getUser()).toEqual(mockUser);
    });

    it("returns null when no user exists in localStorage", () => {
      expect(getUser()).toBeNull();
    });

    it("returns null when user value in localStorage is invalid JSON", () => {
      localStorage.setItem("user", "{invalid-json-str");

      expect(getUser()).toBeNull();
    });
  });

  describe("setAuthData", () => {
    it("stores token and stringified user in localStorage when both are provided", () => {
      const mockUser = { id: "1", name: "Jane Doe" };

      setAuthData({ token: "new-token-456", user: mockUser });

      expect(localStorage.getItem("token")).toBe("new-token-456");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
    });

    it("stores token only if user property is omitted", () => {
      setAuthData({ token: "token-only" });

      expect(localStorage.getItem("token")).toBe("token-only");
      expect(localStorage.getItem("user")).toBeNull();
    });

    it("stores user only if token property is omitted", () => {
      const mockUser = { id: "2" };

      setAuthData({ user: mockUser });

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
    });
  });

  describe("isAuthenticated", () => {
    it("returns true when token exists in localStorage", () => {
      localStorage.setItem("token", "valid-jwt-token");

      expect(isAuthenticated()).toBe(true);
    });

    it("returns false when no token exists in localStorage", () => {
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe("clearAuthData", () => {
    it("removes token and user keys from localStorage", () => {
      localStorage.setItem("token", "token-to-clear");
      localStorage.setItem("user", JSON.stringify({ id: "1" }));

      clearAuthData();

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("logout", () => {
    it("clears auth data from localStorage when invoked", () => {
      localStorage.setItem("token", "token-to-clear");
      localStorage.setItem("user", JSON.stringify({ id: "1" }));

      logout();

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("default export", () => {
    it("exports all auth functions correctly", () => {
      expect(auth.getToken).toBe(getToken);
      expect(auth.getUser).toBe(getUser);
      expect(auth.setAuthData).toBe(setAuthData);
      expect(auth.isAuthenticated).toBe(isAuthenticated);
      expect(auth.clearAuthData).toBe(clearAuthData);
      expect(auth.logout).toBe(logout);
    });
  });
});