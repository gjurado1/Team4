import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AspectRatio } from '../../../app/components/ui/aspect-ratio';

describe('AspectRatio', () => {
  it('renders with data-slot', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="ar">
        <div>Content</div>
      </AspectRatio>
    );
    expect(screen.getByTestId('ar')).toHaveAttribute('data-slot', 'aspect-ratio');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('accepts ratio prop', () => {
    render(
      <AspectRatio ratio={1} data-testid="ar">
        <span>Square</span>
      </AspectRatio>
    );
    expect(screen.getByText('Square')).toBeInTheDocument();
  });
});
