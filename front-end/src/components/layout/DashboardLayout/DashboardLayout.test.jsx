import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardLayout from './DashboardLayout';

// Mock child components exported from src/components/layout/index.js
vi.mock('../index', () => ({
  DashboardSidebar: ({ isOpen, onClose }) => (
    <div data-testid="sidebar" data-isopen={isOpen}>
      <button data-testid="sidebar-close-trigger" onClick={onClose}>
        Close Sidebar
      </button>
    </div>
  ),
  DashboardTopbar: ({ onMenuClick }) => (
    <div data-testid="topbar">
      <button data-testid="topbar-menu-trigger" onClick={onMenuClick}>
        Open Menu
      </button>
    </div>
  ),
}));

// Mock react-router-dom Outlet
vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="router-outlet">Child Route Content</div>,
}));

describe('DashboardLayout Component', () => {
  it('renders topbar, sidebar, and page content with sidebar closed by default', () => {
    render(<DashboardLayout />);

    expect(screen.getByTestId('topbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('router-outlet')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-isopen', 'false');
  });

  it('opens sidebar when topbar menu button is clicked', () => {
    render(<DashboardLayout />);

    fireEvent.click(screen.getByTestId('topbar-menu-trigger'));

    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-isopen', 'true');
    expect(screen.getByRole('button', { name: /close dashboard navigation/i })).toBeInTheDocument();
  });

  it('closes sidebar when clicking overlay button', () => {
    render(<DashboardLayout />);

    fireEvent.click(screen.getByTestId('topbar-menu-trigger'));
    fireEvent.click(screen.getByRole('button', { name: /close dashboard navigation/i }));

    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-isopen', 'false');
  });

  it('closes sidebar when sidebar triggers onClose event', () => {
    render(<DashboardLayout />);

    fireEvent.click(screen.getByTestId('topbar-menu-trigger'));
    fireEvent.click(screen.getByTestId('sidebar-close-trigger'));

    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-isopen', 'false');
  });
});