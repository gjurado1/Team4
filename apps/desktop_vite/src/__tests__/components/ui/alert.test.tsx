import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '../../../app/components/ui/alert';

describe('Alert', () => {
  it('renders with role alert', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Message');
  });

  it('has data-slot', () => {
    render(<Alert>Msg</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert');
  });

  it('applies variant destructive', () => {
    render(<Alert variant="destructive">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('text-destructive');
  });

  it('merges className', () => {
    render(<Alert className="custom">A</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom');
  });
});

describe('AlertTitle', () => {
  it('renders with data-slot', () => {
    render(<AlertTitle>Title</AlertTitle>);
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'alert-title');
  });
});

describe('AlertDescription', () => {
  it('renders with data-slot', () => {
    render(<AlertDescription>Desc</AlertDescription>);
    expect(screen.getByText('Desc')).toHaveAttribute('data-slot', 'alert-description');
  });
});

