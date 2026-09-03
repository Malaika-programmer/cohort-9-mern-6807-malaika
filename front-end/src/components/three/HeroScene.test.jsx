import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroScene from "./HeroScene";

// Mock @react-three/fiber to avoid WebGL canvas initialization errors in JSDOM
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children, camera, dpr }) => (
    <div
      data-testid="r3f-canvas"
      data-camera-fov={camera?.fov}
      data-dpr={JSON.stringify(dpr)}
    >
      {children}
    </div>
  ),

  // Do not execute the callback.
  // Executing it immediately causes group.current to be undefined
  // because the Three.js ref has not been initialized in JSDOM.
  useFrame: vi.fn(),
}));

// Mock @react-three/drei 3D helpers into DOM elements
vi.mock("@react-three/drei", () => ({
  ContactShadows: (props) => (
    <div
      data-testid="contact-shadows"
      data-opacity={props.opacity}
    />
  ),

  Environment: ({ preset }) => (
    <div
      data-testid="environment"
      data-preset={preset}
    />
  ),

  Float: ({ children, speed }) => (
    <div
      data-testid="float-wrapper"
      data-speed={speed}
    >
      {children}
    </div>
  ),

  MeshDistortMaterial: ({ color, distort }) => (
    <div
      data-testid="distort-material"
      data-color={color}
      data-distort={distort}
    />
  ),
}));

describe("HeroScene Component", () => {
  it("renders fixed background container with zero pointer events", () => {
    const { container } = render(<HeroScene />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveStyle({
      position: "absolute",
      pointerEvents: "none",
      opacity: "0.8",
    });
  });

  it("configures Canvas camera and device pixel ratio props", () => {
    render(<HeroScene />);

    const canvas = screen.getByTestId("r3f-canvas");

    expect(canvas).toBeInTheDocument();

    expect(canvas).toHaveAttribute(
      "data-camera-fov",
      "45"
    );

    expect(canvas).toHaveAttribute(
      "data-dpr",
      "[1,2]"
    );
  });

  it("renders environment lighting preset and contact shadows", () => {
    render(<HeroScene />);

    const environment = screen.getByTestId("environment");
    const shadows = screen.getByTestId("contact-shadows");

    expect(environment).toBeInTheDocument();
    expect(shadows).toBeInTheDocument();

    expect(environment).toHaveAttribute(
      "data-preset",
      "city"
    );

    expect(shadows).toHaveAttribute(
      "data-opacity",
      "0.4"
    );
  });

  it("renders 3 floating 3D shape groups with distortion materials", () => {
    render(<HeroScene />);

    const floatWrappers =
      screen.getAllByTestId("float-wrapper");

    const materials =
      screen.getAllByTestId("distort-material");

    // Verify all 3 floating shape groups are rendered
    expect(floatWrappers).toHaveLength(3);

    // Verify all 3 distortion materials are rendered
    expect(materials).toHaveLength(3);

    // Verify material colors
    expect(materials[0]).toHaveAttribute(
      "data-color",
      "#7C3AED"
    );

    expect(materials[1]).toHaveAttribute(
      "data-color",
      "#06B6D4"
    );

    expect(materials[2]).toHaveAttribute(
      "data-color",
      "#2563EB"
    );
  });
});