import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Toaster } from '../../../app/components/ui/sonner';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('Toaster', () => {
  it('renders without crashing', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });
});
