import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

export function AppCard({ style, ...rest }: ViewProps) {
  const { theme } = useAppTheme();
  return (
    <View
      {...rest}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border
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
