import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ForgotPassword from "./ForgotPasswordPage";

// Fix JSDOM getComputedStyle bug caused by CSS variables
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

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  KeyRound: () => <div data-testid="key-icon" />,
  ShieldCheck: () => <div data-testid="shield-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
}));

// Mock UI components safely matching ForgotPasswordPage.jsx props
vi.mock("../../components/ui", () => ({
  Button: ({ children, type = "button", disabled, loading, onClick }) => (
    <button type={type} disabled={disabled || loading} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({
    label,
    name,
    type = "text",
    value = "",
    placeholder,
    onChange,
    error,
    disabled,
    required,
    icon: Icon,
  }) => {
    const inputId = name || "email-input";
    return (
      <div>
        {label && <label htmlFor={inputId}>{label}</label>}
        {Icon && <Icon data-testid="input-icon" />}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
        {error && <span role="alert">{error}</span>}
      </div>
    );
  },
  SectionHeading: ({ title, description, eyebrow }) => (
    <div>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  ),
  IconBox: () => <div data-testid="icon-box" />,
  Card: ({ children, className }) => <div className={className}>{children}</div>,
}));

describe("ForgotPassword Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders page elements correctly", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    // Title heading (matches first instance to prevent multiple element clash)
    expect(screen.getAllByText(/reset your password/i)[0]).toBeInTheDocument();

    // Input field
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

    // Submit button
    expect(
      screen.getByRole("button", { name: /send reset link/i })
    ).toBeInTheDocument();

    // Link back to login
    expect(screen.getByText(/back to login/i)).toBeInTheDocument();
  });

  it("displays validation error on empty submission", async () => {
    const { container } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(
      await screen.findByText("Email address is required.")
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("displays validation error for bad email format", async () => {
    const { container } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, {
      target: { name: "email", value: "invalid-email" },
    });

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(
      await screen.findByText("Enter a valid email address.")
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("clears error message on input change", async () => {
    const { container } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);
    expect(
      await screen.findByText("Email address is required.")
    ).toBeInTheDocument();

    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, {
      target: { name: "email", value: "user@example.com" },
    });

    expect(
      screen.queryByText("Email address is required.")
    ).not.toBeInTheDocument();
  });

  it("submits correctly on valid email input", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    const { container } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, {
      target: { name: "email", value: "user@example.com" },
    });

    const form = container.querySelector("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user@example.com" }),
        }
      );
    });

    expect(
      await screen.findByText(
        "If an account exists with this email address, password reset instructions will be sent."
      )
    ).toBeInTheDocument();
  });

  it("handles server errors cleanly", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Server error occurred" }),
    });

    const { container } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, {
      target: { name: "email", value: "user@example.com" },
    });

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(await screen.findByText("Server error occurred")).toBeInTheDocument();
  });
});