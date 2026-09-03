import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardTopbar from './DashboardTopbar';
import { getUser } from '../../../utils/auth';

// Mock Auth utilities
vi.mock('../../../utils/auth', () => ({
  getUser: vi.fn(),
}));

// Mock custom UI Input component from src/components/ui
vi.mock('../../ui', () => ({
  Input: (props) => (
    <input
      data-testid="search-input"
      type={props.type}
      placeholder={props.placeholder}
      aria-label={props['aria-label']}
    />
  ),
}));

describe('DashboardTopbar Component', () => {
  const mockOnMenuClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUser).mockReturnValue({
      fullName: 'Sarah Connor',
    });
  });

  const renderTopbar = () => {
    return render(<DashboardTopbar onMenuClick={mockOnMenuClick} />);
  };

  it('renders menu trigger button and search input', () => {
    renderTopbar();

    const menuButton = screen.getByRole('button', { name: /open dashboard menu/i });
    const searchInput = screen.getByTestId('search-input');

    expect(menuButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });

  it('renders custom user name returned from auth utility', () => {
    renderTopbar();

    expect(screen.getByText('Sarah Connor')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('falls back to default name when getUser returns null', () => {
    vi.mocked(getUser).mockReturnValue(null);
    renderTopbar();

    expect(screen.getByText('MindPlanAI User')).toBeInTheDocument();
  });

  it('falls back to default name when user object lacks fullName property', () => {
    vi.mocked(getUser).mockReturnValue({});
    renderTopbar();

    const userElements = screen.getAllByText('User');
    expect(userElements.length).toBeGreaterThanOrEqual(1);
  });

  it('triggers onMenuClick callback when menu button is clicked', () => {
    renderTopbar();

    const menuButton = screen.getByRole('button', { name: /open dashboard menu/i });
    fireEvent.click(menuButton);

    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });
});