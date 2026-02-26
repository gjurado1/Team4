import { render, screen, act } from '@testing-library/react';
import { ScreenReaderAnnouncer, announce } from '../../app/components/ScreenReaderAnnouncer';
import { vi } from 'vitest';

const STORAGE_KEY = 'careconnect-screen-reader-enabled';

describe('ScreenReaderAnnouncer', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('renders a live region with role status', () => {
    render(<ScreenReaderAnnouncer />);
    const liveRegion = document.querySelector('[role="status"][aria-live]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('has aria-live polite by default', () => {
    render(<ScreenReaderAnnouncer />);
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('shows announcement when screen-reader-announce event is dispatched', async () => {
    render(<ScreenReaderAnnouncer />);
    await act(() => {
      window.dispatchEvent(
        new CustomEvent('screen-reader-announce', { detail: { message: 'Test announcement', priority: 'polite' } }),
      );
    });
    expect(await screen.findByText('Test announcement')).toBeInTheDocument();
  });

  it('announce() dispatches custom event', () => {
    const spy = vi.spyOn(window, 'dispatchEvent');
    announce('Hello');
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'screen-reader-announce',
        detail: { message: 'Hello', priority: 'polite' },
      }),
    );
    spy.mockRestore();
  });

  it('announce() with assertive priority', () => {
    const spy = vi.spyOn(window, 'dispatchEvent');
    announce('Urgent', 'assertive');
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { message: 'Urgent', priority: 'assertive' },
      }),
    );
    spy.mockRestore();
  });

  it('does not announce when screen reader is disabled via localStorage', () => {
    localStorage.setItem('careconnect-screen-reader-enabled', 'false');
    const spy = vi.spyOn(window, 'dispatchEvent');
    announce('Should not show');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
    localStorage.removeItem('careconnect-screen-reader-enabled');
  });

  it('sets aria-live to off when screen reader is disabled', () => {
    localStorage.setItem('careconnect-screen-reader-enabled', 'false');
    const { unmount } = render(<ScreenReaderAnnouncer />);
    const liveRegion = document.querySelector('[aria-live="off"]');
    expect(liveRegion).toBeInTheDocument();
    unmount();
    localStorage.removeItem('careconnect-screen-reader-enabled');
  });

  it('updates when accessibility-setting-change event is dispatched', async () => {
    render(<ScreenReaderAnnouncer />);
    await act(() => {
      window.dispatchEvent(
        new CustomEvent('accessibility-setting-change', {
          detail: { key: 'careconnect-screen-reader-enabled', value: false },
        }),
      );
    });
    expect(document.querySelector('[aria-live="off"]')).toBeInTheDocument();
  });

  it('ignores accessibility-setting-change for other keys', async () => {
    render(<ScreenReaderAnnouncer />);
    await act(() => {
      window.dispatchEvent(
        new CustomEvent('accessibility-setting-change', {
          detail: { key: 'other-key', value: 'x' },
        }),
      );
    });
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
});
