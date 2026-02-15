import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Text, useAppTheme } from '../../theme/ThemeProvider';
import { useSettings } from '../../context/SettingsContext';

export type AppButtonVariant = 'primary' | 'secondary' | 'danger';

type Props = {
  title: string;
  onPress: () => void | Promise<void>;
  variant?: AppButtonVariant;
  disabled?: boolean;
  expand?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  style?: ViewStyle;
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  expand = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style
}: Props) {
  const { theme, textScale } = useAppTheme();
  const { enhancedFocus, largeTouchTargets, screenReaderSupport } = useSettings();

  const bg =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'danger'
        ? theme.colors.danger
        : theme.colors.surface;
  const border = variant === 'secondary' ? theme.colors.border : bg;
  const textColor = variant === 'secondary' ? theme.colors.text : theme.colors.surface;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: enhancedFocus ? 3 : 2,
          minHeight: largeTouchTargets ? 56 : 48,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          alignSelf: expand ? 'stretch' : 'flex-start'
        },
        style
      ]}
      importantForAccessibility={screenReaderSupport ? 'yes' : 'auto'}
    >
      <Text style={{ color: textColor, fontWeight: '800', fontSize: 16 * textScale }}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
