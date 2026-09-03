import { describe, expect, it, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import SectionHeading from './SectionHeading';

// Mock CSS module with default export for predictable style assertions
vi.mock('./SectionHeading.module.css', () => ({
  default: {
    wrapper: 'wrapper',
    eyebrow: 'eyebrow',
    title: 'title',
    description: 'description',
    left: 'left',
    center: 'center',
    right: 'right',
  },
}));

describe('SectionHeading Component', () => {
  it('renders required title in an h2 heading element', () => {
    render(<SectionHeading title="Features Section" />);

    const heading = screen.getByRole('heading', { level: 2, name: 'Features Section' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('title');
  });

  it('applies default center alignment and wrapper classes', () => {
    const { container } = render(<SectionHeading title="Centered Heading" />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('wrapper', 'center');
  });

  it('renders eyebrow text when provided', () => {
    render(<SectionHeading title="Heading" eyebrow="Overview" />);

    const eyebrow = screen.getByText('Overview');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveClass('eyebrow');
  });

  it('renders badge as eyebrow fallback when eyebrow prop is omitted', () => {
    render(<SectionHeading title="Heading" badge="New Release" />);

    const eyebrowBadge = screen.getByText('New Release');
    expect(eyebrowBadge).toBeInTheDocument();
    expect(eyebrowBadge).toHaveClass('eyebrow');
  });

  it('prioritizes eyebrow text over badge prop when both are provided', () => {
    render(
      <SectionHeading
        title="Heading"
        eyebrow="Primary Eyebrow"
        badge="Secondary Badge"
      />
    );

    expect(screen.getByText('Primary Eyebrow')).toBeInTheDocument();
    expect(screen.queryByText('Secondary Badge')).not.toBeInTheDocument();
  });

  it('renders description paragraph when provided', () => {
    render(
      <SectionHeading
        title="Heading"
        description="Detailed description for this section."
      />
    );

    const description = screen.getByText('Detailed description for this section.');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('description');
  });

  it('applies titleId, custom alignment, and extra className props correctly', () => {
    const { container } = render(
      <SectionHeading
        title="Custom Section"
        titleId="custom-section-id"
        align="left"
        className="custom-class"
      />
    );

    const wrapper = container.firstChild;
    const heading = screen.getByRole('heading', { level: 2 });

    expect(wrapper).toHaveClass('wrapper', 'left', 'custom-class');
    expect(heading).toHaveAttribute('id', 'custom-section-id');
  });
});