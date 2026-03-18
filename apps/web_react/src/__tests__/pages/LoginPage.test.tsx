import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { LoginPage } from '../../app/pages/LoginPage';

let mockNavigate: jest.Mock;
const mockLogin = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin }),
}));

function renderPage() {
  return render(<LoginPage />, { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> });
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockLogin.mockReset();
});

describe('LoginPage', () => {
  it('renders the sign-in heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    renderPage();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  it('renders "Back to home" link', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });

  it('renders "Sign up" link', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows demo account credentials', () => {
    renderPage();
    expect(screen.getByText(/demo@careconnect\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/demo123/i)).toBeInTheDocument();
  });

  it('shows error when email is empty on submit', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/email address is required/i);
  });

  it('shows error for malformed email', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText(/email address/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/enter a valid email address/i);
  });

  it('shows error when password is empty', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/password is required/i);
  });

  it('disables the button and shows "Signing in…" during submission', async () => {
    const user = userEvent.setup();
    // Never-resolving promise to keep the loading state visible
    mockLogin.mockReturnValue(new Promise(() => {}));
    renderPage();
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
  });

  it('navigates to /role-selection on successful login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue(undefined);
    renderPage();
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/role-selection', { replace: true })
    );
  });

  it('shows server error message on failed login', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue(new Error('Invalid email or password'));
    renderPage();
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i)
    );
  });
});
