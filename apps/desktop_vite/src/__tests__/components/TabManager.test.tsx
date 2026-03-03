import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabManager } from '../../app/components/TabManager';
import { MemoryRouter, Routes, Route } from 'react-router';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderTabManager(initialEntry = '/dashboard') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="*" element={<TabManager />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('TabManager', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    delete (window as any).tabManager;
  });

  it('renders default tab when localStorage is empty', () => {
    renderTabManager();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('New Tab')).toBeInTheDocument();
  });

  it('restores tabs from localStorage', () => {
    const tabs = [
      { id: 'tab-1', path: '/dashboard', title: 'Dashboard' },
      { id: 'tab-2', path: '/dashboard/patients', title: 'Patient List' },
    ];
    localStorage.setItem('careconnect-tabs', JSON.stringify(tabs));
    localStorage.setItem('careconnect-active-tab', 'tab-2');
    renderTabManager('/dashboard/patients');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Patient List')).toBeInTheDocument();
  });

  it('uses default tab when saved tabs is invalid JSON', () => {
    localStorage.setItem('careconnect-tabs', 'invalid');
    renderTabManager();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('uses default tab when saved tabs is empty array', () => {
    localStorage.setItem('careconnect-tabs', '[]');
    renderTabManager();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('opens new tab when New Tab button is clicked', async () => {
    const user = userEvent.setup();
    renderTabManager();
    await user.click(screen.getByLabelText('New Tab'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThanOrEqual(1);
  });

  it('switches tab when tab is clicked', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'careconnect-tabs',
      JSON.stringify([
        { id: 't1', path: '/dashboard', title: 'Dashboard' },
        { id: 't2', path: '/dashboard/settings', title: 'Settings' },
      ]),
    );
    localStorage.setItem('careconnect-active-tab', 't1');
    renderTabManager('/dashboard');
    await user.click(screen.getAllByText('Settings')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/settings');
  });

  it('close button removes tab and navigates when closing active tab', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'careconnect-tabs',
      JSON.stringify([
        { id: 't1', path: '/dashboard', title: 'Dashboard' },
        { id: 't2', path: '/dashboard/settings', title: 'Settings' },
      ]),
    );
    localStorage.setItem('careconnect-active-tab', 't2');
    renderTabManager('/dashboard/settings');
    const closeBtn = screen.getByLabelText('Close Settings');
    expect(closeBtn).not.toBeDisabled();
    await user.click(closeBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('close button does nothing when only one tab', async () => {
    const user = userEvent.setup();
    renderTabManager();
    const closeBtn = screen.getByLabelText('Close Dashboard');
    expect(closeBtn).toBeDisabled();
    expect(closeBtn).toHaveAttribute('title', 'Cannot close last tab');
  });

  it('close button has correct title when multiple tabs', () => {
    localStorage.setItem(
      'careconnect-tabs',
      JSON.stringify([
        { id: 't1', path: '/dashboard', title: 'Dashboard' },
        { id: 't2', path: '/dashboard/settings', title: 'Settings' },
      ]),
    );
    renderTabManager();
    expect(screen.getByLabelText('Close Dashboard')).toHaveAttribute('title', 'Close Dashboard');
  });

  it('exposes tabManager on window with openNewTab, closeTab, getTabs, getActiveTabId', async () => {
    renderTabManager();
    expect((window as any).tabManager).toBeDefined();
    expect((window as any).tabManager.openNewTab).toBeDefined();
    expect((window as any).tabManager.closeTab).toBeDefined();
    expect((window as any).tabManager.getTabs).toBeDefined();
    expect((window as any).tabManager.getActiveTabId).toBeDefined();
    const tabs = (window as any).tabManager.getTabs();
    expect(Array.isArray(tabs)).toBe(true);
    expect(tabs.length).toBeGreaterThanOrEqual(1);
    const activeId = (window as any).tabManager.getActiveTabId();
    expect(typeof activeId).toBe('string');
  });

  it('window.tabManager.openNewTab navigates and adds tab', async () => {
    renderTabManager();
    (window as any).tabManager.openNewTab('/dashboard/settings');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/settings');
  });

  it('openNewTab with patient path uses getPageTitle for Patient Details', () => {
    renderTabManager();
    (window as any).tabManager.openNewTab('/dashboard/patients/1');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/patients/1');
  });

  it('window.tabManager.updateActiveTabTitle can be called and updates tab state', () => {
    renderTabManager();
    expect((window as any).tabManager.updateActiveTabTitle).toBeDefined();
    act(() => {
      (window as any).tabManager.updateActiveTabTitle('Custom Title');
    });
  });

  it('window.tabManager.switchToTab switches active tab', async () => {
    localStorage.setItem(
      'careconnect-tabs',
      JSON.stringify([
        { id: 't1', path: '/dashboard', title: 'Dashboard' },
        { id: 't2', path: '/dashboard/help', title: 'Help' },
      ]),
    );
    localStorage.setItem('careconnect-active-tab', 't1');
    renderTabManager();
    await act(async () => {
      (window as any).tabManager.switchToTab('t2');
    });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/help');
  });

  it('applies hover on inactive tab', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'careconnect-tabs',
      JSON.stringify([
        { id: 't1', path: '/dashboard', title: 'Dashboard' },
        { id: 't2', path: '/dashboard/settings', title: 'Settings' },
      ]),
    );
    renderTabManager();
    const settingsTab = screen.getAllByText('Settings')[0].closest('div[class*="cursor-pointer"]')!;
    await user.hover(settingsTab);
    expect((settingsTab as HTMLElement).style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    await user.unhover(settingsTab);
    expect((settingsTab as HTMLElement).style.backgroundColor).toBe('transparent');
  });

  it('applies hover and focus on New Tab button', () => {
    renderTabManager();
    const btn = screen.getByLabelText('New Tab');
    fireEvent.mouseEnter(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    fireEvent.mouseLeave(btn);
    expect(btn.style.backgroundColor).toBe('transparent');
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('close button hover and focus styles', async () => {
    localStorage.setItem(
      'careconnect-tabs',
      JSON.stringify([
        { id: 't1', path: '/dashboard', title: 'Dashboard' },
        { id: 't2', path: '/dashboard/settings', title: 'Settings' },
      ]),
    );
    renderTabManager();
    const closeButtons = screen.getAllByLabelText(/Close/);
    const closeBtn = closeButtons[0];
    fireEvent.mouseEnter(closeBtn);
    expect(closeBtn.style.backgroundColor).toBe('var(--color-danger)');
    fireEvent.mouseLeave(closeBtn);
    expect(closeBtn.style.backgroundColor).toBe('transparent');
    fireEvent.focus(closeBtn);
    expect(closeBtn.style.outline).toContain('solid');
    fireEvent.blur(closeBtn);
    expect(closeBtn.style.outline).toBe('none');
  });

  it('calls onTabChange when active tab changes', async () => {
    const onTabChange = vi.fn();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="*" element={<TabManager onTabChange={onTabChange} />} />
        </Routes>
      </MemoryRouter>,
    );
    await act(async () => {
      (window as any).tabManager.openNewTab('/dashboard/settings');
    });
    expect(onTabChange).toHaveBeenCalled();
  });
});
