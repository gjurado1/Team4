import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResourcesSection } from '../../app/components/ResourcesSection';

describe('ResourcesSection', () => {
  it('renders the section heading', () => {
    render(<ResourcesSection />);
    expect(screen.getByRole('heading', { name: /get started/i })).toBeInTheDocument();
  });

  it('renders six resource link cards', () => {
    render(<ResourcesSection />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('renders resource titles', () => {
    render(<ResourcesSection />);
    expect(screen.getByText('Getting Started Guide')).toBeInTheDocument();
    expect(screen.getByText('Video Tutorials')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
  });

  it('all resource cards are anchor links', () => {
    render(<ResourcesSection />);
    const links = screen.getAllByRole('listitem');
    links.forEach((item) => expect(item.tagName).toBe('A'));
  });

  it('shows resource type badges', () => {
    render(<ResourcesSection />);
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByText('Video')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
  });
});
