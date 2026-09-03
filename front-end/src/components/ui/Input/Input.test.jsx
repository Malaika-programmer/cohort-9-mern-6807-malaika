import { describe, expect, it, vi } from "vitest";
import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

// Mock CSS module with default export for predictable style assertions
vi.mock('./Input.module.css', () => ({
  default: {
    wrapper: 'wrapper',
    fullWidth: 'fullWidth',
    inputWrapper: 'inputWrapper',
    errorState: 'errorState',
    disabledState: 'disabledState',
    input: 'input',
    withLeftIcon: 'withLeftIcon',
    withRightIcon: 'withRightIcon',
    label: 'label',
    required: 'required',
    icon: 'icon',
    leftIcon: 'leftIcon',
    rightIcon: 'rightIcon',
    clickableIcon: 'clickableIcon',
    errorMessage: 'errorMessage',
    helperText: 'helperText',
  },
}));

describe('Input Component', () => {
  it('renders input element and handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Enter email" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'user@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('connects label to input via HTML ID and displays required asterisk', () => {
    render(<Input label="Email Address" required id="email-field" />);

    const label = screen.getByText('Email Address');
    const input = screen.getByLabelText(/email address/i);

    expect(label).toHaveAttribute('for', 'email-field');
    expect(input).toHaveAttribute('id', 'email-field');
    expect(input).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders helper text linked via aria-describedby', () => {
    render(<Input label="Username" helperText="Must be unique" id="username" />);

    const input = screen.getByLabelText('Username');
    const helper = screen.getByText('Must be unique');

    expect(input).toHaveAttribute('aria-describedby', 'username-helper');
    expect(helper).toHaveAttribute('id', 'username-helper');
  });

  it('renders error message in alert role and overrides helper text', () => {
    render(
      <Input
        label="Password"
        helperText="Minimum 8 characters"
        error="Password is required"
        id="password"
      />
    );

    const input = screen.getByLabelText('Password');
    const errorMessage = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'password-error');
    expect(errorMessage).toHaveTextContent('Password is required');
    expect(screen.queryByText('Minimum 8 characters')).not.toBeInTheDocument();
  });

  it('renders component icons and handles positional prop placement', () => {
    const LeftIcon = ({ className }) => <svg data-testid="left-icon" className={className} />;
    const RightIcon = ({ className }) => <svg data-testid="right-icon" className={className} />;

    const { rerender } = render(<Input icon={LeftIcon} iconPosition="left" />);
    expect(screen.getByTestId('left-icon')).toHaveClass('leftIcon');

    rerender(<Input icon={LeftIcon} iconPosition="right" />);
    expect(screen.getByTestId('left-icon')).toHaveClass('rightIcon');

    rerender(<Input rightIcon={<RightIcon />} />);
    expect(screen.getByTestId('right-icon')).toHaveClass('rightIcon', 'clickableIcon');
  });

  it('forwards ref to the underlying HTML input element', () => {
    const ref = createRef();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies disabled state and prevents editing', () => {
    render(<Input disabled label="Disabled Input" />);

    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
  });
});