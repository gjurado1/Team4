export type TextSizeOption = 'small' | 'medium' | 'large' | 'extra-large';

interface StoredAccessibilitySettings {
  textSize?: TextSizeOption;
  reducedMotion?: boolean;
}

export function applyTextSize(textSize: TextSizeOption) {
  document.documentElement.dataset.textSize = textSize;
}

export function applyReducedMotion(reducedMotion: boolean) {
  const root = document.documentElement;

  if (reducedMotion) {
    root.style.setProperty('--duration-fast', '0ms');
    root.style.setProperty('--duration-medium', '0ms');
    root.style.setProperty('--duration-slow', '0ms');
    return;
  }

  root.style.setProperty('--duration-fast', '150ms');
  root.style.setProperty('--duration-medium', '300ms');
  root.style.setProperty('--duration-slow', '500ms');
}

export function applyStoredAccessibilitySettings() {
  const stored = localStorage.getItem('careconnect-settings');

  if (!stored) {
    applyTextSize('medium');
    applyReducedMotion(false);
    return;
  }

  try {
    const parsed = JSON.parse(stored) as StoredAccessibilitySettings;
    applyTextSize(parsed.textSize ?? 'medium');
    applyReducedMotion(parsed.reducedMotion ?? false);
  } catch {
    applyTextSize('medium');
    applyReducedMotion(false);
  }
}
