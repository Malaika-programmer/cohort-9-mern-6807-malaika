import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

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

vi.mock('axios');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock UI components to guarantee proper DOM roles and accessibility labels
vi.mock('../../../components/ui', () => ({
  Button: ({ children, type = 'button', disabled, onClick }) => (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({ label, name, type, value, placeholder, onChange, error, 'aria-label': ariaLabel }) => (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel || label}
        onChange={onChange}
      />
      {error && <small role="alert">{error}</small>}
    </div>
  ),
  Alert: ({ children, type }) => <div role="alert" className={`alert-${type}`}>{children}</div>,
  Card: ({ children }) => <div>{children}</div>,
}));

describe('Login Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders form elements, links, and page title', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/log in to mindplanai/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^log in$/i })).toBeInTheDocument();

    const forgotLink = screen.getByRole('link', { name: /forgot password\?/i });
    expect(forgotLink).toHaveAttribute('href', '/forgot-password');

    const signupLink = screen.getByRole('link', { name: /create account/i });
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  it('displays client-side validation errors when submitting empty inputs', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /^log in$/i }));

    expect(await screen.findByText('Email address is required.')).toBeInTheDocument();
    expect(await screen.findByText('Password is required.')).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('displays validation error for malformed email addresses', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /^log in$/i }));

    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('submits login payload, saves auth token, and redirects to dashboard on success', async () => {
    const mockToken = 'mock-jwt-token-123';
    vi.mocked(axios.post).mockResolvedValueOnce({
      data: {
        data: {
          token: mockToken,
        },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: ' User@Example.Com ' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Secret123!' },
    });
    fireEvent.click(screen.getByLabelText(/remember me/i));

    fireEvent.click(screen.getByRole('button', { name: /^log in$/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/auth/login', {
        email: 'user@example.com',
        password: 'Secret123!',
        rememberMe: true,
      });
    });

    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('renders server error alert on failed authentication', async () => {
    vi.mocked(axios.post).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid email or password.',
        },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /^log in$/i }));

    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent('Invalid email or password.');
  });
});