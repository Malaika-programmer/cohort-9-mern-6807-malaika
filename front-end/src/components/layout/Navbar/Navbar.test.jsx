import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useAppPreferences } from '../../../contexts/AppPreferencesContext';
import { isAuthenticated } from '../../../utils/auth';

// Mock AppPreferences context hook
vi.mock('../../../contexts/AppPreferencesContext', () => ({
  useAppPreferences: vi.fn(),
}));

// Mock Auth utilities
vi.mock('../../../utils/auth', () => ({
  isAuthenticated: vi.fn(),
}));

// Mock UI Button component
vi.mock('../../ui', () => ({
  Button: ({ children, to, onClick }) => (
    <a href={to} onClick={onClick} data-testid="mock-ui-button">
      {children}
    </a>
  ),
}));

describe('Navbar Component', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppPreferences).mockReturnValue({
      effectiveTheme: 'light',
      setTheme: mockSetTheme,
    });

    vi.mocked(isAuthenticated).mockReturnValue(false);
  });

  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

  it('renders brand identity and navigation links', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: /mindplanai home/i })).toHaveAttribute('href', '/');
    
    // getAllByRole handles responsive duplicated nav links
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    const blogLinks = screen.getAllByRole('link', { name: 'Blogs' });
    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });

    expect(homeLinks[0]).toHaveAttribute('href', '/');
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');
    expect(blogLinks[0]).toHaveAttribute('href', '/blogs');
    expect(contactLinks[0]).toHaveAttribute('href', '/contact');
  });

  it('renders login link and signup button when user is unauthenticated', () => {
    vi.mocked(isAuthenticated).mockReturnValue(false);
    renderNavbar();

    const loginLinks = screen.getAllByRole('link', { name: 'Login' });
    const signupButtons = screen.getAllByRole('link', { name: 'Get Started' });

    expect(loginLinks.length).toBeGreaterThan(0);
    expect(signupButtons.length).toBeGreaterThan(0);
    expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
  });

  it('renders dashboard link when user is authenticated', () => {
    vi.mocked(isAuthenticated).mockReturnValue(true);
    renderNavbar();

    const dashboardButtons = screen.getAllByRole('link', { name: 'Dashboard' });
    expect(dashboardButtons.length).toBeGreaterThan(0);
    expect(screen.queryByRole('link', { name: 'Login' })).not.toBeInTheDocument();
  });

  it('toggles theme preference from light to dark when theme button is clicked', () => {
    renderNavbar();

    const themeButtons = screen.getAllByRole('button', { name: /switch to dark theme/i });
    fireEvent.click(themeButtons[0]);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles theme preference from dark to light when dark mode is active', () => {
    vi.mocked(useAppPreferences).mockReturnValue({
      effectiveTheme: 'dark',
      setTheme: mockSetTheme,
    });

    renderNavbar();

    const themeButtons = screen.getAllByRole('button', { name: /switch to light theme/i });
    fireEvent.click(themeButtons[0]);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('updates document favicon when effective theme changes', () => {
    // Setup existing favicon element in head
    let favicon = document.querySelector("link[rel*='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'shortcut icon';
      document.head.appendChild(favicon);
    }

    renderNavbar();

    // Queries the DOM directly to ensure Navbar has set or updated the favicon tag
    const currentFavicon = document.querySelector("link[rel*='icon']");
    expect(currentFavicon).not.toBeNull();
    expect(currentFavicon.getAttribute('href')).toBeTruthy();
  });

  it('toggles mobile drawer navigation when menu icon button is clicked', () => {
    renderNavbar();

    const menuToggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuToggleButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuToggleButton);

    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });
});