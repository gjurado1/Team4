import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppAlert } from '../components/ui/AppAlert';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { AppBadge } from '../components/ui/AppBadge';
import { PageHeader } from '../components/ui/PageHeader';
import { Text, useAppTheme } from '../theme/ThemeProvider';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MOODS = [
  { emoji: '😢', label: 'Very Sad', value: 'very-sad' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '🙂', label: 'Good', value: 'good' },
  { emoji: '😊', label: 'Great', value: 'great' }
] as const;

const RECENT = [
  { date: 'Today, 9:00 AM', mood: 'Good', symptoms: 'Mild headache' },
  { date: 'Yesterday, 8:30 AM', mood: 'Great', symptoms: 'None reported' },
  { date: 'Jan 21, 8:00 AM', mood: 'Neutral', symptoms: 'Fatigue' }
];

export function PatientDashboardScreen() {
  const { theme, textScale } = useAppTheme();
  const navigation = useNavigation<Nav>();
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);

  return (
    <AppLayout>
      <ScreenContainer scroll testID="patient-dashboard">
        <View style={{ gap: 16 }}>
          <PageHeader title="Hello, Sarah" subtitle="How are you feeling today?" />

          <AppAlert variant="info" message="Offline Mode: Last synced 2 hours ago. Your data will sync when reconnected." />

          <AppCard>
            <View style={{ gap: 12 }}>
              <Text style={{ fontWeight: '900', fontSize: 18 * textScale }}>Daily Check-In</Text>
              <Text style={{ color: theme.colors.textMuted }}>{'Share how you\'re feeling today'}</Text>

              <Text style={{ fontWeight: '900', color: theme.colors.primary }}>How are you feeling today?</Text>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                {MOODS.map((m) => {
                  const active = selectedMood === m.value;
                  return (
                    <Pressable
                      key={m.value}
                      onPress={() => setSelectedMood(m.value)}
                      accessibilityRole="button"
                      accessibilityLabel={m.label}
                      accessibilityState={{ selected: active }}
                      style={{
                        flex: 1,
                        borderWidth: 2,
                        borderColor: active ? theme.colors.primary : theme.colors.border,
                        borderRadius: 14,
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: active ? theme.colors.surfaceAlt : theme.colors.surface
                      }}
                    >
                      <Text style={{ fontSize: 20 * textScale }}>{m.emoji}</Text>
                      <Text style={{ fontWeight: '900', fontSize: 12 * textScale, marginTop: 6 }}>{m.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <AppButton
                title="Start Check-In"
                onPress={() => navigation.navigate('PatientCheckIn')}
                expand
                accessibilityHint="Open the full check-in form"
              />
            </View>
          </AppCard>

          <AppCard>
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 12 }}>Recent Check-Ins</Text>
            <View style={{ gap: 10 }}>
              {RECENT.map((c) => (
                <View
                  key={c.date}
                  style={{ borderWidth: 2, borderColor: theme.colors.border, borderRadius: 14, padding: 12, backgroundColor: theme.colors.surfaceAlt }}
                  accessibilityLabel={`Check-in from ${c.date}`}
                >
                  <Text style={{ fontWeight: '900' }}>{c.date}</Text>
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 6 }}>
                    <AppBadge text={`Mood: ${c.mood}`} />
                    <Text style={{ color: theme.colors.textMuted, flex: 1 }}>{c.symptoms}</Text>
                  </View>
                </View>
              ))}
            </View>
          </AppCard>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <AppButton title="Symptoms" variant="secondary" onPress={() => navigation.navigate('Symptoms')} expand />
            </View>
            <View style={{ flex: 1 }}>
              <AppButton title="Medications" variant="secondary" onPress={() => navigation.navigate('Medications')} expand />
            </View>
          </View>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
