import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';

// Mock CSS module with default export for predictable style assertions
vi.mock('./ConfirmModal.module.css', () => ({
  default: {
    overlay: 'overlay',
    modal: 'modal',
    closeButton: 'closeButton',
    icon: 'icon',
    actions: 'actions',
  },
}));

// Mock UI Button component exported from parent index
vi.mock('../index', () => ({
  Button: ({ children, onClick, variant }) => (
    <button type="button" data-variant={variant} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('ConfirmModal Component', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<ConfirmModal {...defaultProps} isOpen={false} />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal dialog with title, description, and accessibility attributes when isOpen is true', () => {
    render(<ConfirmModal {...defaultProps} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'confirm-modal-title');

    expect(
      screen.getByRole('heading', { level: 2, name: 'Delete Item' })
    ).toHaveAttribute('id', 'confirm-modal-title');
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('triggers onConfirm callback when clicking the confirm button', () => {
    render(<ConfirmModal {...defaultProps} />);

    const confirmButton = screen.getByRole('button', { name: 'Delete' });
    expect(confirmButton).toHaveAttribute('data-variant', 'danger');

    fireEvent.click(confirmButton);
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.onCancel).not.toHaveBeenCalled();
  });

  it('triggers onCancel callback when clicking the cancel button', () => {
    render(<ConfirmModal {...defaultProps} />);

    const cancelButton = screen.getAllByRole('button', { name: 'Cancel' });
    expect(cancelButton[0]).toBeInTheDocument();

    fireEvent.click(cancelButton[0]);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
  });

  it('triggers onCancel callback when clicking the top-right close icon button', () => {
    render(<ConfirmModal {...defaultProps} />);

    // Top-right close button uses cancelLabel as aria-label
    const closeButtons = screen.getAllByRole('button', { name: 'Cancel' });

    fireEvent.click(closeButtons[0]);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});