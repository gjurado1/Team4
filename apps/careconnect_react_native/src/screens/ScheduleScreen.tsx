import React from 'react';
import { View } from 'react-native';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppBadge } from '../components/ui/AppBadge';
import { Text, useAppTheme } from '../theme/ThemeProvider';

const EVENTS = [
  { time: '09:30', title: 'Check-in review', subtitle: 'Sarah Johnson', type: 'urgent' },
  { time: '11:00', title: 'Medication follow-up', subtitle: 'Robert Chen', type: 'urgent' },
  { time: '14:00', title: 'Routine check-in', subtitle: 'James Miller', type: 'normal' },
  { time: '16:30', title: 'Report summary', subtitle: 'Team', type: 'normal' }
] as const;

export function ScheduleScreen() {
  const { theme, textScale } = useAppTheme();
  return (
    <AppLayout>
      <ScreenContainer scroll testID="schedule-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Schedule" subtitle="Today" />

          <AppCard accessibilityLabel="Schedule list">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 12 }}>Upcoming</Text>
            <View style={{ gap: 10 }}>
              {EVENTS.map((e) => (
                <View
                  key={`${e.time}-${e.title}`}
                  style={{ borderWidth: 2, borderColor: theme.colors.border, borderRadius: 14, padding: 12, backgroundColor: theme.colors.surfaceAlt }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontWeight: '900', width: 64 }}>{e.time}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: '900' }}>{e.title}</Text>
                      <Text style={{ color: theme.colors.textMuted, marginTop: 2 }}>{e.subtitle}</Text>
                    </View>
                    {e.type === 'urgent' ? <AppBadge text="URGENT" variant="error" /> : <AppBadge text="OK" variant="success" />}
                  </View>
                </View>
              ))}
            </View>
          </AppCard>

          <AppCard accessibilityLabel="Calendar placeholder">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 6 }}>Calendar</Text>
            <Text style={{ color: theme.colors.textMuted }}>
              Calendar UI can be implemented with an Expo-compatible calendar library if required.
            </Text>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
