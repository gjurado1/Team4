import React from "react";
import { View } from "react-native";
import { AppLayout } from "../components/navigation/AppLayout";
import { ScreenContainer } from "../components/ScreenContainer";
import { AppCard } from "../components/ui/AppCard";
import { AppButton } from "../components/ui/AppButton";
import { PageHeader } from "../components/ui/PageHeader";
import { Text, useAppTheme } from "../theme/ThemeProvider";
import { useSettings } from "../context/SettingsContext";

export function SettingsScreen() {
  const { theme, textScale } = useAppTheme();
  const { themeMode, visionTheme, textScale: storedScale, setThemeMode, setVisionTheme, setTextScale } = useSettings();

  return (
    <AppLayout>
      <ScreenContainer scroll testID="settings-screen">
        <View style={{ gap: 16 }}>
          <PageHeader title="Accessibility Settings" subtitle="Theme, contrast, and text size" />

          <AppCard accessibilityLabel="Theme mode settings">
            <Text style={{ fontWeight: "900", fontSize: 18 * textScale, marginBottom: 10 }}>Theme mode</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <AppButton
                  title={themeMode === "system" ? "System ✓" : "System"}
                  variant="secondary"
                  onPress={() => setThemeMode("system")}
                  expand
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  title={themeMode === "light" ? "Light ✓" : "Light"}
                  variant="secondary"
                  onPress={() => setThemeMode("light")}
                  expand
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  title={themeMode === "dark" ? "Dark ✓" : "Dark"}
                  variant="secondary"
                  onPress={() => setThemeMode("dark")}
                  expand
                />
              </View>
            </View>
          </AppCard>

          <AppCard accessibilityLabel="Vision theme settings">
            <Text style={{ fontWeight: "900", fontSize: 18 * textScale, marginBottom: 10 }}>Vision theme</Text>
            <View style={{ gap: 10 }}>
              <AppButton
                title={visionTheme === "normal" ? "Normal ✓" : "Normal"}
                variant="secondary"
                onPress={() => setVisionTheme("normal")}
                expand
              />
              <AppButton
                title={visionTheme === "sepia" ? "Sepia ✓" : "Sepia"}
                variant="secondary"
                onPress={() => setVisionTheme("sepia")}
                expand
              />
              <AppButton
                title={visionTheme === "highContrast" ? "High Contrast ✓" : "High Contrast"}
                variant="secondary"
                onPress={() => setVisionTheme("highContrast")}
                expand
              />
            </View>
            <Text style={{ color: theme.colors.textMuted, marginTop: 8, fontSize: 13 * textScale }}>
              High Contrast increases legibility; Sepia reduces harsh brightness.
            </Text>
          </AppCard>

          <AppCard accessibilityLabel="Text size settings">
            <Text style={{ fontWeight: "900", fontSize: 18 * textScale, marginBottom: 10 }}>Text size</Text>
            <Text style={{ color: theme.colors.textMuted, marginBottom: 10 }}>
              Current scale: {storedScale.toFixed(2)}×
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <AppButton
                  title="A-"
                  variant="secondary"
                  onPress={() => setTextScale(storedScale - 0.1)}
                  expand
                  accessibilityHint="Decrease text size"
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  title="Reset"
                  variant="secondary"
                  onPress={() => setTextScale(1.0)}
                  expand
                  accessibilityHint="Reset text size"
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  title="A+"
                  variant="secondary"
                  onPress={() => setTextScale(storedScale + 0.1)}
                  expand
                  accessibilityHint="Increase text size"
                />
              </View>
            </View>

            <Text style={{ marginTop: 12 }}>This is preview text. The app scales base text using your chosen value.</Text>
          </AppCard>
        </View>
      </ScreenContainer>
    </AppLayout>
  );
}
