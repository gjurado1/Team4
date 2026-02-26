import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatusBar } from '../../app/components/StatusBar';

describe('StatusBar', () => {
  it('renders with role and aria-label', () => {
    render(<StatusBar />);
    expect(screen.getByRole('status', { name: 'Application status bar' })).toBeInTheDocument();
  });

  it('shows connection and sync status', () => {
    render(<StatusBar />);
    expect(screen.getByLabelText('Connection status')).toHaveTextContent('Connected');
    expect(screen.getByLabelText('Sync status')).toHaveTextContent('Synced 2m ago');
  });

  it('shows keyboard shortcuts hint', () => {
    render(<StatusBar />);
    expect(screen.getByLabelText('Keyboard shortcuts hint')).toHaveTextContent(/F1 for help/);
    expect(screen.getByLabelText('Keyboard shortcuts hint')).toHaveTextContent(/Ctrl\+/);
  });

  it('shows default zoom 100%', () => {
    render(<StatusBar />);
    expect(screen.getByLabelText('Zoom level 100 percent')).toBeInTheDocument();
    expect(screen.getByText('Zoom 100%')).toBeVisible();
  });

  it('shows custom zoom when provided', () => {
    render(<StatusBar zoom={125} />);
    expect(screen.getByLabelText('Zoom level 125 percent')).toBeInTheDocument();
    expect(screen.getByText('Zoom 125%')).toBeVisible();
  });

  it('zoom button has hover and focus styles', async () => {
    const user = userEvent.setup();
    render(<StatusBar />);
    const zoomButton = screen.getByLabelText('Zoom level 100 percent');
    await user.hover(zoomButton);
    expect(zoomButton.style.backgroundColor).toBe('var(--toolbar-hover-bg)');
    await user.unhover(zoomButton);
    expect(zoomButton.style.backgroundColor).toBe('transparent');
    zoomButton.focus();
    expect(zoomButton.style.outline).toContain('solid');
    zoomButton.blur();
    expect(zoomButton.style.outline).toBe('none');
  });
});
