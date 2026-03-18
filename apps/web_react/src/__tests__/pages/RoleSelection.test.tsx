import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { RoleSelection } from '../../app/pages/RoleSelection';

let mockNavigate: jest.Mock;
const mockSetUserRole = jest.fn();

const mockUser = {
  id: 'user_1',
  email: 'test@example.com',
  name: 'Jordan',
  createdAt: new Date().toISOString(),
};

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    setUserRole: mockSetUserRole,
  }),
}));

function renderPage() {
  return render(<RoleSelection />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockSetUserRole.mockReset();
});

describe('RoleSelection', () => {
  it('shows user name in welcome heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /welcome, jordan/i })).toBeInTheDocument();
  });

  it('shows "Patient Portal" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /patient portal/i })).toBeInTheDocument();
  });

  it('shows "Caregiver Portal" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /caregiver portal/i })).toBeInTheDocument();
  });

  it('clicking "Continue as Patient" calls setUserRole and navigates to /dashboard', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /continue as patient/i }));
    expect(mockSetUserRole).toHaveBeenCalledWith('patient');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('clicking "Continue as Caregiver" calls setUserRole and navigates to /dashboard', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /continue as caregiver/i }));
    expect(mockSetUserRole).toHaveBeenCalledWith('caregiver');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('lists patient features', () => {
    renderPage();
    expect(screen.getByText(/schedule appointments/i)).toBeInTheDocument();
    expect(screen.getByText(/track medications/i)).toBeInTheDocument();
  });

  it('lists caregiver features', () => {
    renderPage();
    expect(screen.getByText(/manage patient list/i)).toBeInTheDocument();
    expect(screen.getByText(/coordinate appointments/i)).toBeInTheDocument();
  });

  it('shows the switch-portals note', () => {
    renderPage();
    expect(screen.getByText(/switch between portals/i)).toBeInTheDocument();
  });
});
