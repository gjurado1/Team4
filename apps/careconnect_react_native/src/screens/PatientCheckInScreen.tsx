import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { AppTextarea } from '../components/ui/AppTextarea';
import { PageHeader } from '../components/ui/PageHeader';
import { Text, useAppTheme } from '../theme/ThemeProvider';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MOODS = [
  { emoji: '😢', label: 'Very Sad', value: 'very-sad' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '🙂', label: 'Good', value: 'good' },
  { emoji: '😊', label: 'Great', value: 'great' }
];

export function PatientCheckInScreen() {
  const { theme, textScale } = useAppTheme();
  const navigation = useNavigation<Nav>();
  const [mood, setMood] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState('');

  const submit = React.useCallback(() => {
    if (!mood) return;
    navigation.reset({ index: 0, routes: [{ name: 'PatientDashboard' }] });
  }, [mood, navigation]);

  return (
    <AppLayout>
      <ScreenContainer scroll testID="patient-checkin">
        <View style={{ gap: 16 }}>
          <PageHeader title="Daily Check-In" subtitle="Share how you're feeling today" />

          <AppCard>
            <View style={{ gap: 12 }}>
              <Text style={{ fontWeight: '900', color: theme.colors.primary }}>How are you feeling today?</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {MOODS.map((m) => {
                  const active = mood === m.value;
                  return (
                    <Pressable
                      key={m.value}
                      onPress={() => setMood(m.value)}
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
                      <Text style={{ fontSize: 22 * textScale }}>{m.emoji}</Text>
                      <Text style={{ fontWeight: '900', fontSize: 12 * textScale, marginTop: 6, textAlign: 'center' }}>{m.label}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <AppTextarea
                label="Any symptoms or notes?"
                value={notes}
                onChangeText={setNotes}
                placeholder="Describe any symptoms, feelings, or important notes..."
              />
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 * textScale }}>
                Share any symptoms, medication effects, or general notes about your day.
              </Text>

              <AppButton
                title="Submit Check-In"
                onPress={submit}
                expand
                disabled={!mood}
                accessibilityHint="Submits your check-in"
              />
              {!mood ? (
                <Text style={{ color: theme.colors.textMuted, fontSize: 13 * textScale }}>
                  Please select your mood to submit your check-in.
                </Text>
              ) : null}

              <AppButton
                title="Back"
                variant="secondary"
                onPress={() => navigation.navigate('PatientDashboard')}
                expand
                accessibilityHint="Return to dashboard"
              />
            </View>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
