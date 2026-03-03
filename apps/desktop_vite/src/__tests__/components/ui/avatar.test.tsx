import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../../../app/components/ui/avatar';

describe('Avatar', () => {
  it('renders root with data-slot', () => {
    render(<Avatar data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-slot', 'avatar');
  });

  it('renders with fallback', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument();
  });

  it('AvatarFallback merges className', () => {
    render(
      <Avatar>
        <AvatarFallback className="fb-cls">F</AvatarFallback>
      </Avatar>,
    );
    expect(document.querySelector('[data-slot="avatar-fallback"]')).toHaveClass('fb-cls');
  });
});
