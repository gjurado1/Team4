import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../../app/components/ThemeToggle';

function setupMatchMedia(prefersDark: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockReturnValue({ matches: prefersDark }),
  });
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    setupMatchMedia(false);
  });

  it('renders a placeholder div before hydration', () => {
    // React renders synchronously in tests, but the placeholder is returned
    // before the useEffect fires. After the first render cycle it will be
    // replaced by the real button, so we just verify nothing crashes.
    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders the toggle button after mount', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows aria-label for switching to dark mode when theme is light', () => {
    // No savedTheme, matchMedia returns false → light mode
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    );
  });

  it('shows aria-label for switching to light mode when saved theme is dark', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode'
    );
  });

  it('adds "dark" class to documentElement when savedTheme is dark', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('adds "dark" class when system prefers dark and no saved theme', () => {
    setupMatchMedia(true);
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles from light to dark on click', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles from dark to light on click', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('saves the new theme to localStorage on click', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('updates aria-label after toggle', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
