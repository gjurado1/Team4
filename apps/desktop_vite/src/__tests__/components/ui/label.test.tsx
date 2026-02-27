import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '../../../app/components/ui/label';

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('has data-slot', () => {
    render(<Label>Test</Label>);
    const label = screen.getByText('Test');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('accepts htmlFor', () => {
    render(<Label htmlFor="input-id">Name</Label>);
    expect(screen.getByText('Name')).toHaveAttribute('for', 'input-id');
  });

  it('merges custom className', () => {
    render(<Label className="custom-class">Label</Label>);
    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });
});
