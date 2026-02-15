import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text, useAppTheme } from '../../theme/ThemeProvider';
import { useSettings } from '../../context/SettingsContext';

type Props = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: 'next' | 'done';
  onSubmitEditing?: () => void;
  testID?: string;
};

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  returnKeyType,
  onSubmitEditing,
  testID
}: Props) {
  const { theme, textScale } = useAppTheme();
  const { enhancedFocus, largeTouchTargets, screenReaderSupport } = useSettings();

  return (
    <View style={styles.wrap}>
      <Text style={{ fontWeight: '800', marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderWidth: enhancedFocus ? 3 : 2,
            color: theme.colors.text,
            fontSize: 16 * textScale,
            minHeight: largeTouchTargets ? 56 : 48
          }
        ]}
        accessibilityLabel={label}
        accessibilityHint={screenReaderSupport ? placeholder : undefined}
        importantForAccessibility={screenReaderSupport ? 'yes' : 'auto'}
        testID={testID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  input: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12
  }
});
