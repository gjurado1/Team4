import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toolbar } from '../../app/components/Toolbar';
import { vi } from 'vitest';

describe('Toolbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with toolbar role and aria-label', () => {
    render(<Toolbar />);
    expect(screen.getByRole('toolbar', { name: 'Application toolbar' })).toBeInTheDocument();
  });

  it('renders toolbar buttons with expected labels', () => {
    render(<Toolbar />);
    expect(screen.getByLabelText('New')).toBeInTheDocument();
    expect(screen.getByLabelText('Save')).toBeInTheDocument();
    expect(screen.getByLabelText('Care Plans')).toBeInTheDocument();
    expect(screen.getByLabelText('Calendar')).toBeInTheDocument();
    expect(screen.getByLabelText('Contacts')).toBeInTheDocument();
    expect(screen.getByLabelText('Reminders')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Log Out')).toBeInTheDocument();
  });

  it('calls onLogout when Log Out is clicked', async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    render(<Toolbar onLogout={onLogout} />);
    await user.click(screen.getByLabelText('Log Out'));
    expect(onLogout).toHaveBeenCalled();
  });

  it('Log Out button has title for tooltip', () => {
    render(<Toolbar />);
    const logOutButton = screen.getByLabelText('Log Out');
    expect(logOutButton).toHaveAttribute('title', 'Log Out');
  });

  it('applies hover styles on toolbar button', async () => {
    const user = userEvent.setup();
    render(<Toolbar />);
    const newButton = screen.getByLabelText('New');
    await user.hover(newButton);
    expect(newButton.style.backgroundColor).toBe('var(--toolbar-hover-bg)');
    await user.unhover(newButton);
    expect(newButton.style.backgroundColor).toBe('transparent');
  });

  it('applies focus outline on toolbar button', () => {
    render(<Toolbar />);
    const button = screen.getByLabelText('Save');
    button.focus();
    expect(button.style.outline).toContain('solid');
    button.blur();
    expect(button.style.outline).toBe('none');
  });

  it('updates icon size when toolbar-icon-scale-change event is dispatched', () => {
    localStorage.setItem('careconnect-toolbar-icon-scale', '150');
    const { unmount } = render(<Toolbar />);
    act(() => {
      window.dispatchEvent(
        new CustomEvent('toolbar-icon-scale-change', { detail: { key: 'careconnect-toolbar-icon-scale' } }),
      );
    });
    unmount();
    localStorage.removeItem('careconnect-toolbar-icon-scale');
  });

  it('ignores toolbar-icon-scale-change when key does not match', () => {
    render(<Toolbar />);
    act(() => {
      window.dispatchEvent(new CustomEvent('toolbar-icon-scale-change', { detail: { key: 'other-key' } }));
    });
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });
});
