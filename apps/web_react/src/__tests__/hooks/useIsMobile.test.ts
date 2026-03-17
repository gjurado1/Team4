import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../app/components/ui/use-mobile';

function setupMatchMedia(matches: boolean) {
  const listeners: Array<(e: Partial<MediaQueryListEvent>) => void> = [];

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation(() => ({
      matches,
      addEventListener: jest.fn((_type: string, fn: (e: Partial<MediaQueryListEvent>) => void) => {
        listeners.push(fn);
      }),
      removeEventListener: jest.fn(),
    })),
  });

  return listeners;
}

function setInnerWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
}

describe('useIsMobile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns false when innerWidth is above the mobile breakpoint', () => {
    setInnerWidth(1024);
    setupMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true when innerWidth is below the mobile breakpoint', () => {
    setInnerWidth(375);
    setupMatchMedia(true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false exactly at the breakpoint (768px)', () => {
    setInnerWidth(768);
    setupMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true just below the breakpoint (767px)', () => {
    setInnerWidth(767);
    setupMatchMedia(true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('updates when the media query change event fires', () => {
    setInnerWidth(1024);
    const listeners = setupMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      setInnerWidth(375);
      listeners.forEach((fn) => fn({} as MediaQueryListEvent));
    });

    expect(result.current).toBe(true);
  });

  it('removes the event listener on unmount', () => {
    setInnerWidth(1024);
    const removeEventListenerMock = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn().mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: removeEventListenerMock,
      }),
    });

    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
