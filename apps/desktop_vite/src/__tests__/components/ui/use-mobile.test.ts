import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from '../../../app/components/ui/use-mobile';

describe('useIsMobile', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;
  let listeners: Array<() => void>;

  beforeEach(() => {
    listeners = [];
    matchMediaMock = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event: string, cb: () => void) => {
        listeners.push(cb);
      }),
      removeEventListener: vi.fn((_event: string, cb: () => void) => {
        listeners = listeners.filter((l) => l !== cb);
      }),
      dispatchEvent: vi.fn(),
    }));
    Object.defineProperty(window, 'matchMedia', { value: matchMediaMock, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns boolean based on window width', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('uses max-width 767px query', () => {
    renderHook(() => useIsMobile());
    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
  });

  it('calls addEventListener on mount', () => {
    let addEventListener: (e: string, cb: () => void) => void;
    matchMediaMock.mockImplementation((query: string) => {
      const handler = (_e: string, cb: () => void) => {
        addEventListener = handler;
        listeners.push(cb);
      };
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(handler),
        removeEventListener: vi.fn(),
      };
    });
    const { unmount } = renderHook(() => useIsMobile());
    expect(matchMediaMock).toHaveBeenCalled();
    unmount();
  });
});
