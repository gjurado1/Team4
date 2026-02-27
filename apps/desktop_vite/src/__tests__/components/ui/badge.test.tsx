import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, badgeVariants } from '../../../app/components/ui/badge';

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('has data-slot', () => {
    render(<Badge>B</Badge>);
    expect(screen.getByText('B')).toHaveAttribute('data-slot', 'badge');
  });

  it('applies variant secondary', () => {
    render(<Badge variant="secondary">Sec</Badge>);
    expect(screen.getByText('Sec')).toHaveClass('bg-secondary');
  });

  it('applies variant destructive and outline', () => {
    render(<Badge variant="destructive">Del</Badge>);
    expect(screen.getByText('Del')).toBeInTheDocument();
    const { rerender } = render(<Badge variant="outline">Out</Badge>);
    expect(screen.getByText('Out')).toHaveClass('text-foreground');
  });

  it('renders as child when asChild', () => {
    render(
      <Badge asChild>
        <a href="/x">Link badge</a>
      </Badge>
    );
    const link = screen.getByRole('link', { name: 'Link badge' });
    expect(link.tagName).toBe('A');
  });
});

describe('badgeVariants', () => {
  it('returns variant classes', () => {
    expect(badgeVariants({ variant: 'secondary' })).toContain('bg-secondary');
  });
});
