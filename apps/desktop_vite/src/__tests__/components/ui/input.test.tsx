import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../../../app/components/ui/input';

describe('Input', () => {
  it('renders with type and placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
    expect(input.tagName).toBe('INPUT');
  });

  it('accepts type attribute', () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} aria-label="Test input" />);
    await user.type(screen.getByLabelText('Test input'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('merges custom className', () => {
    render(<Input className="custom" data-testid="inp" />);
    expect(screen.getByTestId('inp')).toHaveClass('custom');
  });
});
