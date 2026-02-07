export type Role = 'caregiver' | 'patient';

export type ThemeMode = 'system' | 'light' | 'dark';
export type VisionTheme = 'normal' | 'sepia' | 'highContrast';

export type AppUser = {
  id?: number;
  username: string;
  password: string;
};
