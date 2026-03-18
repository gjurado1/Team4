import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { SignupPage } from '../../app/pages/SignupPage';

let mockNavigate: jest.Mock;
const mockSignup = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => ({ signup: mockSignup }),
}));

function renderPage() {
  return render(<SignupPage />, { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> });
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockSignup.mockReset();
});

describe('SignupPage', () => {
  it('renders the create account heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
  });

  it('renders all four input fields', () => {
    renderPage();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('renders "Sign in" link', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates name is too short (< 2 chars)', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'A');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/enter your full name/i);
  });

  it('validates malformed email', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'not-valid');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/enter a valid email address/i);
  });

  it('validates passwords do not match', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.type(screen.getByLabelText(/confirm password/i), 'different');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/passwords do not match/i);
  });

  it('validates password is too short (< 6 chars)', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'abc');
    await user.type(screen.getByLabelText(/confirm password/i), 'abc');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/at least 6 characters/i);
  });

  it('disables button and shows "Creating account…" during submission', async () => {
    const user = userEvent.setup();
    mockSignup.mockReturnValue(new Promise(() => {}));
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.type(screen.getByLabelText(/confirm password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
  });

  it('navigates to /role-selection on successful signup', async () => {
    const user = userEvent.setup();
    mockSignup.mockResolvedValue(undefined);
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.type(screen.getByLabelText(/confirm password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/role-selection', { replace: true })
    );
  });

  it('shows server error on failed signup', async () => {
    const user = userEvent.setup();
    mockSignup.mockRejectedValue(new Error('User with this email already exists'));
    renderPage();
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'existing@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.type(screen.getByLabelText(/confirm password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i)
    );
  });
});
