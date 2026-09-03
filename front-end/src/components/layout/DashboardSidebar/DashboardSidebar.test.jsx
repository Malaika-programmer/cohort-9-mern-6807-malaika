import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { logout, getUser } from '../../../utils/auth';

// Mock Auth utilities with vi.mock
vi.mock('../../../utils/auth', () => ({
  logout: vi.fn(),
  getUser: vi.fn(),
}));

// Mock useNavigate while preserving actual MemoryRouter
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DashboardSidebar Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUser).mockReturnValue({
      fullName: 'Alex Smith',
      email: 'alex@example.com',
    });
  });

  const renderSidebar = (isOpen = false) => {
    return render(
      <MemoryRouter>
        <DashboardSidebar isOpen={isOpen} onClose={mockOnClose} />
      </MemoryRouter>
    );
  };

  it('renders brand identity and navigation links', () => {
    renderSidebar();

    expect(screen.getByText('MindPlan')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders authenticated user details from auth utility', () => {
    renderSidebar();

    expect(screen.getByText('Alex Smith')).toBeInTheDocument();
    expect(screen.getByText('alex@example.com')).toBeInTheDocument();
  });

  it('falls back to default labels when user object is empty', () => {
    vi.mocked(getUser).mockReturnValue(null);
    renderSidebar();

    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('triggers onClose when close icon button is clicked', () => {
    renderSidebar(true);

    const closeButton = screen.getByRole('button', { name: /close dashboard menu/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when navigation item is clicked', () => {
    renderSidebar();

    const notesLink = screen.getByText('Notes');
    fireEvent.click(notesLink);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('executes logout utility, closes drawer, and redirects to /login', () => {
    renderSidebar();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(logout).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});