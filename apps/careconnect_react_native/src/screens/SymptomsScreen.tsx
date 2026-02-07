import React from 'react';
import { View } from 'react-native';
import { AppLayout } from '../components/navigation/AppLayout';
import { ScreenContainer } from '../components/ScreenContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { AppCard } from '../components/ui/AppCard';
import { AppInput } from '../components/ui/AppInput';
import { AppButton } from '../components/ui/AppButton';
import { AppBadge } from '../components/ui/AppBadge';
import { Text, useAppTheme } from '@/theme/ThemeProvider';

type Entry = { id: string; name: string; severity: 'low' | 'medium' | 'high'; when: string };

export function SymptomsScreen() {
  const { theme, textScale } = useAppTheme();
  const [name, setName] = React.useState('');
  const [severity, setSeverity] = React.useState<'low' | 'medium' | 'high'>('low');
  const [items, setItems] = React.useState<Entry[]>([
    { id: '1', name: 'Headache', severity: 'low', when: 'Today' },
    { id: '2', name: 'Fatigue', severity: 'medium', when: 'Yesterday' }
  ]);

  const add = React.useCallback(() => {
    const n = name.trim();
    if (!n) return;
    setItems((s) => [{ id: `${Date.now()}`, name: n, severity, when: 'Today' }, ...s]);
    setName('');
  }, [name, severity]);

  const badgeVariant = (s: Entry['severity']) => (s === 'high' ? 'error' : s === 'medium' ? 'warning' : 'success');

  return (
    <AppLayout>
      <ScreenContainer scroll testID="symptoms-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Symptoms" subtitle="Track symptoms and trends" />

          <AppCard accessibilityLabel="Add symptom">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 10 }}>Log a symptom</Text>
            <View style={{ gap: 10 }}>
              <AppInput label="Symptom" value={name} onChangeText={setName} placeholder="e.g., headache" />
              <Text style={{ fontWeight: '900' }}>Severity</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <AppButton title={severity === 'low' ? 'Low ✓' : 'Low'} variant="secondary" onPress={() => setSeverity('low')} expand />
                </View>
                <View style={{ flex: 1 }}>
                  <AppButton title={severity === 'medium' ? 'Medium ✓' : 'Medium'} variant="secondary" onPress={() => setSeverity('medium')} expand />
                </View>
                <View style={{ flex: 1 }}>
                  <AppButton title={severity === 'high' ? 'High ✓' : 'High'} variant="secondary" onPress={() => setSeverity('high')} expand />
                </View>
              </View>

              <AppButton title="Add" onPress={add} expand accessibilityHint="Adds a symptom entry" />
            </View>
          </AppCard>

          <AppCard accessibilityLabel="Symptom history">
            <Text style={{ fontWeight: '900', fontSize: 18 * textScale, marginBottom: 10 }}>Recent entries</Text>
            <View style={{ gap: 10 }}>
              {items.map((it) => (
                <View
                  key={it.id}
                  style={{ borderWidth: 2, borderColor: theme.colors.border, borderRadius: 14, padding: 12, backgroundColor: theme.colors.surfaceAlt }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontWeight: '900', flex: 1 }}>{it.name}</Text>
                    <AppBadge text={it.severity.toUpperCase()} variant={badgeVariant(it.severity)} />
                  </View>
                  <Text style={{ color: theme.colors.textMuted, marginTop: 4 }}>{it.when}</Text>
                </View>
              ))}
            </View>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
