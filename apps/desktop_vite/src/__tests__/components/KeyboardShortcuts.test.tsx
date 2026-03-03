import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeyboardShortcuts } from '../../app/components/KeyboardShortcuts';
import { vi } from 'vitest';

const mockPrint = vi.fn();
Object.defineProperty(window, 'print', { value: mockPrint, writable: true });

describe('KeyboardShortcuts (component reference card)', () => {
  beforeEach(() => {
    mockPrint.mockClear();
  });

  it('renders main heading and subtitle', () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByText('CareConnect Keyboard Shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Quick reference guide for keyboard navigation and shortcuts')).toBeInTheDocument();
  });

  it('renders macOS note', () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByText(/On macOS, use Cmd ⌘ instead of Ctrl/)).toBeInTheDocument();
  });

  it('renders all category sections', () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByText('File Operations')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Help & Accessibility')).toBeInTheDocument();
  });

  it('renders shortcut actions and keys', () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByText('New Care Plan')).toBeInTheDocument();
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Help Documentation')).toBeInTheDocument();
  });

  it('renders kbd elements for keys', () => {
    render(<KeyboardShortcuts />);
    const kbdElements = document.querySelectorAll('kbd');
    expect(kbdElements.length).toBeGreaterThan(0);
    const kbdTexts = Array.from(kbdElements).map((k) => k.textContent);
    expect(kbdTexts).toContain('Ctrl');
    expect(kbdTexts).toContain('N');
  });

  it('renders Accessibility Features section', () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByText('Accessibility Features')).toBeInTheDocument();
    expect(screen.getByText(/All interactive elements are keyboard accessible/)).toBeInTheDocument();
    expect(screen.getByText(/Screen reader compatible/)).toBeInTheDocument();
  });

  it('renders Print Reference Card button', () => {
    render(<KeyboardShortcuts />);
    const btn = screen.getByRole('button', { name: /Print Reference Card \(Ctrl\+P\)/ });
    expect(btn).toBeInTheDocument();
  });

  it('calls window.print when Print button is clicked', async () => {
    const user = userEvent.setup();
    render(<KeyboardShortcuts />);
    const btn = screen.getByRole('button', { name: /Print Reference Card/ });
    await user.click(btn);
    expect(mockPrint).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles on Print button', async () => {
    const user = userEvent.setup();
    render(<KeyboardShortcuts />);
    const btn = screen.getByRole('button', { name: /Print Reference Card/ });
    await user.hover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    expect(btn.style.color).toBe('var(--btn-primary-hover-fg)');
    await user.unhover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-bg)');
    expect(btn.style.color).toBe('var(--btn-primary-fg)');
  });

  it('applies focus and blur outline on Print button', () => {
    render(<KeyboardShortcuts />);
    const btn = screen.getByRole('button', { name: /Print Reference Card/ });
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('includes style tag with print media CSS', () => {
    render(<KeyboardShortcuts />);
    const styleTags = document.querySelectorAll('style');
    const printStyle = Array.from(styleTags).find((s) => s.textContent?.includes('@media print'));
    expect(printStyle).toBeTruthy();
    expect(printStyle?.textContent).toContain('display: none');
  });
});
