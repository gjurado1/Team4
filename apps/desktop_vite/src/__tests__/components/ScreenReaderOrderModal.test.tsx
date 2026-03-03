import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScreenReaderOrderModal } from '../../app/components/ScreenReaderOrderModal';
import { vi } from 'vitest';

vi.mock('@/assets/bdb7d6b397d2984a1c754912248e17d0f29491e3.png', () => ({
  default: '/mocked-dashboard.png',
}));

describe('ScreenReaderOrderModal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('returns null when isOpen is false', () => {
    const { container } = render(<ScreenReaderOrderModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders dialog when isOpen is true', () => {
    render(<ScreenReaderOrderModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog', { name: 'Screen Reader Reading Order' })).toBeInTheDocument();
    expect(screen.getByText('Screen Reader Reading Order')).toBeInTheDocument();
    expect(screen.getByText(/This diagram shows the logical reading order/)).toBeInTheDocument();
    expect(screen.getByLabelText('Close screen reader order diagram')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('sets body overflow hidden when open and restores on close', () => {
    const { rerender } = render(<ScreenReaderOrderModal isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<ScreenReaderOrderModal isOpen={false} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ScreenReaderOrderModal isOpen={true} onClose={onClose} />);
    const backdrop = document.querySelector('[role="dialog"]');
    await user.click(backdrop!);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when inner content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ScreenReaderOrderModal isOpen={true} onClose={onClose} />);
    await user.click(screen.getByText('Screen Reader Reading Order'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<ScreenReaderOrderModal isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when header close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ScreenReaderOrderModal isOpen={true} onClose={onClose} />);
    await user.click(screen.getByLabelText('Close screen reader order diagram'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when footer Close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ScreenReaderOrderModal isOpen={true} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('applies hover and focus styles on header close button', () => {
    render(<ScreenReaderOrderModal isOpen={true} onClose={vi.fn()} />);
    const btn = screen.getByLabelText('Close screen reader order diagram');
    fireEvent.mouseEnter(btn);
    expect(btn.style.backgroundColor).toBe('var(--color-border)');
    fireEvent.mouseLeave(btn);
    expect(btn.style.backgroundColor).toBe('transparent');
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('applies hover and focus styles on footer Close button', () => {
    render(<ScreenReaderOrderModal isOpen={true} onClose={vi.fn()} />);
    const btn = screen.getByRole('button', { name: 'Close' });
    fireEvent.mouseEnter(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    fireEvent.mouseLeave(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-bg)');
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('renders annotations and legend', () => {
    render(<ScreenReaderOrderModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Reading Order Details')).toBeInTheDocument();
    expect(screen.getByText('Accessibility Best Practices Implemented')).toBeInTheDocument();
    expect(screen.getAllByText('Skip to Main Content Link').length).toBeGreaterThan(0);
  });

  it('renders dashboard image with alt text', () => {
    render(<ScreenReaderOrderModal isOpen={true} onClose={vi.fn()} />);
    const img = document.querySelector('img[alt*="CareConnect Dashboard"]');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/mocked-dashboard.png');
  });
});
