import React from 'react';
import { View } from 'react-native';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';
import { AppAlert } from '../components/ui/AppAlert';
import { Text, useAppTheme } from '@/theme/ThemeProvider';

export function EmergencyScreen() {
  const { theme, textScale } = useAppTheme();
  return (
    <AppLayout>
      <ScreenContainer scroll testID="emergency-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Emergency" subtitle="Immediate help resources" />

          <AppAlert
            variant="warning"
            message="If this is an emergency, call your local emergency number right away."
          />

          <AppCard accessibilityLabel="Emergency actions">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 10 }}>
              Quick actions
            </Text>
            <View style={{ gap: 10 }}>
              <AppButton
                title="Call Emergency Services"
                variant="danger"
                onPress={() => {
                  // Intentionally a no-op in the demo.
                }}
                expand
                accessibilityHint="Initiates a call to emergency services"
              />
              <AppButton
                title="Contact Care Team"
                variant="secondary"
                onPress={() => {}}
                expand
                accessibilityHint="Opens a message to your care team"
              />
            </View>
            <Text style={{ color: theme.colors.textMuted, marginTop: 12 }}>
              For a production app, wire this to device calling and verified contact lists.
            </Text>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
