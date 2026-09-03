import { describe, expect, it, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

// Mock CSS module default export to match default import in component
vi.mock('./Badge.module.css', () => ({
  default: {
    badge: 'badge',
    primary: 'primary',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    dark: 'dark',
    light: 'light',
    rounded: 'rounded',
  },
}));

describe('Badge Component', () => {
  it('renders children content correctly', () => {
    render(<Badge>New Feature</Badge>);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('applies default primary variant and rounded styles', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');

    expect(badge).toHaveClass('badge', 'primary', 'rounded');
  });

  it('applies specified variant class correctly', () => {
    render(<Badge variant="danger">Error</Badge>);
    const badge = screen.getByText('Error');

    expect(badge).toHaveClass('badge', 'danger');
    expect(badge).not.toHaveClass('primary');
  });

  it('omits rounded class when rounded prop is set to false', () => {
    render(<Badge rounded={false}>Square Badge</Badge>);
    const badge = screen.getByText('Square Badge');

    expect(badge).toHaveClass('badge', 'primary');
    expect(badge).not.toHaveClass('rounded');
  });

  it('applies custom class name passed via className prop', () => {
    render(<Badge className="custom-extra-class">Custom</Badge>);
    const badge = screen.getByText('Custom');

    expect(badge).toHaveClass('badge', 'primary', 'rounded', 'custom-extra-class');
  });
});