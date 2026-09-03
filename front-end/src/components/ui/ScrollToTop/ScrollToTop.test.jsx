import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// Mock react-router-dom hook
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

// Mock CSS module with default export for predictable style assertions
vi.mock('./ScrollToTop.module.css', () => ({
  default: {
    scrollTop: 'scrollTop',
    visible: 'visible',
  },
}));

describe('ScrollToTop Component', () => {
  const mockScrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' });

    // Mock window.scrollTo (unimplemented in JSDOM)
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
      configurable: true,
    });

    // Reset default scroll position
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('scrolls to top instantly on initial render and route change', () => {
    const { rerender } = render(<ScrollToTop />);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Simulate route navigation
    vi.mocked(useLocation).mockReturnValue({ pathname: '/dashboard' });
    rerender(<ScrollToTop />);

    expect(mockScrollTo).toHaveBeenCalledTimes(2);
    expect(mockScrollTo).toHaveBeenLastCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  });

  it('remains hidden when scroll position is at or below 200px', () => {
    window.scrollY = 150;
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('scrollTop');
    expect(button).not.toHaveClass('visible');
  });

  it('becomes visible when window scrollY exceeds 200px threshold', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { name: /scroll to top/i });

    expect(button).not.toHaveClass('visible');

    // Simulate scroll past threshold
    window.scrollY = 250;
    fireEvent.scroll(window);

    expect(button).toHaveClass('visible');
  });

  it('triggers smooth scroll to top when button is clicked', () => {
    window.scrollY = 500;
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('removes window scroll event listener when component unmounts', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});