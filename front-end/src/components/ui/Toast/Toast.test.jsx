import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import Toast from "./Toast";

// Mock CSS module
vi.mock("./Toast.module.css", () => ({
  default: {
    toast: "toast",
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
    closeButton: "closeButton",
  },
}));

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders toast message and applies variant class", () => {
    render(
      <Toast
        message="Changes saved successfully!"
        type="success"
      />
    );

    const toast = screen.getByRole("status");

    expect(toast).toBeInTheDocument();

    expect(
      screen.getByText("Changes saved successfully!")
    ).toBeInTheDocument();

    expect(toast).toHaveClass("toast");
    expect(toast).toHaveClass("success");
  });

  it("triggers onClose callback when close button is clicked", () => {
    const handleClose = vi.fn();

    render(
      <Toast
        message="Item deleted"
        onClose={handleClose}
      />
    );

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("triggers onClose automatically after auto-dismiss duration", () => {
    const handleClose = vi.fn();

    render(
      <Toast
        message="Auto dismiss"
        duration={3000}
        onClose={handleClose}
      />
    );

    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});