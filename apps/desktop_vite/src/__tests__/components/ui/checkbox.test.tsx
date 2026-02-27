import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../../../app/components/ui/checkbox';

describe('Checkbox', () => {
  it('renders with role checkbox', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('has data-slot', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-slot', 'checkbox');
  });

  it('can be checked and unchecked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const cb = screen.getByRole('checkbox');
    await user.click(cb);
    expect(cb).toHaveAttribute('data-state', 'checked');
    await user.click(cb);
    expect(cb).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders indicator slot', () => {
    const { container } = render(<Checkbox defaultChecked />);
    expect(container.querySelector('[data-slot="checkbox-indicator"]')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
