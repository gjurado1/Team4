import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ScreenContainer } from "../components/ScreenContainer";
import { AppCard } from "../components/ui/AppCard";
import { AppLogo } from "../components/ui/AppLogo";
import { AppInput } from "../components/ui/AppInput";
import { AppButton } from "../components/ui/AppButton";
import { AppAlert } from "../components/ui/AppAlert";
import { Text, useAppTheme } from "../theme/ThemeProvider";
import type { RootStackParamList } from "../navigation/types";
import { login as dbLogin } from "../services/database";
import { useAuth } from "../context/AuthContext";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Role = "caregiver" | "patient";

export function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useAppTheme();
  const { login } = useAuth();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = React.useCallback(async () => {
    setError(null);
    const u = username.trim();
    const p = password.trim();
    if (!u || !p) {
      setError("Please enter both username and password.");
      return;
    }

    const user = await dbLogin(u, p);
    if (!user) {
      setError("Invalid username or password. Please try again.");
      return;
    }

    const role: Role = user.username.toLowerCase().includes("patient") ? "patient" : "caregiver";
    await login({ username: user.username, role });

    navigation.reset({
      index: 0,
      routes: [{ name: role === "caregiver" ? "CaregiverDashboard" : "PatientDashboard" }],
    });
  }, [login, navigation, password, username]);

  const demoLogin = React.useCallback(
    async (role: Role) => {
      const demoUser = role === "patient" ? "testpatient" : "demo";
      await login({ username: demoUser, role });

      navigation.reset({
        index: 0,
        routes: [{ name: role === "caregiver" ? "CaregiverDashboard" : "PatientDashboard" }],
      });
    },
    [login, navigation]
  );

  return (
    <ScreenContainer scroll testID="login-screen">
      <View style={{ maxWidth: 520, width: "100%", alignSelf: "center", gap: 16 }}>
        <AppLogo showTagline />

        <AppCard accessibilityLabel="Login form">
          <Text style={{ fontWeight: "900", fontSize: 20, marginBottom: 4 }}>Sign in to your account</Text>
          <Text style={{ color: theme.colors.textMuted, marginBottom: 16 }}>
            Enter your credentials to access CareConnect
          </Text>

          <View style={{ gap: 12 }}>
            <AppInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              returnKeyType="next"
              testID="login-username"
            />
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              testID="login-password"
            />

            <View style={{ alignItems: "flex-end" }}>
              <AppButton
                title="Forgot Password?"
                variant="secondary"
                onPress={() => navigation.navigate("ForgotPassword")}
                accessibilityHint="Navigate to the password reset screen"
              />
            </View>

            {error ? <AppAlert variant="error" message={error} /> : null}

            <AppButton title="Sign In" onPress={handleLogin} expand accessibilityHint="Sign in" />

            <View style={{ alignItems: "center", gap: 8 }}>
              <Text style={{ color: theme.colors.textMuted }}>{"Don't have an account?"}</Text>
              <AppButton
                title="Create Account"
                variant="secondary"
                onPress={() => navigation.navigate("Register")}
                expand
              />
            </View>
          </View>
        </AppCard>

        <AppCard accessibilityLabel="Demo credentials">
          <Text style={{ fontWeight: "900", marginBottom: 6 }}>Demo Credentials</Text>
          <Text style={{ color: theme.colors.textMuted, marginBottom: 12 }}>
            Use these to explore CareConnect without creating an account.
          </Text>

          <View style={{ gap: 12 }}>
            <AppButton
              title="👤 Patient Account (testpatient)"
              variant="secondary"
              onPress={() => demoLogin("patient")}
              expand
              accessibilityHint="Logs in as a demo patient"
            />
            <AppButton
              title="👨‍⚕️ Caregiver Account (demo)"
              variant="secondary"
              onPress={() => demoLogin("caregiver")}
              expand
              accessibilityHint="Logs in as a demo caregiver"
            />
          </View>
        </AppCard>

        <AppButton
          title="Accessibility Settings"
          variant="secondary"
          onPress={() => navigation.navigate("Settings")}
          expand
          accessibilityHint="Open accessibility settings"
        />
      </View>
    </ScreenContainer>
  );
}
