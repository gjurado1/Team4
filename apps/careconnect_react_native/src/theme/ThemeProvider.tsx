import React, { createContext, useContext, useMemo } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { buildTheme, type AppTheme } from '../utils/theme';
import { useSettings } from "../context/SettingsContext";



type ThemeContextValue = {
  theme: AppTheme;
  textScale: number;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themeMode, visionTheme, textScale } = useSettings();
  const theme = useMemo(() => buildTheme(themeMode, visionTheme), [themeMode, visionTheme]);

  return <ThemeContext.Provider value={{ theme, textScale }}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}

// Convenience wrapper that respects the user's textScale setting.
export function Text(props: RNTextProps & { children: React.ReactNode }) {
  const { textScale, theme } = useAppTheme();
  const { style, ...rest } = props;
  return (
    <RNText
      {...rest}
      style={[{ color: theme.colors.text, fontSize: 16 * textScale }, style]}
      allowFontScaling
      accessibilityRole={props.accessibilityRole}
    />
  );
}
