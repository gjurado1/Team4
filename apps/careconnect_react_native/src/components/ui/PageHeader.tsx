import React from 'react';
import { View } from 'react-native';
import { Text, useAppTheme } from '../../theme/ThemeProvider';

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { textScale, theme } = useAppTheme();
  return (
    <View accessibilityRole="header" accessibilityLabel={title}>
      <Text style={{ fontWeight: '900', fontSize: 24 * textScale }}>{title}</Text>
      {subtitle ? (
        <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
