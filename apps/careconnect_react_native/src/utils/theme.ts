import { Appearance } from 'react-native';
import type { ThemeMode, VisionTheme } from '@/types';

export type AppTheme = {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    danger: string;
    warning: string;
    success: string;
  };
};

function resolveMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'light' || mode === 'dark') return mode;
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

export function buildTheme(themeMode: ThemeMode, vision: VisionTheme): AppTheme {
  const mode = resolveMode(themeMode);

  // Base palettes
  const base =
    mode === 'dark'
      ? {
          background: '#0B0D12',
          surface: '#121622',
          surfaceAlt: '#1A2031',
          text: '#F3F5FA',
          textMuted: '#B9C0D4',
          border: '#2B3552',
          primary: '#7AA2FF',
          danger: '#FF6B6B',
          warning: '#FFB020',
          success: '#2ED47A'
        }
      : {
          background: '#F7F8FC',
          surface: '#FFFFFF',
          surfaceAlt: '#F0F3FA',
          text: '#121622',
          textMuted: '#5F6B85',
          border: '#D6DDEE',
          primary: '#2F6BFF',
          danger: '#D64545',
          warning: '#B46A00',
          success: '#168A52'
        };

  if (vision === 'sepia') {
    // Sepia overlay: warmer background + slightly reduced contrast
    return {
      mode,
      colors: {
        ...base,
        background: mode === 'dark' ? '#0F0C08' : '#FBF1E2',
        surface: mode === 'dark' ? '#16110B' : '#FFF7EA',
        surfaceAlt: mode === 'dark' ? '#1D170F' : '#F7E5C9',
        border: mode === 'dark' ? '#3A2D1C' : '#E6D1AE',
        primary: mode === 'dark' ? '#FFB86B' : '#B85C00'
      }
    };
  }

  if (vision === 'highContrast') {
    return {
      mode,
      colors: {
        ...base,
        background: mode === 'dark' ? '#000000' : '#FFFFFF',
        surface: mode === 'dark' ? '#000000' : '#FFFFFF',
        surfaceAlt: mode === 'dark' ? '#0A0A0A' : '#F2F2F2',
        text: mode === 'dark' ? '#FFFFFF' : '#000000',
        textMuted: mode === 'dark' ? '#FFFFFF' : '#000000',
        border: mode === 'dark' ? '#FFFFFF' : '#000000',
        primary: mode === 'dark' ? '#00E5FF' : '#0033FF',
        danger: mode === 'dark' ? '#FF1744' : '#B00020',
        warning: mode === 'dark' ? '#FFD600' : '#8A4B00',
        success: mode === 'dark' ? '#00E676' : '#006B3C'
      }
    };
  }

  return { mode, colors: base };
}
