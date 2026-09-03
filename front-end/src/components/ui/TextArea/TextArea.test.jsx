import { describe, expect, it, vi } from "vitest";
import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from './TextArea';

// Mock CSS module with default export for predictable style assertions
vi.mock('./TextArea.module.css', () => ({
  default: {
    wrapper: 'wrapper',
    fullWidth: 'fullWidth',
    textArea: 'textArea',
    errorState: 'errorState',
    disabledState: 'disabledState',
    label: 'label',
    required: 'required',
    errorMessage: 'errorMessage',
    helperText: 'helperText',
  },
}));

describe('TextArea Component', () => {
  it('renders textarea element and handles value changes', () => {
    const handleChange = vi.fn();
    render(<TextArea placeholder="Enter feedback" onChange={handleChange} />);

    const textarea = screen.getByPlaceholderText('Enter feedback');
    expect(textarea).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'Great experience!' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('connects label to textarea via HTML ID and displays required asterisk', () => {
    render(<TextArea label="Comments" required id="comments-field" />);

    const label = screen.getByText('Comments');
    const textarea = screen.getByLabelText(/comments/i);

    expect(label).toHaveAttribute('for', 'comments-field');
    expect(textarea).toHaveAttribute('id', 'comments-field');
    expect(textarea).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders helper text linked via aria-describedby', () => {
    render(<TextArea label="Bio" helperText="Max 250 characters" id="user-bio" />);

    const textarea = screen.getByLabelText('Bio');
    const helper = screen.getByText('Max 250 characters');

    expect(textarea).toHaveAttribute('aria-describedby', 'user-bio-helper');
    expect(helper).toHaveAttribute('id', 'user-bio-helper');
  });

  it('renders error message in alert role and overrides helper text', () => {
    render(
      <TextArea
        label="Feedback"
        helperText="Keep it concise"
        error="Feedback is required"
        id="feedback"
      />
    );

    const textarea = screen.getByLabelText('Feedback');
    const errorMessage = screen.getByRole('alert');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'feedback-error');
    expect(textarea).toHaveClass('errorState');
    expect(errorMessage).toHaveTextContent('Feedback is required');
    expect(screen.queryByText('Keep it concise')).not.toBeInTheDocument();
  });

  it('forwards ref to the underlying HTML textarea element', () => {
    const ref = createRef();
    render(<TextArea ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies disabled state and prevents user editing', () => {
    render(<TextArea disabled label="Disabled Field" />);

    const textarea = screen.getByLabelText('Disabled Field');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabledState');
  });

  it('applies custom wrapper and textarea classes correctly', () => {
    const { container } = render(
      <TextArea
        fullWidth
        className="custom-wrapper"
        textAreaClassName="custom-textarea"
      />
    );

    const wrapper = container.firstChild;
    const textarea = screen.getByRole('textbox');

    expect(wrapper).toHaveClass('wrapper', 'fullWidth', 'custom-wrapper');
    expect(textarea).toHaveClass('textArea', 'custom-textarea');
  });
});