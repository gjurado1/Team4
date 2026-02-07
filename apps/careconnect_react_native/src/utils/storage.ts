import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Role, ThemeMode, VisionTheme } from '@/types';

const KEYS = {
  role: 'careconnect-role',
  themeMode: 'careconnect-theme-mode',
  visionTheme: 'careconnect-vision-theme',
  textScale: 'careconnect-text-scale'
} as const;

export async function getRole(): Promise<Role | null> {
  const v = await AsyncStorage.getItem(KEYS.role);
  return v === 'caregiver' || v === 'patient' ? v : null;
}

export async function setRole(role: Role | null): Promise<void> {
  if (!role) {
    await AsyncStorage.removeItem(KEYS.role);
    return;
  }
  await AsyncStorage.setItem(KEYS.role, role);
}

export async function getThemeMode(): Promise<ThemeMode> {
  const v = await AsyncStorage.getItem(KEYS.themeMode);
  return v === 'light' || v === 'dark' || v === 'system' ? v : 'system';
}

export async function setThemeMode(v: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(KEYS.themeMode, v);
}

export async function getVisionTheme(): Promise<VisionTheme> {
  const v = await AsyncStorage.getItem(KEYS.visionTheme);
  return v === 'normal' || v === 'sepia' || v === 'highContrast' ? v : 'normal';
}

export async function setVisionTheme(v: VisionTheme): Promise<void> {
  await AsyncStorage.setItem(KEYS.visionTheme, v);
}

export async function getTextScale(): Promise<number> {
  const v = await AsyncStorage.getItem(KEYS.textScale);
  const n = v ? Number(v) : NaN;
  // Keep in a reasonable range to avoid layout breakage
  if (!Number.isFinite(n)) return 1.0;
  return Math.min(1.6, Math.max(0.85, n));
}

export async function setTextScale(v: number): Promise<void> {
  const clamped = Math.min(1.6, Math.max(0.85, v));
  await AsyncStorage.setItem(KEYS.textScale, String(clamped));
}
