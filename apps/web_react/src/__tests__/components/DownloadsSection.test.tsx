import React from 'react';
import { render, screen } from '@testing-library/react';
import { DownloadsSection } from '../../app/components/DownloadsSection';

describe('DownloadsSection', () => {
  it('renders the section heading', () => {
    render(<DownloadsSection />);
    expect(screen.getByRole('heading', { name: /download careconnect/i })).toBeInTheDocument();
  });

  it('renders all four platform options', () => {
    render(<DownloadsSection />);
    ['Windows', 'macOS', 'iOS', 'Android'].forEach((platform) =>
      expect(screen.getByText(platform)).toBeInTheDocument()
    );
  });

  it('renders four download links with correct aria-labels', () => {
    render(<DownloadsSection />);
    ['Windows', 'macOS', 'iOS', 'Android'].forEach((platform) =>
      expect(
        screen.getByRole('link', { name: new RegExp(`download careconnect for ${platform}`, 'i') })
      ).toBeInTheDocument()
    );
  });

  it('shows version and file size for each option', () => {
    render(<DownloadsSection />);
    expect(screen.getByText('125 MB')).toBeInTheDocument();
    expect(screen.getByText('98 MB')).toBeInTheDocument();
  });

  it('shows "Most Popular" badge for Windows', () => {
    render(<DownloadsSection />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('shows "App Store" badge for iOS', () => {
    render(<DownloadsSection />);
    expect(screen.getByText('App Store')).toBeInTheDocument();
  });
});
