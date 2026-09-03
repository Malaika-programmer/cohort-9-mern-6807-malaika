import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Signup from "./Signup";

if (typeof window !== "undefined") {
  const originalGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (element, pseudoElement) => {
    try {
      return originalGetComputedStyle(element, pseudoElement);
    } catch {
      return {
        getPropertyValue: () => "",
      };
    }
  };
}

const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  User: () => <div data-testid="user-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  Eye: ({ onClick }) => <button type="button" data-testid="eye-icon" onClick={onClick}>Show</button>,
  EyeOff: ({ onClick }) => <button type="button" data-testid="eye-off-icon" onClick={onClick}>Hide</button>,
  ShieldCheck: () => <div data-testid="shield-icon" />,
}));

// Mock UI components matching Signup.jsx imports "../../components/ui"
vi.mock("../../components/ui", () => ({
  Button: ({ children, type = "button", disabled, loading, onClick }) => (
    <button type={type} disabled={disabled || loading} onClick={onClick}>
      {loading ? "Loading..." : children}
    </button>
  ),
  Input: ({
    label,
    name,
    type = "text",
    value = "",
    placeholder,
    onChange,
    disabled,
    required,
    rightIcon,
  }) => (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {rightIcon}
    </div>
  ),
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  SectionHeading: ({ title, description, eyebrow }) => (
    <div>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
  IconBox: ({ children }) => <div>{children}</div>,
}));

describe("Signup Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderSignup = () => {
    return render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
  };

  // Helper to submit form directly bypassing browser HTML5 form validation
  const submitForm = (container) => {
    fireEvent.submit(container.querySelector("form"));
  };

  // =========================================================
  // 1. RENDERING
  // =========================================================

  it("renders form controls, terms agreement, and login links", () => {
    const { container } = renderSignup();

    expect(screen.getByText("Join MindPlanAI")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your full name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email address")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Create a strong password")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Confirm your password")
    ).toBeInTheDocument();

    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /terms & conditions/i })
    ).toHaveAttribute("href", "/terms");

    expect(
      screen.getByRole("link", { name: /privacy policy/i })
    ).toHaveAttribute("href", "/privacy-policy");

    expect(screen.getByRole("link", { name: /log in/i })).toHaveAttribute(
      "href",
      "/login"
    );
  });

  // =========================================================
  // 2. PASSWORD CONFIRMATION VALIDATION
  // =========================================================

  it("displays client validation error when passwords do not match", async () => {
    const { container } = renderSignup();

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { name: "fullName", value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { name: "email", value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Create a strong password"), {
      target: { name: "password", value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { name: "confirmPassword", value: "different123" },
    });

    submitForm(container);

    expect(
      await screen.findByText("Passwords do not match.")
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // =========================================================
  // 3. CLEAR ERROR WHEN INPUT CHANGES
  // =========================================================

  it("clears form error state when the user modifies an input field", async () => {
    const { container } = renderSignup();

    const passwordInput = screen.getByPlaceholderText("Create a strong password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm your password");

    fireEvent.change(passwordInput, {
      target: { name: "password", value: "pass1" },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { name: "confirmPassword", value: "pass2" },
    });

    submitForm(container);

    expect(
      await screen.findByText("Passwords do not match.")
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, {
      target: { name: "password", value: "pass2" },
    });

    expect(
      screen.queryByText("Passwords do not match.")
    ).not.toBeInTheDocument();
  });

  // =========================================================
  // 4. SUCCESSFUL REGISTRATION
  // =========================================================

  it("submits registration request and redirects to login on success", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Registration successful" }),
    });

    const { container } = renderSignup();

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { name: "fullName", value: "Jane Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { name: "email", value: "jane@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Create a strong password"), {
      target: { name: "password", value: "SecurePass123!" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { name: "confirmPassword", value: "SecurePass123!" },
    });

    submitForm(container);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: "Jane Doe",
            email: "jane@example.com",
            password: "SecurePass123!",
          }),
        }
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  // =========================================================
  // 5. BACKEND EMAIL ERROR
  // =========================================================

  it("displays nested backend validation error on registration failure", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        errors: {
          email: "An account with this email address already exists.",
        },
      }),
    });

    const { container } = renderSignup();

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { name: "fullName", value: "Jane Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { name: "email", value: "existing@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Create a strong password"), {
      target: { name: "password", value: "Password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { name: "confirmPassword", value: "Password123" },
    });

    submitForm(container);

    expect(
      await screen.findByText(
        "An account with this email address already exists."
      )
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // =========================================================
  // 6. GENERAL BACKEND ERROR
  // =========================================================

  it("displays primary backend error message on registration failure", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "Registration failed.",
      }),
    });

    const { container } = renderSignup();

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { name: "fullName", value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { name: "email", value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Create a strong password"), {
      target: { name: "password", value: "Password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { name: "confirmPassword", value: "Password123" },
    });

    submitForm(container);

    expect(
      await screen.findByText("Registration failed.")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // =========================================================
  // 7. NETWORK ERROR
  // =========================================================

  it("handles network error during registration", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const { container } = renderSignup();

    fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
      target: { name: "fullName", value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { name: "email", value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Create a strong password"), {
      target: { name: "password", value: "Password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { name: "confirmPassword", value: "Password123" },
    });

    submitForm(container);

    expect(await screen.findByText("Network error")).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});