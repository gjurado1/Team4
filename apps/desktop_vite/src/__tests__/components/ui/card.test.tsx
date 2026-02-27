import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../../../app/components/ui/card';

describe('Card', () => {
  it('renders Card with children', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('merges className', () => {
    render(<Card className="custom" data-testid="card2">C</Card>);
    expect(screen.getByTestId('card2')).toHaveClass('custom');
  });
});

describe('CardHeader', () => {
  it('renders with data-slot', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toHaveAttribute('data-slot', 'card-header');
  });
});

describe('CardTitle', () => {
  it('renders as h4', () => {
    render(<CardTitle>Title</CardTitle>);
    const el = screen.getByText('Title');
    expect(el.tagName).toBe('H4');
    expect(el).toHaveAttribute('data-slot', 'card-title');
  });
});

describe('CardDescription', () => {
  it('renders description', () => {
    render(<CardDescription>Desc</CardDescription>);
    expect(screen.getByText('Desc')).toHaveAttribute('data-slot', 'card-description');
  });
});

describe('CardContent', () => {
  it('renders content', () => {
    render(<CardContent>Body</CardContent>);
    expect(screen.getByText('Body')).toHaveAttribute('data-slot', 'card-content');
  });
});

describe('CardFooter', () => {
  it('renders footer', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveAttribute('data-slot', 'card-footer');
  });
});

describe('CardAction', () => {
  it('renders action slot', () => {
    render(<CardAction>Action</CardAction>);
    expect(screen.getByText('Action')).toHaveAttribute('data-slot', 'card-action');
  });
});
