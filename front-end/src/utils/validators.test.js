import { describe, expect, it } from "vitest";
import {
  validateRequiredFields,
  validateEmail,
  validatePassword,
  validateSettingsForm,
} from "./settingsValidation";

describe("validators utility", () => {
  describe("validateRequiredFields", () => {
    it("returns no errors when all required fields have values", () => {
      const values = { name: "Alice", title: "Engineer" };
      const fields = [
        { name: "name", message: "Name is required" },
        { name: "title", message: "Title is required" },
      ];

      const errors = validateRequiredFields(values, fields);

      expect(errors).toEqual({});
    });

    it("returns error messages for empty, null, undefined, or whitespace-only fields", () => {
      const values = {
        name: "  ",
        email: "",
        role: null,
      };
      const fields = [
        { name: "name", message: "Name is required" },
        { name: "email", message: "Email is required" },
        { name: "role", message: "Role is required" },
        { name: "missingField", message: "Missing field is required" },
      ];

      const errors = validateRequiredFields(values, fields);

      expect(errors).toEqual({
        name: "Name is required",
        email: "Email is required",
        role: "Role is required",
        missingField: "Missing field is required",
      });
    });
  });

  describe("validateEmail", () => {
    it("returns empty string when email value is empty or omitted", () => {
      expect(validateEmail("", "Invalid email")).toBe("");
      expect(validateEmail(null, "Invalid email")).toBe("");
      expect(validateEmail(undefined, "Invalid email")).toBe("");
    });

    it("returns custom error message for invalid email formats", () => {
      const message = "Please enter a valid email address.";

      expect(validateEmail("plainaddress", message)).toBe(message);
      expect(validateEmail("@missinguser.com", message)).toBe(message);
      expect(validateEmail("user@domain", message)).toBe(message);
      expect(validateEmail("user@.com", message)).toBe(message);
      expect(validateEmail("user @domain.com", message)).toBe(message);
    });

    it("returns empty string for valid email addresses", () => {
      expect(validateEmail("user@example.com", "Invalid email")).toBe("");
      expect(validateEmail("john.doe@company.co.uk", "Invalid email")).toBe("");
    });
  });

  describe("validatePassword", () => {
    it("returns empty string when password is empty or omitted", () => {
      expect(validatePassword("")).toBe("");
      expect(validatePassword(null)).toBe("");
      expect(validatePassword(undefined)).toBe("");
    });

    it("returns error message when password length is less than 8 characters", () => {
      expect(validatePassword("short1")).toBe(
        "Password must be at least 8 characters."
      );
    });

    it("returns error message when password length exceeds 16 characters", () => {
      expect(validatePassword("thisPasswordIsWayTooLong123")).toBe(
        "Password must not exceed 16 characters."
      );
    });

    it("returns empty string when password length is between 8 and 16 characters", () => {
      expect(validatePassword("8CharsOk")).toBe("");
      expect(validatePassword("SixteenCharPass!")).toBe("");
    });
  });

  describe("validateSettingsForm", () => {
    it("validates required, email, and password fields comprehensively", () => {
      const values = {
        username: "",
        email: "invalid-email",
        password: "123",
      };

      const rules = {
        required: [{ name: "username", message: "Username is required." }],
        email: [{ name: "email", message: "Invalid email format." }],
        password: [{ name: "password" }],
      };

      const errors = validateSettingsForm(values, rules);

      expect(errors).toEqual({
        username: "Username is required.",
        email: "Invalid email format.",
        password: "Password must be at least 8 characters.",
      });
    });

    it("returns empty object when all form rules pass", () => {
      const values = {
        username: "john_doe",
        email: "john@example.com",
        password: "validPassword123",
      };

      const rules = {
        required: [{ name: "username", message: "Username is required." }],
        email: [{ name: "email", message: "Invalid email format." }],
        password: [{ name: "password" }],
      };

      const errors = validateSettingsForm(values, rules);

      expect(errors).toEqual({});
    });

    it("handles missing or empty rule definitions gracefully", () => {
      const values = { username: "john" };
      const errors = validateSettingsForm(values, {});

      expect(errors).toEqual({});
    });
  });
});