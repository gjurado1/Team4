import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardLayout } from '../../app/components/DashboardLayout';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
const mockPrint = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../../app/components/Toolbar', () => ({
  Toolbar: ({ onLogout }: { onLogout?: () => void }) => (
    <div data-testid="toolbar">
      <button type="button" onClick={onLogout}>
        Log Out
      </button>
    </div>
  ),
}));
vi.mock('../../app/components/StatusBar', () => ({
  StatusBar: () => <div data-testid="status-bar">StatusBar</div>,
}));
vi.mock('../../app/components/RadialMenu', () => ({
  RadialMenu: () => <div data-testid="radial-menu">RadialMenu</div>,
}));
vi.mock('../../app/components/TabManager', () => ({
  TabManager: () => <div data-testid="tab-manager">TabManager</div>,
}));
vi.mock('../../app/components/SkipLinks', () => ({
  SkipLinks: () => <div data-testid="skip-links">SkipLinks</div>,
}));
vi.mock('../../app/components/ScreenReaderAnnouncer', () => ({
  ScreenReaderAnnouncer: () => <div data-testid="screen-reader-announcer">ScreenReaderAnnouncer</div>,
}));

describe('DashboardLayout', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockPrint.mockClear();
    Object.defineProperty(window, 'print', { value: mockPrint, writable: true });
    (window as any).tabManager = {
      openNewTab: vi.fn(),
      getActiveTabId: vi.fn(() => 'tab-1'),
      closeTab: vi.fn(),
    };
  });

  afterEach(() => {
    delete (window as any).tabManager;
  });

  it('renders layout with SkipLinks, Toolbar, TabManager, RadialMenu, StatusBar', () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('skip-links')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('tab-manager')).toBeInTheDocument();
    expect(screen.getByTestId('radial-menu')).toBeInTheDocument();
    expect(screen.getByTestId('status-bar')).toBeInTheDocument();
    expect(screen.getByRole('main', { name: 'Main content area' })).toBeInTheDocument();
  });

  it('passes onLogout to Toolbar and calls it when Log Out is clicked', async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <DashboardLayout onLogout={onLogout} />
      </MemoryRouter>,
    );
    await user.click(screen.getByText('Log Out'));
    expect(onLogout).toHaveBeenCalled();
  });

  it('Ctrl+P triggers window.print', async () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}p{/Control}');
    expect(mockPrint).toHaveBeenCalled();
  });

  it('Ctrl+T calls tabManager.openNewTab with /dashboard', async () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}t{/Control}');
    expect((window as any).tabManager.openNewTab).toHaveBeenCalledWith('/dashboard');
  });

  it('Ctrl+W calls tabManager.closeTab for active tab', async () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}w{/Control}');
    expect((window as any).tabManager.getActiveTabId).toHaveBeenCalled();
    expect((window as any).tabManager.closeTab).toHaveBeenCalledWith('tab-1');
  });

  it('Ctrl+/ navigates to /dashboard/shortcuts', async () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}/{/Control}');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/shortcuts');
  });

  it('Ctrl+, navigates to /dashboard/settings', async () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>},{/Control}');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/settings');
  });

  it('Ctrl+L calls onLogout', async () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <DashboardLayout onLogout={onLogout} />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}l{/Control}');
    expect(onLogout).toHaveBeenCalled();
  });

  it('F1 navigates to /dashboard/help', () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    fireEvent.keyDown(window, { key: 'F1' });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/help');
  });

  it('other shortcut triggers console.log (fallback branch)', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}n{/Control}');
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/Shortcut triggered/));
    logSpy.mockRestore();
  });

  it('Ctrl+T does nothing when tabManager is missing', async () => {
    delete (window as any).tabManager;
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}t{/Control}');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Ctrl+W does nothing when tabManager is missing', async () => {
    delete (window as any).tabManager;
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>,
    );
    await userEvent.keyboard('{Control>}w{/Control}');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
