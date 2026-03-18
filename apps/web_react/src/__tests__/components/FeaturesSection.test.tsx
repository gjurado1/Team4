import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeaturesSection } from '../../app/components/FeaturesSection';

describe('FeaturesSection', () => {
  it('renders the section heading', () => {
    render(<FeaturesSection />);
    expect(screen.getByRole('heading', { name: /better healthcare/i })).toBeInTheDocument();
  });

  it('renders all six feature card titles', () => {
    render(<FeaturesSection />);
    const titles = [
      'Real-Time Monitoring',
      'HIPAA Compliant',
      '24/7 Care Access',
      'Team Collaboration',
      'Personalized Care',
      'Instant Insights',
    ];
    titles.forEach((title) => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it('renders six feature articles', () => {
    render(<FeaturesSection />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('renders feature descriptions', () => {
    render(<FeaturesSection />);
    expect(screen.getByText(/vital signs/i)).toBeInTheDocument();
    expect(screen.getByText(/end-to-end encryption/i)).toBeInTheDocument();
  });
});
