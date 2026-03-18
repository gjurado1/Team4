import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../app/components/Footer';

describe('Footer', () => {
  it('renders the CareConnect brand', () => {
    render(<Footer />);
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
  });

  it('renders social media links with aria-labels', () => {
    render(<Footer />);
    ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].forEach((network) =>
      expect(
        screen.getByRole('link', { name: new RegExp(`our ${network} page`, 'i') })
      ).toBeInTheDocument()
    );
  });

  it('renders the support email link', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /support@careconnect\.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:support@careconnect.com');
  });

  it('renders the phone link', () => {
    render(<Footer />);
    const phoneLink = screen.getByRole('link', { name: /1-800-care-help/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:1-800-227-3435');
  });

  it('renders Quick Links navigation', () => {
    render(<Footer />);
    expect(screen.getByRole('navigation', { name: /quick links/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /careers/i })).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    ['Privacy', 'Terms', 'Cookies', 'Accessibility'].forEach((item) =>
      expect(screen.getByRole('link', { name: new RegExp(`^${item}$`, 'i') })).toBeInTheDocument()
    );
  });

  it('shows the copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/copyright 2025 careconnect/i)).toBeInTheDocument();
  });

  it('renders the San Francisco address', () => {
    render(<Footer />);
    expect(screen.getByText(/san francisco/i)).toBeInTheDocument();
  });
});
