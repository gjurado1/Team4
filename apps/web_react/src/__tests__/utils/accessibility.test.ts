import {
  applyTextSize,
  applyReducedMotion,
  applyStoredAccessibilitySettings,
  TextSizeOption,
} from '../../app/utils/accessibility';

describe('applyTextSize', () => {
  const sizes: TextSizeOption[] = ['small', 'medium', 'large', 'extra-large'];

  it.each(sizes)('sets data-textSize="%s" on documentElement', (size) => {
    applyTextSize(size);
    expect(document.documentElement.dataset.textSize).toBe(size);
  });
});

describe('applyReducedMotion', () => {
  it('sets all duration CSS variables to 0ms when true', () => {
    applyReducedMotion(true);
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--duration-fast')).toBe('0ms');
    expect(root.style.getPropertyValue('--duration-medium')).toBe('0ms');
    expect(root.style.getPropertyValue('--duration-slow')).toBe('0ms');
  });

  it('restores duration CSS variables when false', () => {
    applyReducedMotion(false);
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--duration-fast')).toBe('150ms');
    expect(root.style.getPropertyValue('--duration-medium')).toBe('300ms');
    expect(root.style.getPropertyValue('--duration-slow')).toBe('500ms');
  });
});

describe('applyStoredAccessibilitySettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to medium text size and normal motion when no settings stored', () => {
    applyStoredAccessibilitySettings();
    expect(document.documentElement.dataset.textSize).toBe('medium');
    expect(document.documentElement.style.getPropertyValue('--duration-fast')).toBe('150ms');
  });

  it('applies stored textSize and reducedMotion=true', () => {
    localStorage.setItem(
      'careconnect-settings',
      JSON.stringify({ textSize: 'large', reducedMotion: true })
    );
    applyStoredAccessibilitySettings();
    expect(document.documentElement.dataset.textSize).toBe('large');
    expect(document.documentElement.style.getPropertyValue('--duration-fast')).toBe('0ms');
  });

  it('applies stored textSize and reducedMotion=false', () => {
    localStorage.setItem(
      'careconnect-settings',
      JSON.stringify({ textSize: 'small', reducedMotion: false })
    );
    applyStoredAccessibilitySettings();
    expect(document.documentElement.dataset.textSize).toBe('small');
    expect(document.documentElement.style.getPropertyValue('--duration-fast')).toBe('150ms');
  });

  it('uses defaults when textSize is missing from stored settings', () => {
    localStorage.setItem('careconnect-settings', JSON.stringify({ reducedMotion: false }));
    applyStoredAccessibilitySettings();
    expect(document.documentElement.dataset.textSize).toBe('medium');
  });

  it('falls back to defaults on invalid JSON', () => {
    localStorage.setItem('careconnect-settings', 'not-valid-json{{{');
    applyStoredAccessibilitySettings();
    expect(document.documentElement.dataset.textSize).toBe('medium');
    expect(document.documentElement.style.getPropertyValue('--duration-fast')).toBe('150ms');
  });
});
