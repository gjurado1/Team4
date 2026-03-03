import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { Dialog, DialogExamples } from '../../app/components/DialogExample';
import { vi } from 'vitest';

describe('Dialog', () => {
  it('returns null when isOpen is false', () => {
    const { container } = render(
      <Dialog isOpen={false} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders backdrop and dialog when isOpen is true', () => {
    render(
      <Dialog isOpen={true} onClose={vi.fn()} title="Test Title">
        <p>Dialog content</p>
      </Dialog>,
    );
    expect(screen.getByRole('dialog', { name: 'Test Title' })).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    const backdrop = document.querySelector('[aria-hidden="true"]')!;
    await user.click(backdrop as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    await user.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders destructive variant with error border and AlertTriangle', () => {
    render(
      <Dialog isOpen={true} onClose={vi.fn()} title="Delete" variant="destructive">
        <p>Are you sure?</p>
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.border).toContain('var(--color-error)');
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders default variant without error border', () => {
    render(
      <Dialog isOpen={true} onClose={vi.fn()} title="Default" variant="default">
        <p>Content</p>
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.border).not.toContain('var(--color-error)');
  });

  it('renders actions when provided', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={vi.fn()}
        title="Test"
        actions={<button type="button">Submit</button>}
      >
        <p>Content</p>
      </Dialog>,
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('does not render actions section when actions is undefined', () => {
    render(
      <Dialog isOpen={true} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument();
  });

  it('applies hover and blur on close button', async () => {
    const user = userEvent.setup();
    render(
      <Dialog isOpen={true} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    const closeBtn = screen.getByLabelText('Close dialog');
    await user.hover(closeBtn);
    expect(closeBtn.style.backgroundColor).toBe('var(--menu-hover-bg)');
    expect(closeBtn.style.color).toBe('var(--color-text)');
    await user.unhover(closeBtn);
    expect(closeBtn.style.backgroundColor).toBe('transparent');
    expect(closeBtn.style.color).toBe('var(--color-text-muted)');
  });

  it('applies focus and blur outline on close button', () => {
    render(
      <Dialog isOpen={true} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </Dialog>,
    );
    const closeBtn = screen.getByLabelText('Close dialog');
    fireEvent.focus(closeBtn);
    expect(closeBtn.style.outline).toContain('solid');
    fireEvent.blur(closeBtn);
    expect(closeBtn.style.outline).toBe('none');
  });

  it('traps focus: Tab on last focusable moves to first', async () => {
    vi.useFakeTimers();
    render(
      <Dialog
        isOpen={true}
        onClose={vi.fn()}
        title="Test"
        actions={
          <>
            <button type="button">Cancel</button>
            <button type="button">OK</button>
          </>
        }
      >
        <p>Content</p>
      </Dialog>,
    );
    await vi.advanceTimersByTimeAsync(150);
    const closeBtn = screen.getByLabelText('Close dialog');
    const ok = screen.getByRole('button', { name: 'OK' });
    ok.focus();
    expect(document.activeElement).toBe(ok);
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(closeBtn);
    vi.useRealTimers();
  });

  it('traps focus: Shift+Tab on first focusable moves to last', async () => {
    vi.useFakeTimers();
    render(
      <Dialog
        isOpen={true}
        onClose={vi.fn()}
        title="Test"
        actions={
          <>
            <button type="button">Cancel</button>
            <button type="button">OK</button>
          </>
        }
      >
        <p>Content</p>
      </Dialog>,
    );
    await vi.advanceTimersByTimeAsync(150);
    const closeBtn = screen.getByLabelText('Close dialog');
    const ok = screen.getByRole('button', { name: 'OK' });
    closeBtn.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(ok);
    vi.useRealTimers();
  });
});

describe('DialogExamples', () => {
  it('renders title and three trigger buttons', () => {
    render(<DialogExamples />);
    expect(screen.getByText('Dialog & Modal Examples')).toBeInTheDocument();
    expect(screen.getByText('Show Confirmation Dialog')).toBeInTheDocument();
    expect(screen.getByText('Show Destructive Dialog')).toBeInTheDocument();
    expect(screen.getByText('Show Preferences Dialog')).toBeInTheDocument();
  });

  it('opens confirmation dialog and closes via Cancel', async () => {
    const user = userEvent.setup();
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Confirmation Dialog'));
    expect(screen.getByRole('dialog', { name: 'Save Changes?' })).toBeInTheDocument();
    expect(screen.getByText(/Would you like to save them before closing/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog', { name: 'Save Changes?' })).not.toBeInTheDocument();
  });

  it('opens confirmation dialog and closes via Save Changes', async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Confirmation Dialog'));
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(logSpy).toHaveBeenCalledWith('Saved!');
    expect(screen.queryByRole('dialog', { name: 'Save Changes?' })).not.toBeInTheDocument();
    logSpy.mockRestore();
  });

  it('opens destructive dialog and closes via Cancel', async () => {
    const user = userEvent.setup();
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Destructive Dialog'));
    expect(screen.getByRole('dialog', { name: 'Delete Care Plan?' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog', { name: 'Delete Care Plan?' })).not.toBeInTheDocument();
  });

  it('opens destructive dialog and closes via Delete Permanently', async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Destructive Dialog'));
    await user.click(screen.getByRole('button', { name: 'Delete Permanently' }));
    expect(logSpy).toHaveBeenCalledWith('Deleted!');
    logSpy.mockRestore();
  });

  it('opens preferences dialog and renders checkboxes', () => {
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Preferences Dialog'));
    expect(screen.getByRole('dialog', { name: 'Preferences' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Enable notifications/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Play notification sounds/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start on system startup/)).toBeInTheDocument();
  });

  it('preferences dialog Close and Save Settings', async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Preferences Dialog'));
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog', { name: 'Preferences' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Show Preferences Dialog'));
    await user.click(screen.getByRole('button', { name: 'Save Settings' }));
    expect(logSpy).toHaveBeenCalledWith('Settings saved!');
    logSpy.mockRestore();
  });

  it('renders Dialog Features list', () => {
    render(<DialogExamples />);
    expect(screen.getByText('Dialog Features')).toBeInTheDocument();
    expect(screen.getByText(/Press ESC to close any dialog/)).toBeInTheDocument();
    expect(screen.getByText(/Backdrop click closes dialog/)).toBeInTheDocument();
  });

  it('applies hover on trigger buttons', () => {
    render(<DialogExamples />);
    const confirmBtn = screen.getByText('Show Confirmation Dialog').closest('button')!;
    fireEvent.mouseEnter(confirmBtn);
    expect(confirmBtn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    fireEvent.mouseLeave(confirmBtn);
    expect(confirmBtn.style.backgroundColor).toBe('var(--btn-primary-bg)');
  });

  it('applies hover on confirmation dialog Cancel and Save Changes buttons', () => {
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Confirmation Dialog'));
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const save = screen.getByRole('button', { name: 'Save Changes' });
    fireEvent.mouseEnter(cancel);
    expect(cancel.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    fireEvent.mouseLeave(cancel);
    expect(cancel.style.backgroundColor).toBe('var(--btn-secondary-bg)');
    fireEvent.mouseEnter(save);
    expect(save.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    fireEvent.mouseLeave(save);
    expect(save.style.backgroundColor).toBe('var(--btn-primary-bg)');
  });

  it('applies hover on destructive dialog Cancel and Delete Permanently buttons', () => {
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Destructive Dialog'));
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const deleteBtn = screen.getByRole('button', { name: 'Delete Permanently' });
    fireEvent.mouseEnter(cancel);
    expect(cancel.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    fireEvent.mouseLeave(cancel);
    expect(cancel.style.backgroundColor).toBe('var(--btn-secondary-bg)');
    fireEvent.mouseEnter(deleteBtn);
    expect(deleteBtn.style.backgroundColor).toBe('var(--btn-danger-hover-bg)');
    fireEvent.mouseLeave(deleteBtn);
    expect(deleteBtn.style.backgroundColor).toBe('var(--btn-danger-bg)');
  });

  it('applies hover on preferences dialog Close and Save Settings buttons', () => {
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Preferences Dialog'));
    const close = screen.getByRole('button', { name: 'Close' });
    const save = screen.getByRole('button', { name: 'Save Settings' });
    fireEvent.mouseEnter(close);
    expect(close.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    fireEvent.mouseLeave(close);
    expect(close.style.backgroundColor).toBe('var(--btn-secondary-bg)');
    fireEvent.mouseEnter(save);
    expect(save.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    fireEvent.mouseLeave(save);
    expect(save.style.backgroundColor).toBe('var(--btn-primary-bg)');
  });

  it('closes confirmation dialog via backdrop click (calls onClose)', async () => {
    const user = userEvent.setup();
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Confirmation Dialog'));
    expect(screen.getByRole('dialog', { name: 'Save Changes?' })).toBeInTheDocument();
    const backdrop = document.querySelector('[aria-hidden="true"]')!;
    await user.click(backdrop as HTMLElement);
    expect(screen.queryByRole('dialog', { name: 'Save Changes?' })).not.toBeInTheDocument();
  });

  it('closes destructive dialog via Escape (calls onClose)', () => {
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Destructive Dialog'));
    expect(screen.getByRole('dialog', { name: 'Delete Care Plan?' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Delete Care Plan?' })).not.toBeInTheDocument();
  });

  it('closes preferences dialog via close button (calls onClose)', async () => {
    const user = userEvent.setup();
    render(<DialogExamples />);
    fireEvent.click(screen.getByText('Show Preferences Dialog'));
    expect(screen.getByRole('dialog', { name: 'Preferences' })).toBeInTheDocument();
    await user.click(screen.getByLabelText('Close dialog'));
    expect(screen.queryByRole('dialog', { name: 'Preferences' })).not.toBeInTheDocument();
  });

  it('applies hover on Show Destructive Dialog and Show Preferences trigger buttons', () => {
    render(<DialogExamples />);
    const destructiveBtn = screen.getByText('Show Destructive Dialog').closest('button')!;
    fireEvent.mouseEnter(destructiveBtn);
    expect(destructiveBtn.style.backgroundColor).toBe('var(--btn-danger-hover-bg)');
    fireEvent.mouseLeave(destructiveBtn);
    expect(destructiveBtn.style.backgroundColor).toBe('var(--btn-danger-bg)');
    const prefsBtn = screen.getByText('Show Preferences Dialog').closest('button')!;
    fireEvent.mouseEnter(prefsBtn);
    expect(prefsBtn.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    fireEvent.mouseLeave(prefsBtn);
    expect(prefsBtn.style.backgroundColor).toBe('var(--btn-secondary-bg)');
  });
});
