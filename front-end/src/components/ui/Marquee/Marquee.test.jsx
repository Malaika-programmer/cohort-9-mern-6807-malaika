import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Marquee from "./Marquee";

// Mock CSS module
vi.mock("./Marquee.module.css", () => ({
  default: {
    marquee: "marquee",
    pauseOnHover: "pauseOnHover",
    track: "track",
    reverse: "reverse",
    item: "item",
    icon: "icon",
    label: "label",
  },
}));

describe("Marquee Component", () => {
  const mockItems = [
    { label: "React" },
    { label: "Next.js" },
  ];

  // =========================================================
  // 1. DUPLICATED ITEMS
  // =========================================================

  it("renders duplicated items array to enable seamless infinite scroll", () => {
    render(<Marquee items={mockItems} />);

    // Items should appear twice because the component duplicates them
    const reactItems = screen.getAllByText("React");
    const nextItems = screen.getAllByText("Next.js");

    expect(reactItems).toHaveLength(2);
    expect(nextItems).toHaveLength(2);
  });

  // =========================================================
  // 2. DEFAULT PROPS
  // =========================================================

  it("applies default props correctly", () => {
    const { container } = render(
      <Marquee items={mockItems} />
    );

    const wrapper = container.firstChild;
    const track = wrapper.firstChild;

    // Wrapper classes
    expect(wrapper).toHaveClass(
      "marquee",
      "pauseOnHover"
    );

    // Track class
    expect(track).toHaveClass("track");

    // Default direction should be forward
    expect(track).not.toHaveClass("reverse");

    // Default duration
    expect(track).toHaveStyle({
      "--marquee-duration": "24s",
    });
  });

  // =========================================================
  // 3. ICONS
  // =========================================================

  it("renders icons when present in item objects", () => {
    const mockItemsWithIcons = [
      {
        label: "TypeScript",
        icon: ({ className }) => (
          <svg
            data-testid="ts-icon"
            className={className}
          />
        ),
      },
    ];

    render(
      <Marquee items={mockItemsWithIcons} />
    );

    // Items are duplicated, so icon should appear twice
    const icons = screen.getAllByTestId("ts-icon");

    expect(icons).toHaveLength(2);

    // Verify icon class
    icons.forEach((icon) => {
      expect(icon).toHaveClass("icon");
    });
  });

  // =========================================================
  // 4. CUSTOM PROPS
  // =========================================================

  it("applies custom speed, reverse, pauseOnHover, and className props", () => {
    const { container } = render(
      <Marquee
        items={mockItems}
        speed={10}
        pauseOnHover={false}
        reverse={true}
        className="custom-marquee"
      />
    );

    const wrapper = container.firstChild;
    const track = wrapper.firstChild;

    // Custom class
    expect(wrapper).toHaveClass(
      "marquee",
      "custom-marquee"
    );

    // pauseOnHover should not exist
    expect(wrapper).not.toHaveClass(
      "pauseOnHover"
    );

    // Reverse should be enabled
    expect(track).toHaveClass(
      "track",
      "reverse"
    );

    // Custom duration
    expect(track).toHaveStyle({
      "--marquee-duration": "10s",
    });
  });

  // =========================================================
  // 5. LABELS
  // =========================================================

  it("renders item labels correctly", () => {
    render(<Marquee items={mockItems} />);

    expect(
      screen.getAllByText("React")
    ).toHaveLength(2);

    expect(
      screen.getAllByText("Next.js")
    ).toHaveLength(2);
  });

  // =========================================================
  // 6. ITEM WITHOUT ICON
  // =========================================================

  it("renders items without icons correctly", () => {
    const items = [
      {
        label: "JavaScript",
      },
      {
        label: "TypeScript",
      },
    ];

    render(<Marquee items={items} />);

    expect(
      screen.getAllByText("JavaScript")
    ).toHaveLength(2);

    expect(
      screen.getAllByText("TypeScript")
    ).toHaveLength(2);
  });
});