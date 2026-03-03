import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator } from '../../../app/components/ui/separator';

describe('Separator', () => {
  it('renders with default orientation horizontal', () => {
    render(<Separator data-testid="sep" />);
    const el = screen.getByTestId('sep');
    expect(el).toHaveAttribute('data-slot', 'separator-root');
    expect(el).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders with orientation vertical', () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('accepts decorative false', () => {
    render(<Separator decorative={false} data-testid="sep" />);
    expect(screen.getByTestId('sep')).toBeInTheDocument();
  });

  it('merges className', () => {
    render(<Separator className="my-4" data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveClass('my-4');
  });
});
