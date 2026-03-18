import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelpSection } from '../../app/components/HelpSection';

describe('HelpSection', () => {
  it('renders the section heading', () => {
    render(<HelpSection />);
    expect(screen.getByRole('heading', { name: /how can we help/i })).toBeInTheDocument();
  });

  it('renders three support option buttons', () => {
    render(<HelpSection />);
    expect(screen.getByRole('button', { name: /start chat/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /call now/i })).toBeInTheDocument();
  });

  it('first FAQ is open by default', () => {
    render(<HelpSection />);
    const firstQuestion = screen.getByRole('button', { name: /how do i get started/i });
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/sign up for a free account/i)).toBeInTheDocument();
  });

  it('clicking the open FAQ collapses it', async () => {
    const user = userEvent.setup();
    render(<HelpSection />);
    const firstQuestion = screen.getByRole('button', { name: /how do i get started/i });
    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/sign up for a free account/i)).not.toBeInTheDocument();
  });

  it('clicking a closed FAQ expands it', async () => {
    const user = userEvent.setup();
    render(<HelpSection />);
    const secondQuestion = screen.getByRole('button', { name: /hipaa compliant/i });
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');
    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/strong encryption/i)).toBeInTheDocument();
  });

  it('opening a new FAQ closes the previously open one', async () => {
    const user = userEvent.setup();
    render(<HelpSection />);
    // First is open by default
    const firstQuestion = screen.getByRole('button', { name: /how do i get started/i });
    const secondQuestion = screen.getByRole('button', { name: /hipaa compliant/i });

    await user.click(secondQuestion);

    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows all six FAQ questions', () => {
    render(<HelpSection />);
    expect(screen.getByText(/how do i get started/i)).toBeInTheDocument();
    expect(screen.getByText(/hipaa compliant/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile device/i)).toBeInTheDocument();
    expect(screen.getByText(/how much does/i)).toBeInTheDocument();
    expect(screen.getByText(/family members/i)).toBeInTheDocument();
    expect(screen.getByText(/kind of support/i)).toBeInTheDocument();
  });
});
