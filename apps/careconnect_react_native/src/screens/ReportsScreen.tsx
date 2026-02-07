import React from 'react';
import { View } from 'react-native';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppBadge } from '../components/ui/AppBadge';
import { Text, useAppTheme } from '../theme/ThemeProvider';

export function ReportsScreen() {
  const { theme, textScale } = useAppTheme();
  return (
    <AppLayout>
      <ScreenContainer scroll testID="reports-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Reports" subtitle="Your health summaries" />

          <AppCard accessibilityLabel="Report summary">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 10 }}>This week</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '900' }}>Check-ins</Text>
                <Text style={{ fontWeight: '900', fontSize: 28, marginTop: 6, color: theme.colors.primary }}>6</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '900' }}>Avg mood</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <Text style={{ fontSize: 20 * textScale }}>🙂</Text>
                  <AppBadge text="Good" variant="success" />
                </View>
              </View>
            </View>

            <Text style={{ color: theme.colors.textMuted, marginTop: 12 }}>
              Charts can be implemented using an Expo-friendly chart library if required.
            </Text>
          </AppCard>

          <AppCard accessibilityLabel="Export">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 6 }}>Export</Text>
            <Text style={{ color: theme.colors.textMuted }}>
              For demo purposes, exporting is not wired. Add CSV/PDF export based on your assignment needs.
            </Text>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
