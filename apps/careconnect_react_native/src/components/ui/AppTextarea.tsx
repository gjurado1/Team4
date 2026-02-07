import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text, useAppTheme } from '../../theme/ThemeProvider';

type Props = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  testID?: string;
};

export function AppTextarea({ label, value, onChangeText, placeholder, testID }: Props) {
  const { theme, textScale } = useAppTheme();
  return (
    <View style={styles.wrap}>
      <Text style={{ fontWeight: '800', marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        multiline
        style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text, fontSize: 16 * textScale }]}
        accessibilityLabel={label}
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
    paddingVertical: 12,
    minHeight: 110,
    textAlignVertical: 'top'
  }
});
