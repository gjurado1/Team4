import React from 'react';
import { View, Switch } from 'react-native';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { Text, useAppTheme } from '../theme/ThemeProvider';

type Med = { id: string; name: string; dose: string; time: string; taken: boolean };

export function MedicationsScreen() {
  const { theme, textScale } = useAppTheme();
  const [items, setItems] = React.useState<Med[]>([
    { id: '1', name: 'Aspirin', dose: '81mg', time: '08:00', taken: false },
    { id: '2', name: 'Vitamin D', dose: '1000 IU', time: '12:00', taken: true },
    { id: '3', name: 'Metformin', dose: '500mg', time: '20:00', taken: false }
  ]);

  return (
    <AppLayout>
      <ScreenContainer scroll testID="medications-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Medications" subtitle="Track your medication schedule" />

          <AppCard accessibilityLabel="Medication list">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 10 }}>Today</Text>
            <View style={{ gap: 10 }}>
              {items.map((m) => (
                <View
                  key={m.id}
                  style={{
                    borderWidth: 2,
                    borderColor: theme.colors.border,
                    borderRadius: 14,
                    padding: 12,
                    backgroundColor: theme.colors.surfaceAlt,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}
                  accessibilityLabel={`${m.name} ${m.dose} at ${m.time}`}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '900' }}>{m.name}</Text>
                    <Text style={{ color: theme.colors.textMuted, marginTop: 2 }}>{m.dose} • {m.time}</Text>
                  </View>
                  <Switch
                    value={m.taken}
                    onValueChange={(v) =>
                      setItems((s) => s.map((x) => (x.id === m.id ? { ...x, taken: v } : x)))
                    }
                    accessibilityLabel={m.taken ? 'Mark as not taken' : 'Mark as taken'}
                  />
                </View>
              ))}
            </View>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
