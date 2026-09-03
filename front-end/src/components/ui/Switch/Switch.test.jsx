import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";

// Mock CSS module
vi.mock("./Switch.module.css", () => ({
  default: {
    wrapper: "wrapper",
    text: "text",
    control: "control",
    track: "track",
    thumb: "thumb",
  },
}));

describe("Switch Component", () => {
  const defaultProps = {
    checked: false,
    label: "Enable Notifications",
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders label and checkbox control in unchecked state", () => {
    render(<Switch {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Enable Notifications",
    });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("reflects checked status when checked prop is true", () => {
    render(
      <Switch
        {...defaultProps}
        checked={true}
      />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Enable Notifications",
    });

    expect(checkbox).toBeChecked();
  });

  it("renders optional description text when provided", () => {
    render(
      <Switch
        {...defaultProps}
        description="Receive daily summary email alerts"
      />
    );

    const description = screen.getByText(
      "Receive daily summary email alerts"
    );

    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe("SMALL");
  });

  it("triggers onChange callback with boolean checked status on toggle", () => {
    render(
      <Switch
        {...defaultProps}
        checked={false}
      />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Enable Notifications",
    });

    fireEvent.click(checkbox);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(true);
  });

  it("disables checkbox input and prevents change handler when disabled", () => {
    render(
      <Switch
        {...defaultProps}
        disabled={true}
      />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Enable Notifications",
    });

    expect(checkbox).toBeDisabled();

    fireEvent.click(checkbox);

    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });
});