import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppInput } from '../components/ui/AppInput';
import { AppBadge } from '../components/ui/AppBadge';
import { Text, useAppTheme } from '../theme/ThemeProvider';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Patient = {
  id: number;
  name: string;
  lastUpdate: string;
  urgent: boolean;
  condition: string;
  nextCheckIn: string;
  mood: string;
  moodIcon: string;
};

const PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastUpdate: 'Last Updated: 12/25/2024',
    urgent: true,
    condition: 'Severe symptoms reported',
    nextCheckIn: 'Next Check-In: 12/28/2024',
    mood: 'Poor',
    moodIcon: '😢'
  },
  {
    id: 2,
    name: 'Robert Chen',
    lastUpdate: 'Last Updated: 12/24/2024',
    urgent: true,
    condition: 'Missed medication dose',
    nextCheckIn: 'Next Check-In: 12/28/2024',
    mood: 'Concerned',
    moodIcon: '😐'
  },
  {
    id: 3,
    name: 'James Miller',
    lastUpdate: 'Last Updated: 12/24/2024',
    urgent: false,
    condition: 'Routine check-in',
    nextCheckIn: 'Next Check-In: 12/27/2024',
    mood: 'Good',
    moodIcon: '🙂'
  },
  {
    id: 4,
    name: 'Mary Williams',
    lastUpdate: 'Last Updated: 12/23/2024',
    urgent: false,
    condition: 'Stable condition',
    nextCheckIn: 'Next Check-In: 12/26/2024',
    mood: 'Great',
    moodIcon: '😊'
  }
];

export function PatientListScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<Nav>();
  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PATIENTS;
    return PATIENTS.filter((p) => p.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <AppLayout>
      <ScreenContainer scroll testID="patient-list">
        <View style={{ gap: 16 }}>
          <PageHeader title="All Patients" subtitle="Search and monitor your patients" />
          <AppInput label="Search" value={q} onChangeText={setQ} placeholder="Search patients..." />

          <View style={{ gap: 12 }}>
            {filtered.map((p) => {
              const accent = p.urgent ? theme.colors.danger : theme.colors.success;
              return (
                <AppCard key={p.id} accessibilityLabel={`Patient card: ${p.name}`}>
                  <View style={{ borderLeftWidth: 4, borderLeftColor: accent, paddingLeft: 10, gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Text style={{ fontWeight: '900', flex: 1 }}>{p.name}</Text>
                      {p.urgent ? <AppBadge text="URGENT" variant="error" /> : null}
                    </View>
                    <Text style={{ color: theme.colors.textMuted }}>{p.lastUpdate}</Text>
                    <Text style={{ fontWeight: '900', color: p.urgent ? theme.colors.danger : theme.colors.text }}>{p.condition}</Text>
                    <Text style={{ color: theme.colors.textMuted }}>{p.nextCheckIn}</Text>
                    <Text>
                      <Text style={{ color: theme.colors.textMuted }}>Mood: </Text>
                      {p.moodIcon} {p.mood}
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
                      <Pressable
                        onPress={() => navigation.navigate('Messages')}
                        style={{ borderWidth: 2, borderColor: theme.colors.border, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: theme.colors.surfaceAlt }}
                        accessibilityRole="button"
                        accessibilityLabel={`Message ${p.name}`}
                      >
                        <Text style={{ fontWeight: '900', color: theme.colors.primary }}>Message</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {}}
                        style={{ borderWidth: 2, borderColor: theme.colors.border, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: theme.colors.surfaceAlt }}
                        accessibilityRole="button"
                        accessibilityLabel={`Notifications for ${p.name}`}
                      >
                        <Text style={{ fontWeight: '900' }}>Notify</Text>
                      </Pressable>
                    </View>
                  </View>
                </AppCard>
              );
            })}
          </View>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
