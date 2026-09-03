import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

// Mock CSS module with default export for predictable style assertions
vi.mock('./Card.module.css', () => ({
  default: {
    card: 'card',
    clickable: 'clickable',
    header: 'header',
    icon: 'icon',
    badge: 'badge',
    title: 'title',
    description: 'description',
    footer: 'footer',
  },
}));

describe('Card Component', () => {
  it('renders title, description, and children inside the article container', () => {
    render(
      <Card title="Card Title" description="Card Description">
        <p>Card Body Content</p>
      </Card>
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Card Title' })).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Body Content')).toBeInTheDocument();
  });

  it('renders header section with icon and badge props', () => {
    const MockIcon = ({ size }) => <svg data-testid="card-icon" data-size={size} />;

    render(<Card icon={MockIcon} badge="New Feature" />);

    const icon = screen.getByTestId('card-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-size', '22');
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('triggers onClick callback and applies clickable class when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick} title="Interactive Card" />);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('card', 'clickable');

    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('omits clickable class when no onClick prop is present', () => {
    render(<Card title="Static Card" />);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('card');
    expect(card).not.toHaveClass('clickable');
  });

  it('renders footer section when footer prop is provided', () => {
    render(
      <Card footer={<button type="button">Footer Action</button>} />
    );

    expect(screen.getByRole('button', { name: 'Footer Action' })).toBeInTheDocument();
  });

  it('applies custom className prop correctly', () => {
    render(<Card className="custom-card-style" />);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('card', 'custom-card-style');
  });

  it('does not render empty header, title, description, or footer wrappers when props are omitted', () => {
    const { container } = render(<Card />);

    expect(container.querySelector('.header')).not.toBeInTheDocument();
    expect(container.querySelector('.title')).not.toBeInTheDocument();
    expect(container.querySelector('.description')).not.toBeInTheDocument();
    expect(container.querySelector('.footer')).not.toBeInTheDocument();
  });
});