import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text, useAppTheme } from "../../theme/ThemeProvider";



type Variant = 'info' | 'error' | 'success' | 'warning';

type Props = ViewProps & {
  variant?: Variant;
  message: string;
};

export function AppAlert({ variant = 'info', message, style, ...rest }: Props) {
  const { theme } = useAppTheme();
  const tone =
    variant === 'error'
      ? theme.colors.danger
      : variant === 'success'
        ? theme.colors.success
        : variant === 'warning'
          ? theme.colors.warning
          : theme.colors.primary;

  return (
    <View
      {...rest}
      style={[styles.base, { borderColor: tone, backgroundColor: theme.colors.surfaceAlt }, style]}
      accessibilityRole="alert"
    >
      <Text style={{ fontWeight: '800', marginBottom: 2 }}>{variant.toUpperCase()}</Text>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 2,
    borderRadius: 14,
    padding: 12
  }
});
