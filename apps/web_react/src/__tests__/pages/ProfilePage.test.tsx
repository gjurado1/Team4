import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { ProfilePage } from '../../app/pages/ProfilePage';
import { PwaInstallProvider } from '../../app/contexts/PwaInstallContext';

let mockNavigate: jest.Mock;
const mockUpdateProfile = jest.fn();
const mockLogout = jest.fn();

const mockUser = {
  id: 'user_1',
  email: 'alice@example.com',
  name: 'Alice Smith',
  createdAt: new Date('2024-06-15').toISOString(),
};

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
    updateProfile: mockUpdateProfile,
  }),
}));

// ThemeToggle is rendered inside ProfilePage; matchMedia is globally mocked in setupTests
function renderPage() {
  return render(<ProfilePage />, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <PwaInstallProvider>{children}</PwaInstallProvider>
      </MemoryRouter>
    ),
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockUpdateProfile.mockReset();
  mockLogout.mockReset();
});

describe('ProfilePage', () => {
  it('renders the user name and email', () => {
    renderPage();
    expect(screen.getAllByText('Alice Smith').length).toBeGreaterThan(0);
    expect(screen.getAllByText('alice@example.com').length).toBeGreaterThan(0);
  });

  it('shows "My Profile" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /my profile/i })).toBeInTheDocument();
  });

  it('clicking "Edit name" shows the name input', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /edit name/i }));
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Alice Smith');
  });

  it('cancel editing restores original name and hides input', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /edit name/i }));
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Bob Jones');
    await user.click(screen.getByRole('button', { name: /cancel editing/i }));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('save button calls updateProfile with the new name', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockResolvedValue(undefined);
    renderPage();
    await user.click(screen.getByRole('button', { name: /edit name/i }));
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Alice Johnson');
    await user.click(screen.getByRole('button', { name: /save changes/i }));
    await waitFor(() =>
      expect(mockUpdateProfile).toHaveBeenCalledWith({ name: 'Alice Johnson' })
    );
  });

  it('save button hides the input after successful save', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockResolvedValue(undefined);
    renderPage();
    await user.click(screen.getByRole('button', { name: /edit name/i }));
    await user.click(screen.getByRole('button', { name: /save changes/i }));
    await waitFor(() => expect(screen.queryByRole('textbox')).not.toBeInTheDocument());
  });

  it('"Sign Out" button calls logout and navigates to /', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /sign out/i }));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('"Back to Dashboard" navigates to /dashboard', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /back to dashboard/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
