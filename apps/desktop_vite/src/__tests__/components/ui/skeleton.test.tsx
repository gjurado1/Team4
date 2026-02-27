import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../../../app/components/ui/skeleton';

describe('Skeleton', () => {
  it('renders div with data-slot', () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId('sk')).toHaveAttribute('data-slot', 'skeleton');
  });

  it('has animate-pulse class', () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId('sk')).toHaveClass('animate-pulse');
  });

  it('merges className', () => {
    render(<Skeleton className="w-8 h-8" data-testid="sk" />);
    expect(screen.getByTestId('sk')).toHaveClass('w-8');
  });
});
