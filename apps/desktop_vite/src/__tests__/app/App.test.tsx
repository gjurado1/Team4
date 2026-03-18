import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../app/App';

const setUserRoleMock = vi.fn();
const setUserNameMock = vi.fn();
const createAppRouterMock = vi.fn();
const routerNavigateMock = vi.fn();
const unsubscribeMock = vi.fn();

let menuCommandHandler: ((command: string) => Promise<void> | void) | undefined;

vi.mock('motion/react', () => {
  const MotionDiv = ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: any) => (
    <div {...props}>{children}</div>
  );

  return {
    motion: {
      div: MotionDiv,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock('react-router', () => ({
  RouterProvider: ({ router }: { router: { id?: string } }) => (
    <div data-testid="router-provider">{router.id ?? 'router'}</div>
  ),
}));

vi.mock('../../app/components/WelcomeScreen', () => ({
  WelcomeScreen: ({ onGetStarted }: { onGetStarted: () => void }) => (
    <button onClick={onGetStarted}>Start welcome flow</button>
  ),
}));

vi.mock('../../app/components/LoginScreen', () => ({
  LoginScreen: ({
    onBack,
    onLogin,
  }: {
    onBack: () => void;
    onLogin: (roles: Array<'caregiver' | 'patient'>) => void;
  }) => (
    <div>
      <button onClick={onBack}>Back to welcome</button>
      <button onClick={() => onLogin([])}>Login with default roles</button>
      <button onClick={() => onLogin(['patient'])}>Login with patient role</button>
    </div>
  ),
}));

vi.mock('../../app/components/RoleSelection', () => ({
  RoleSelection: ({
    allowedRoles,
    onRoleSelect,
  }: {
    allowedRoles?: string[];
    onRoleSelect: (role: 'caregiver' | 'patient', name: string) => void;
  }) => (
    <div>
      <div data-testid="allowed-roles">{(allowedRoles ?? []).join(',')}</div>
      <button onClick={() => onRoleSelect('patient', 'Taylor')}>Choose patient</button>
      <button onClick={() => onRoleSelect('caregiver', 'Morgan')}>Choose caregiver</button>
    </div>
  ),
}));

vi.mock('../../app/components/ThemeSwitcher', () => ({
  ThemeSwitcher: ({
    currentTheme,
    onRequestClose,
  }: {
    currentTheme: string;
    onRequestClose: () => void;
  }) => (
    <div data-testid="theme-switcher">
      <span>{currentTheme}</span>
      <button onClick={onRequestClose}>Close theme switcher</button>
    </div>
  ),
}));

vi.mock('../../app/routes', () => ({
  createAppRouter: (...args: unknown[]) => createAppRouterMock(...args),
}));

vi.mock('../../app/contexts/UserContext', () => ({
  UserProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="user-provider">{children}</div>
  ),
  useUser: () => ({
    setUserRole: setUserRoleMock,
    setUserName: setUserNameMock,
  }),
}));

describe('App', () => {
  beforeEach(() => {
    vi.useRealTimers();
    document.body.className = '';
    localStorage.clear();

    setUserRoleMock.mockReset();
    setUserNameMock.mockReset();
    routerNavigateMock.mockReset();
    routerNavigateMock.mockResolvedValue(undefined);

    createAppRouterMock.mockReset();
    createAppRouterMock.mockReturnValue({
      id: 'mock-router',
      navigate: routerNavigateMock,
    });

    menuCommandHandler = undefined;

    window.electronAPI = {
      openFile: vi.fn().mockResolvedValue({ canceled: false, filePath: 'care-plan.json' }),
      saveFile: vi.fn().mockResolvedValue({ canceled: false, filePath: 'save.json' }),
      notify: vi.fn().mockResolvedValue({ shown: true }),
      onMenuCommand: vi.fn((callback: (command: string) => Promise<void> | void) => {
        menuCommandHandler = callback;
        return unsubscribeMock;
      }),
    };
  });

  it('renders the welcome screen by default and applies the warm theme', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'Start welcome flow' })).toBeInTheDocument();
    expect(document.body).toHaveClass('warm');
    expect(createAppRouterMock).toHaveBeenCalledWith(expect.any(Function), 'warm', expect.any(Function));
  });

  it('moves from welcome to login and supports going back', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    expect(screen.getByRole('button', { name: 'Back to welcome' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back to welcome' }));
    expect(screen.getByRole('button', { name: 'Start welcome flow' })).toBeInTheDocument();
  });

  it('falls back to both roles and enters the dashboard after role selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    await user.click(screen.getByRole('button', { name: 'Login with default roles' }));

    expect(screen.getByTestId('allowed-roles')).toHaveTextContent('caregiver,patient');

    await user.click(screen.getByRole('button', { name: 'Choose patient' }));

    expect(screen.getByTestId('user-provider')).toBeInTheDocument();
    expect(screen.getByTestId('router-provider')).toHaveTextContent('mock-router');
    expect(setUserRoleMock).toHaveBeenCalledWith('patient');
    expect(setUserNameMock).toHaveBeenCalledWith('Taylor');
  });

  it('uses explicit roles from login when provided', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    await user.click(screen.getByRole('button', { name: 'Login with patient role' }));

    expect(screen.getByTestId('allowed-roles')).toHaveTextContent('patient');
  });

  it('cycles themes with Alt+T, can change theme through the router callback, and closes the switcher', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    await user.click(screen.getByRole('button', { name: 'Login with default roles' }));
    await user.click(screen.getByRole('button', { name: 'Choose caregiver' }));

    fireEvent.keyDown(window, { key: 't', altKey: true });
    expect(screen.getByTestId('theme-switcher')).toHaveTextContent('medical');
    expect(document.body).toHaveClass('medical');

    await user.click(screen.getByRole('button', { name: 'Close theme switcher' }));
    expect(screen.queryByTestId('theme-switcher')).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: 't', altKey: true });

    const onThemeChange = createAppRouterMock.mock.calls.at(-1)?.[0] as (theme: string) => void;
    act(() => onThemeChange('dark'));

    expect(document.body).toHaveClass('dark');
    expect(screen.queryByTestId('theme-switcher')).not.toBeInTheDocument();
  });

  it('hides the theme switcher after the timeout and handles Escape on login', async () => {
    vi.useFakeTimers();
    const view = render(<App />);

    fireEvent.keyDown(window, { key: 't', altKey: true });
    expect(document.body).toHaveClass('medical');

    fireEvent.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    fireEvent.click(screen.getByRole('button', { name: 'Login with default roles' }));
    fireEvent.click(screen.getByRole('button', { name: 'Choose caregiver' }));

    fireEvent.keyDown(window, { key: 't', altKey: true });
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(6000);
    });
    expect(screen.queryByTestId('theme-switcher')).not.toBeInTheDocument();

    view.unmount();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    expect(screen.getByRole('button', { name: 'Back to welcome' })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Start welcome flow' })).toBeInTheDocument();
  });

  it('handles Electron menu commands for files, navigation, help, and logout', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start welcome flow' }));
    await user.click(screen.getByRole('button', { name: 'Login with default roles' }));
    await user.click(screen.getByRole('button', { name: 'Choose caregiver' }));

    localStorage.setItem('careconnect-tabs', 'tabs');
    localStorage.setItem('careconnect-active-tab', 'active');

    expect(menuCommandHandler).toBeTypeOf('function');

    await act(async () => {
      await menuCommandHandler?.('file:new-care-plan');
      await menuCommandHandler?.('file:open');
      await menuCommandHandler?.('file:save');
      await menuCommandHandler?.('view:settings');
      await menuCommandHandler?.('help:docs');
      await menuCommandHandler?.('help:shortcuts');
      await menuCommandHandler?.('help:about');
      await menuCommandHandler?.('app:logout');
      await menuCommandHandler?.('unknown:command');
    });

    await waitFor(() => {
      expect(routerNavigateMock).toHaveBeenCalledWith('/dashboard/medications');
    });

    expect(window.electronAPI?.openFile).toHaveBeenCalled();
    expect(window.electronAPI?.notify).toHaveBeenCalledWith('Opened file', 'care-plan.json');
    expect(window.electronAPI?.saveFile).toHaveBeenCalledWith(
      JSON.stringify({ theme: 'warm', userRole: 'caregiver', userName: 'Morgan' }, null, 2)
    );
    expect(window.electronAPI?.notify).toHaveBeenCalledWith('Saved file', 'save.json');
    expect(routerNavigateMock).toHaveBeenCalledWith('/dashboard/settings');
    expect(routerNavigateMock).toHaveBeenCalledWith('/dashboard/help');
    expect(routerNavigateMock).toHaveBeenCalledWith('/dashboard/shortcuts');
    expect(window.electronAPI?.notify).toHaveBeenCalledWith(
      'CareConnect Desktop',
      'Electron desktop application'
    );

    expect(localStorage.getItem('careconnect-tabs')).toBeNull();
    expect(localStorage.getItem('careconnect-active-tab')).toBeNull();
    expect(screen.getByRole('button', { name: 'Back to welcome' })).toBeInTheDocument();
  });
});
