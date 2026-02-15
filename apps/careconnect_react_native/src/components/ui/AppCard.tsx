import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useSettings } from '../../context/SettingsContext';

export function AppCard({ style, ...rest }: ViewProps) {
  const { theme } = useAppTheme();
  const { enhancedFocus } = useSettings();
  return (
    <View
      {...rest}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderWidth: enhancedFocus ? 3 : 2
        },
        style
      ]}
      accessibilityRole={rest.accessibilityRole}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 16
  }
});
