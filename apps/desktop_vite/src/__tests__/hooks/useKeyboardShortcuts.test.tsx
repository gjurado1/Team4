import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalPlatform = window.navigator.platform;

async function loadModuleForPlatform(platform: string) {
  vi.resetModules();
  Object.defineProperty(window.navigator, 'platform', {
    value: platform,
    configurable: true,
  });

  return import('../../app/hooks/useKeyboardShortcuts');
}

describe('useKeyboardShortcuts', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, 'platform', {
      value: originalPlatform,
      configurable: true,
    });
  });

  it('formats shortcuts for non-Mac platforms', async () => {
    const mod = await loadModuleForPlatform('Win32');

    expect(
      mod.formatShortcut({
        key: 'ArrowUp',
        ctrl: true,
        alt: true,
        shift: true,
        action: vi.fn(),
        description: 'Move up',
        category: 'Navigation',
      })
    ).toBe('Ctrl+Alt+Shift+\u2191');

    expect(
      mod.formatShortcut({
        key: 'Escape',
        action: vi.fn(),
        description: 'Close',
        category: 'Navigation',
      })
    ).toBe('Esc');

    expect(
      mod.formatShortcut({
        key: ' ',
        action: vi.fn(),
        description: 'Space',
        category: 'Navigation',
      })
    ).toBe('Space');
  });

  it('formats shortcuts for Mac platforms using symbols', async () => {
    const mod = await loadModuleForPlatform('MacIntel');

    expect(
      mod.formatShortcut({
        key: 'Enter',
        ctrl: true,
        alt: true,
        shift: true,
        action: vi.fn(),
        description: 'Submit',
        category: 'Navigation',
      })
    ).toBe('\u2318\u2325\u21e7\u21b5');
  });

  it('runs the matching shortcut action and prevents default', async () => {
    const mod = await loadModuleForPlatform('Win32');
    const action = vi.fn();
    const preventDefault = vi.fn();

    renderHook(() =>
      mod.useKeyboardShortcuts([
        {
          key: 'k',
          ctrl: true,
          action,
          description: 'Do thing',
          category: 'General',
        },
      ])
    );

    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    Object.defineProperty(event, 'preventDefault', { value: preventDefault });
    window.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('does not run shortcuts when the hook is disabled', async () => {
    const mod = await loadModuleForPlatform('Win32');
    const action = vi.fn();

    renderHook(() =>
      mod.useKeyboardShortcuts(
        [
          {
            key: 'k',
            ctrl: true,
            action,
            description: 'Do thing',
            category: 'General',
          },
        ],
        false
      )
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));

    expect(action).not.toHaveBeenCalled();
  });

  it('matches modifier combinations exactly and exposes shortcut groups', async () => {
    const mod = await loadModuleForPlatform('Win32');
    const primary = vi.fn();
    const secondary = vi.fn();

    renderHook(() =>
      mod.useKeyboardShortcuts([
        {
          key: 'ArrowRight',
          action: primary,
          description: 'Next',
          category: 'Navigation',
        },
        {
          key: '/',
          ctrl: true,
          shift: true,
          action: secondary,
          description: 'Help',
          category: 'Help',
        },
      ])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '/', ctrlKey: true, shiftKey: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '/', ctrlKey: true }));

    expect(primary).toHaveBeenCalledTimes(1);
    expect(secondary).toHaveBeenCalledTimes(1);
    expect(mod.globalShortcuts.length).toBeGreaterThan(10);
    expect(mod.navigationShortcuts.length).toBe(10);
    expect(mod.radialMenuShortcuts.length).toBe(10);
  });
});
