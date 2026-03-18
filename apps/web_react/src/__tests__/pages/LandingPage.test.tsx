import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { LandingPage } from '../../app/pages/LandingPage';

let mockNavigate: jest.Mock;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

function renderPage() {
  return render(<LandingPage />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
});

describe('LandingPage', () => {
  it('renders "Your Health" heading content', () => {
    renderPage();
    expect(screen.getByText(/your health/i)).toBeInTheDocument();
  });

  it('renders "Connected" gradient line', () => {
    renderPage();
    expect(screen.getByText(/connected/i)).toBeInTheDocument();
  });

  it('renders the subtitle description', () => {
    renderPage();
    expect(screen.getByText(/appointments/i)).toBeInTheDocument();
  });

  it('"Get Started" button navigates to /login', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /get started/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
