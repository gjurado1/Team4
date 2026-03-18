import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroSection } from '../../app/components/HeroSection';

describe('HeroSection', () => {
  it('renders the main headline', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { name: /health reimagined/i })).toBeInTheDocument();
  });

  it('renders the "START YOUR JOURNEY" button', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole('button', { name: /start your journey/i })
    ).toBeInTheDocument();
  });

  it('renders the "WATCH DEMO" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /watch demo/i })).toBeInTheDocument();
  });

  it('renders the health metric tabs', () => {
    render(<HeroSection />);
    const tablist = screen.getByRole('tablist', { name: /health metrics/i });
    expect(tablist).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /heart rate/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /blood pressure/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /health score/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /activity/i })).toBeInTheDocument();
  });

  it('first metric tab is selected by default', () => {
    render(<HeroSection />);
    expect(screen.getByRole('tab', { name: /heart rate/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('clicking "Blood Pressure" tab selects it', async () => {
    const user = userEvent.setup();
    render(<HeroSection />);
    await user.click(screen.getByRole('tab', { name: /blood pressure/i }));
    expect(screen.getByRole('tab', { name: /blood pressure/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: /heart rate/i })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('shows the selected metric value in the panel', async () => {
    const user = userEvent.setup();
    render(<HeroSection />);
    // Default: Heart Rate = 72
    expect(screen.getByText('72')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /blood pressure/i }));
    expect(screen.getByText('120/80')).toBeInTheDocument();
  });

  it('auto-rotates to the next metric every 3 seconds', () => {
    jest.useFakeTimers();
    render(<HeroSection />);
    expect(screen.getByRole('tab', { name: /heart rate/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    act(() => jest.advanceTimersByTime(3000));
    expect(screen.getByRole('tab', { name: /blood pressure/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    act(() => jest.advanceTimersByTime(3000));
    expect(screen.getByRole('tab', { name: /health score/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    jest.useRealTimers();
  });

  it('renders quick stats', () => {
    render(<HeroSection />);
    expect(screen.getByText(/50k\+ users/i)).toBeInTheDocument();
    expect(screen.getByText(/99\.9% uptime/i)).toBeInTheDocument();
    expect(screen.getByText(/24\/7 support/i)).toBeInTheDocument();
  });
});
