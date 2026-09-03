import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// Mock CSS module with default export for predictable style assertions
vi.mock('./Button.module.css', () => ({
  default: {
    button: 'button',
    primary: 'primary',
    secondary: 'secondary',
    small: 'small',
    medium: 'medium',
    fullWidth: 'fullWidth',
    loading: 'loading',
    spinner: 'spinner',
    icon: 'icon',
    label: 'label',
  },
}));

describe('Button Component', () => {
  it('renders default button element with label text', () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('button', 'primary', 'medium');
  });

  it('handles click events when active', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom variant, size, and layout modifier classes', () => {
    render(
      <Button variant="secondary" size="small" fullWidth className="custom-class">
        Custom Style
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Custom Style' });
    expect(button).toHaveClass('button', 'secondary', 'small', 'fullWidth', 'custom-class');
  });

  it('renders polymorphic elements using the "as" prop', () => {
    render(
      <Button as="a" href="https://example.com" target="_blank">
        External Link
      </Button>
    );

    const link = screen.getByRole('link', { name: 'External Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).not.toHaveAttribute('type');
  });

  it('disables interactions and clicks when disabled prop is set', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('displays loading spinner, loading text, and disables button when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Submit
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('loading');
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders icon on left by default and hides icon during loading', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;

    const { rerender } = render(<Button icon={MockIcon}>With Icon</Button>);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveTextContent('With Icon');

    // Hide icon when loading
    rerender(
      <Button icon={MockIcon} loading>
        With Icon
      </Button>
    );
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  it('renders icon on the right when iconPosition is set to right', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;

    render(
      <Button icon={MockIcon} iconPosition="right">
        Next Page
      </Button>
    );

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});