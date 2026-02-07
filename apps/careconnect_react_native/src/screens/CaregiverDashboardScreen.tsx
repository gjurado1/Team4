import React from 'react';
import { View, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppAlert } from '../components/ui/AppAlert';
import { AppCard } from '../components/ui/AppCard';
import { AppBadge } from '../components/ui/AppBadge';
import { AppButton } from '../components/ui/AppButton';
import { Text, useAppTheme } from '../theme/ThemeProvider';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type CheckIn = { patient: string; time: string; urgent: boolean };

const UPCOMING: CheckIn[] = [
  { patient: 'Sarah Johnson', time: '10:00 AM', urgent: true },
  { patient: 'Robert Chen', time: '2:00 PM', urgent: false },
  { patient: 'James Miller', time: '4:30 PM', urgent: false },
  { patient: 'Emily Davis', time: '5:15 PM', urgent: false },
  { patient: 'Michael Brown', time: '6:00 PM', urgent: true },
  { patient: 'Patricia Wilson', time: '7:30 PM', urgent: false },
  { patient: 'David Martinez', time: '8:00 PM', urgent: false }
];

export function CaregiverDashboardScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<Nav>();

  return (
    <AppLayout>
      <ScreenContainer scroll testID="caregiver-dashboard">
        <View style={{ gap: 16 }}>
          <PageHeader title="Welcome back" subtitle="Timezone: EDT" />

          <View style={{ gap: 10 }}>
            <AppAlert variant="info" message="Offline Mode: Last synced 2 hours ago. Your data will sync when reconnected." />
            <AppAlert variant="error" message="Important: 3 patients have missed their scheduled check-ins today." />
            <AppAlert variant="warning" message="Reminder: Sarah Johnson reported severe symptoms. Follow up required." />
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <AppCard style={{ flex: 1 }}>
              <Text style={{ fontWeight: '900' }}># of Missed Check-Ins</Text>
              <Text style={{ fontWeight: '900', fontSize: 28, marginTop: 8, color: theme.colors.primary }}>24</Text>
            </AppCard>
            <AppCard style={{ flex: 1 }}>
              <Text style={{ fontWeight: '900' }}>Active Patients</Text>
              <Text style={{ fontWeight: '900', fontSize: 28, marginTop: 8, color: theme.colors.success }}>32</Text>
            </AppCard>
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <AppButton
                title="Schedule"
                variant="secondary"
                onPress={() => navigation.navigate('Schedule')}
                expand
                accessibilityHint="Open schedule"
              />
            </View>
            <View style={{ flex: 1 }}>
              <AppButton
                title="All Patients"
                variant="secondary"
                onPress={() => navigation.navigate('PatientList')}
                expand
                accessibilityHint="Open patient list"
              />
            </View>
          </View>

          <AppCard>
            <Text style={{ fontWeight: '900', fontSize: 18, marginBottom: 12 }}>Upcoming Check-Ins</Text>

            <FlatList
              data={UPCOMING}
              keyExtractor={(it) => `${it.patient}-${it.time}`}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate('PatientList')}
                  accessibilityRole="button"
                  accessibilityLabel={`Open patient list for ${item.patient}`}
                  style={{ borderWidth: 2, borderColor: theme.colors.border, borderRadius: 14, padding: 12, backgroundColor: theme.colors.surfaceAlt }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontWeight: '900', flex: 1 }}>{item.patient}</Text>
                        {item.urgent ? <AppBadge text="URGENT" variant="error" /> : null}
                      </View>
                      <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>Scheduled: {item.time}</Text>
                    </View>
                    <Text style={{ color: theme.colors.primary, fontWeight: '900' }}>View</Text>
                  </View>
                </Pressable>
              )}
            />
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
