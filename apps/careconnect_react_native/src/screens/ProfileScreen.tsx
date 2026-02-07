import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { Text, useAppTheme } from '../theme/ThemeProvider';
import { useAuth } from "../context/AuthContext";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<Nav>();
  const { role, logout} = useAuth();

  return (
    <AppLayout>
      <ScreenContainer scroll testID="profile-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Profile" subtitle="Account details" />

          <AppCard accessibilityLabel="Account summary">
            <Text style={{ fontWeight: '900', marginBottom: 6 }}>Current role</Text>
            <Text style={{ color: theme.colors.textMuted }}>{role ?? 'Not set (guest)'}</Text>
            <Text style={{ marginTop: 12, color: theme.colors.textMuted }}>
              In the Flutter app, role is derived from username. This screen mirrors that behavior.
            </Text>
          </AppCard>

          <AppCard accessibilityLabel="Actions">
            <View style={{ gap: 10 }}>
              <AppButton title="Accessibility Settings" variant="secondary" onPress={() => navigation.navigate('Settings')} expand />
              <AppButton
                title="Logout"
                variant="danger"
                onPress={async () => {
                  await logout();
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
                expand
              />
            </View>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
