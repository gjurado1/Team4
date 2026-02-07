import React from 'react';
import { View } from 'react-native';
import { Text, useAppTheme } from '../../theme/ThemeProvider';

type Props = {
  showTagline?: boolean;
};

export function AppLogo({ showTagline = true }: Props) {
  const { theme, textScale } = useAppTheme();

  return (
    <View accessibilityRole="header" accessibilityLabel="CareConnect logo">
      <Text style={{ fontWeight: '900', fontSize: 28 * textScale, color: theme.colors.primary }}>
        CareConnect
      </Text>
      {showTagline ? (
        <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>Care made simple.</Text>
      ) : null}
    </View>
  );
}
