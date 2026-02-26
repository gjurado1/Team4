import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuBar } from '../../app/components/MenuBar';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderMenuBar(props?: {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
  onLogout?: () => void;
}) {
  return render(
    <MemoryRouter>
      <MenuBar {...props} />
    </MemoryRouter>,
  );
}

describe('MenuBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders menubar with File, Edit, View, Tools, Help', () => {
    renderMenuBar();
    expect(screen.getByRole('menubar', { name: 'Main menu' })).toBeInTheDocument();
    expect(screen.getByLabelText('File menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Edit menu')).toBeInTheDocument();
    expect(screen.getByLabelText('View menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Tools menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Help menu')).toBeInTheDocument();
  });

  it('opens File menu and shows items when File is focused', async () => {
    renderMenuBar();
    const fileButton = screen.getByLabelText('File menu');
    await act(async () => {
      fileButton.focus();
    });
    expect(await screen.findByRole('menu', { name: 'File submenu' })).toBeInTheDocument();
    expect(screen.getByText('New Care Plan')).toBeVisible();
    expect(screen.getByText('Logout')).toBeVisible();
  });

  it('navigates to /dashboard/my-care when New Care Plan is clicked', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('File menu').focus();
    });
    await screen.findByRole('menu', { name: 'File submenu' });
    await user.click(screen.getByText('New Care Plan'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/my-care');
  });

  it('calls onLogout when Logout is clicked', async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    renderMenuBar({ onLogout });
    await act(async () => {
      screen.getByLabelText('File menu').focus();
    });
    await screen.findByRole('menu', { name: 'File submenu' });
    await user.click(screen.getByText('Logout'));
    expect(onLogout).toHaveBeenCalled();
  });

  it('navigates to /dashboard/settings when Settings is clicked from Tools', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('Tools menu').focus();
    });
    await screen.findByRole('menu', { name: 'Tools submenu' });
    await user.click(screen.getByText('Settings'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/settings');
  });

  it('navigates to /dashboard/help when Documentation is clicked from Help', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('Help menu').focus();
    });
    await screen.findByRole('menu', { name: 'Help submenu' });
    await user.click(screen.getByText('Documentation'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/help');
  });

  it('navigates to /dashboard/shortcuts when Keyboard Shortcuts is clicked', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('Help menu').focus();
    });
    await screen.findByRole('menu', { name: 'Help submenu' });
    await user.click(screen.getByText('Keyboard Shortcuts'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/shortcuts');
  });

  it('closes menu when clicking same menu button again', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    const fileButton = screen.getByLabelText('File menu');
    await act(async () => {
      fileButton.focus();
    });
    expect(await screen.findByRole('menu', { name: 'File submenu' })).toBeInTheDocument();
    await user.click(fileButton);
    expect(screen.queryByRole('menu', { name: 'File submenu' })).not.toBeInTheDocument();
  });

  it('closes menu on Escape key', async () => {
    renderMenuBar();
    const fileButton = screen.getByLabelText('File menu');
    await act(async () => {
      fileButton.focus();
    });
    expect(await screen.findByRole('menu', { name: 'File submenu' })).toBeInTheDocument();
    fireEvent.keyDown(fileButton, { key: 'Escape' });
    expect(screen.queryByRole('menu', { name: 'File submenu' })).not.toBeInTheDocument();
  });

  it('toggles menu on Enter key', async () => {
    renderMenuBar();
    const fileButton = screen.getByLabelText('File menu');
    await act(async () => {
      fileButton.focus();
    });
    expect(await screen.findByRole('menu', { name: 'File submenu' })).toBeInTheDocument();
    fireEvent.keyDown(fileButton, { key: 'Enter' });
    expect(screen.queryByRole('menu', { name: 'File submenu' })).not.toBeInTheDocument();
    fireEvent.keyDown(fileButton, { key: 'Enter' });
    expect(await screen.findByRole('menu', { name: 'File submenu' })).toBeInTheDocument();
  });

  it('switches to Edit menu when hovering Edit while File is open', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('File menu').focus();
    });
    await screen.findByRole('menu', { name: 'File submenu' });
    await user.hover(screen.getByLabelText('Edit menu'));
    expect(screen.getByRole('menu', { name: 'Edit submenu' })).toBeInTheDocument();
    expect(screen.queryByRole('menu', { name: 'File submenu' })).not.toBeInTheDocument();
  });

  it('applies hover styles on menu item', async () => {
    const user = userEvent.setup();
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('File menu').focus();
    });
    const newCarePlan = await screen.findByText('New Care Plan');
    const menuitem = newCarePlan.closest('[role="menuitem"]')!;
    await user.hover(menuitem);
    expect((menuitem as HTMLElement).style.backgroundColor).toBe('var(--menu-hover-bg)');
    await user.unhover(menuitem);
    expect((menuitem as HTMLElement).style.backgroundColor).toBe('transparent');
  });

  it('renders menu item with shortcut in aria-label', async () => {
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('File menu').focus();
    });
    const item = await screen.findByRole('menuitem', { name: /New Care Plan.*Ctrl\+N/ });
    expect(item).toBeInTheDocument();
  });

  it('Ctrl+N navigates to my-care (keyboard shortcut)', () => {
    renderMenuBar();
    fireEvent.keyDown(window, { key: 'n', ctrlKey: true });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/my-care');
  });

  it('Ctrl+L calls onLogout (keyboard shortcut)', () => {
    const onLogout = vi.fn();
    renderMenuBar({ onLogout });
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true });
    expect(onLogout).toHaveBeenCalled();
  });

  it('Ctrl+, navigates to settings (keyboard shortcut)', () => {
    renderMenuBar();
    fireEvent.keyDown(window, { key: ',', ctrlKey: true });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/settings');
  });

  it('F1 navigates to help (keyboard shortcut)', () => {
    renderMenuBar();
    fireEvent.keyDown(window, { key: 'F1' });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/help');
  });

  it('Ctrl+/ navigates to shortcuts (keyboard shortcut)', () => {
    renderMenuBar();
    fireEvent.keyDown(window, { key: '/', ctrlKey: true });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/shortcuts');
  });

  it('does not trigger zoom shortcut when focus is in an input', () => {
    renderMenuBar();
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const zoomBefore = document.body.style.zoom || '1';
    fireEvent.keyDown(input, { key: '=', ctrlKey: true });
    expect(document.body.style.zoom || '1').toBe(zoomBefore);
    document.body.removeChild(input);
  });

  it('Ctrl+= zooms in (keyboard shortcut)', () => {
    document.body.style.zoom = '1';
    renderMenuBar();
    fireEvent.keyDown(window, { key: '=', ctrlKey: true });
    expect(document.body.style.zoom).toBe('1.1');
  });

  it('Ctrl+- zooms out (keyboard shortcut)', () => {
    document.body.style.zoom = '1';
    renderMenuBar();
    fireEvent.keyDown(window, { key: '-', ctrlKey: true });
    expect(document.body.style.zoom).toBe('0.9');
  });

  it('Ctrl+0 resets zoom (keyboard shortcut)', () => {
    document.body.style.zoom = '1.5';
    renderMenuBar();
    fireEvent.keyDown(window, { key: '0', ctrlKey: true });
    expect(document.body.style.zoom).toBe('1');
  });

  it('menu item blur removes outline', async () => {
    renderMenuBar();
    await act(async () => {
      screen.getByLabelText('File menu').focus();
    });
    const newCarePlan = await screen.findByText('New Care Plan');
    const menuitem = newCarePlan.closest('[role="menuitem"]')!;
    (menuitem as HTMLElement).focus();
    expect((menuitem as HTMLElement).style.outline).toContain('solid');
    (menuitem as HTMLElement).blur();
    expect((menuitem as HTMLElement).style.outline).toBe('none');
  });
});
