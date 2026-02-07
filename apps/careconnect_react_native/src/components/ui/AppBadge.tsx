import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useAppTheme } from '../../theme/ThemeProvider';

type Variant = 'default' | 'error' | 'warning' | 'success';

export function AppBadge({ text, variant = 'default' }: { text: string; variant?: Variant }) {
  const { theme, textScale } = useAppTheme();
  const bg =
    variant === 'error'
      ? theme.colors.danger
      : variant === 'warning'
        ? theme.colors.warning
        : variant === 'success'
          ? theme.colors.success
          : theme.colors.surfaceAlt;
  const fg = variant === 'default' ? theme.colors.text : theme.colors.surface;

  return (
    <View
      style={[styles.base, { backgroundColor: bg, borderColor: theme.colors.border }]}
      accessibilityRole="text"
      accessibilityLabel={text}
    >
      <Text style={{ color: fg, fontWeight: '900', fontSize: 12 * textScale }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 2
  }
});
