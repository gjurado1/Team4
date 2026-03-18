import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { DashboardHeader } from '../../app/components/DashboardHeader';

let mockNavigate: jest.Mock;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const mockUser = {
  id: 'user_1',
  email: 'riley@example.com',
  name: 'Riley Parker',
  createdAt: new Date().toISOString(),
};

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => ({ user: mockUser }),
}));

function renderComponent() {
  return render(<DashboardHeader />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
});

describe('DashboardHeader', () => {
  it('renders "CareConnect" brand text', () => {
    renderComponent();
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
  });

  it('brand button navigates to /', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole('button', { name: /careconnect home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('user profile button navigates to /profile', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole('button', { name: /user profile/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it("shows user's name", () => {
    renderComponent();
    expect(screen.getByText('Riley Parker')).toBeInTheDocument();
  });

  it("shows user's initial in the avatar", () => {
    renderComponent();
    expect(screen.getByText('R')).toBeInTheDocument();
  });

  it('renders the notifications button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
  });
});
