import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '../../../app/components/ui/progress';

describe('Progress', () => {
  it('renders with role progressbar', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has data-slot', () => {
    render(<Progress value={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-slot', 'progress');
  });

  it('applies transform based on value', () => {
    render(<Progress value={50} />);
    const indicator = document.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' });
  });

  it('handles value 0', () => {
    render(<Progress value={0} />);
    const indicator = document.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
  });

  it('handles value 100', () => {
    render(<Progress value={100} />);
    const indicator = document.querySelector('[data-slot="progress-indicator"]') as HTMLElement;
    expect(indicator?.style.transform).toBeDefined();
    expect(indicator?.style.transform).toMatch(/translateX\(-?0%\)/);
  });

  it('handles undefined value', () => {
    render(<Progress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
