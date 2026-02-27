import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../../../app/components/ui/textarea';

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea placeholder="Enter..." />);
    expect(screen.getByPlaceholderText('Enter...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter...')).toHaveAttribute('data-slot', 'textarea');
  });

  it('calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} aria-label="Notes" />);
    await user.type(screen.getByLabelText('Notes'), 'x');
    expect(onChange).toHaveBeenCalled();
  });

  it('merges className', () => {
    render(<Textarea className="min-h-[100px]" data-testid="ta" />);
    expect(screen.getByTestId('ta')).toHaveClass('min-h-[100px]');
  });
});
