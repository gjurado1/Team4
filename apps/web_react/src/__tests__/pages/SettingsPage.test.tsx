import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { SettingsPage } from '../../app/pages/SettingsPage';
import { PwaInstallProvider } from '../../app/contexts/PwaInstallContext';

let mockNavigate: jest.Mock;

const mockUser = {
  id: 'user_1',
  email: 'test@example.com',
  name: 'Taylor',
  createdAt: new Date().toISOString(),
};

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => ({ user: mockUser }),
}));

function renderPage() {
  return render(<SettingsPage />, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <PwaInstallProvider>{children}</PwaInstallProvider>
      </MemoryRouter>
    ),
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
});

describe('SettingsPage', () => {
  it('renders the Settings heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /^settings$/i, level: 1 })).toBeInTheDocument();
  });

  it('shows Accessibility section by default', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /accessibility/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /text size/i })).toBeInTheDocument();
  });

  it('clicking "large" text size button updates the indicator text', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /^large$/i }));
    expect(screen.getByText(/large \(20px\)/i)).toBeInTheDocument();
  });

  it('clicking "small" text size button updates the indicator text', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /^small$/i }));
    expect(screen.getByText(/small \(14px\)/i)).toBeInTheDocument();
  });

  it('toggling "Reduce Motion" changes its aria-pressed state', async () => {
    const user = userEvent.setup();
    renderPage();
    const toggle = screen.getByRole('button', { name: /reduce motion off/i });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: /reduce motion on/i })).toBeInTheDocument();
  });

  it('toggling "Screen Reader Mode" changes its aria-pressed state', async () => {
    const user = userEvent.setup();
    renderPage();
    const toggle = screen.getByRole('button', { name: /screen reader mode off/i });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: /screen reader mode on/i })).toBeInTheDocument();
  });

  it('clicking "Privacy & Data" nav item shows privacy content', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /privacy & data/i }));
    expect(screen.getByText(/your privacy matters/i)).toBeInTheDocument();
  });

  it('clicking "Notifications" nav item shows notifications content', async () => {
    const user = userEvent.setup();
    renderPage();
    const notifBtns = screen.getAllByRole('button', { name: /^notifications$/i });
    await user.click(notifBtns[1]);
    expect(screen.getByRole('button', { name: /email notifications/i })).toBeInTheDocument();
  });

  it('clicking "General" nav item shows language select', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /general/i }));
    expect(screen.getByRole('combobox', { name: /language/i })).toBeInTheDocument();
  });

  it('changing language select updates value', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /general/i }));
    const langSelect = screen.getByRole('combobox', { name: /language/i });
    await user.selectOptions(langSelect, 'es-ES');
    expect(langSelect).toHaveValue('es-ES');
  });

  it('save settings button persists settings to localStorage', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /save settings/i }));
    const stored = localStorage.getItem('careconnect-settings');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.textSize).toBe('medium');
  });

  it('shows "Settings saved!" confirmation after saving', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /save settings/i }));
    expect(screen.getByText(/settings saved/i)).toBeInTheDocument();
  });

  it('"Settings saved!" disappears after 3 seconds', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    renderPage();
    await user.click(screen.getByRole('button', { name: /save settings/i }));
    expect(screen.getByText(/settings saved/i)).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(3000));
    await waitFor(() =>
      expect(screen.queryByText(/settings saved/i)).not.toBeInTheDocument()
    );
    jest.useRealTimers();
  });
});
