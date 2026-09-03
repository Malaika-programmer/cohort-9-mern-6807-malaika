import { describe, expect, it, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import IconBox from './IconBox';

// Mock CSS module with default export for predictable style assertions
vi.mock('./IconBox.module.css', () => ({
  default: {
    iconBox: 'iconBox',
    small: 'small',
    medium: 'medium',
    large: 'large',
    primary: 'primary',
    success: 'success',
    rounded: 'rounded',
    circle: 'circle',
    animated: 'animated',
    icon: 'icon',
  },
}));

describe('IconBox Component', () => {
  it('renders icon component when icon prop is provided', () => {
    const MockIcon = ({ className }) => (
      <svg data-testid="mock-icon" className={className} />
    );

    render(<IconBox icon={MockIcon} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('icon');
  });

  it('renders children content and overrides icon prop when children are provided', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;

    render(
      <IconBox icon={MockIcon}>
        <span>Custom Child Content</span>
      </IconBox>
    );

    expect(screen.getByText('Custom Child Content')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
  });

  it('applies default classes for size, variant, shape, and animation', () => {
    const { container } = render(<IconBox />);
    const box = container.firstChild;

    expect(box).toHaveClass(
      'iconBox',
      'medium',
      'primary',
      'rounded',
      'animated'
    );
  });

  it('normalizes size props correctly', () => {
    const { container: smContainer } = render(<IconBox size="sm" />);
    expect(smContainer.firstChild).toHaveClass('small');

    const { container: mdContainer } = render(<IconBox size="md" />);
    expect(mdContainer.firstChild).toHaveClass('medium');

    const { container: lgContainer } = render(<IconBox size="lg" />);
    expect(lgContainer.firstChild).toHaveClass('large');

    const { container: xlContainer } = render(<IconBox size="xl" />);
    expect(xlContainer.firstChild).toHaveClass('large');
  });

  it('applies custom variant, shape, animation override, and additional className', () => {
    const { container } = render(
      <IconBox
        variant="success"
        shape="circle"
        animated={false}
        className="custom-extra-class"
      />
    );
    const box = container.firstChild;

    expect(box).toHaveClass('iconBox', 'success', 'circle', 'custom-extra-class');
    expect(box).not.toHaveClass('animated', 'primary', 'rounded');
  });
});