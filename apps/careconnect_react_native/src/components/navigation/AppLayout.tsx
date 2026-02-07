import React, { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View, FlatList, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, useAppTheme } from "../../theme/ThemeProvider";
import { AppButton } from "../../components/ui/AppButton";
import type { RootStackParamList } from "../../navigation/types";
import { useAuth } from "../../context/AuthContext";

type NavItem = {
  label: string;
  route: keyof RootStackParamList;
  requiresRole?: "caregiver" | "patient" | "any";
  action?: "logout";
};

const ITEMS: NavItem[] = [
  { label: "Caregiver Dashboard", route: "CaregiverDashboard", requiresRole: "caregiver" },
  { label: "Patient List", route: "PatientList", requiresRole: "caregiver" },
  { label: "Schedule", route: "Schedule", requiresRole: "caregiver" },

  { label: "Patient Dashboard", route: "PatientDashboard", requiresRole: "patient" },
  { label: "Check-In", route: "PatientCheckIn", requiresRole: "patient" },
  { label: "Symptoms", route: "Symptoms", requiresRole: "patient" },
  { label: "Medications", route: "Medications", requiresRole: "patient" },
  { label: "Reports", route: "Reports", requiresRole: "patient" },

  { label: "Messages", route: "Messages", requiresRole: "any" },
  { label: "Profile", route: "Profile", requiresRole: "any" },
  { label: "Settings", route: "Settings", requiresRole: "any" },
  { label: "Emergency", route: "Emergency", requiresRole: "any" },
  { label: "Logout", route: "Login", requiresRole: "any", action: "logout" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme, textScale } = useAppTheme();
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { role, logout } = useAuth();

  const hideNav = useMemo(() => {
    const n = route.name;
    return n === "Login" || n === "Register" || n === "ForgotPassword";
  }, [route.name]);

  const data = useMemo(() => {
    return ITEMS.filter((it) => {
      if (it.requiresRole === "any") return true;
      if (it.requiresRole === "caregiver") return role === "caregiver";
      if (it.requiresRole === "patient") return role === "patient";
      return true;
    });
  }, [role]);

  const cols = width >= 720 ? 3 : 2;

  if (hideNav) return <>{children}</>;

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View style={styles.body}>{children}</View>

      <View style={[styles.bottomBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Pressable
          onPress={() => setOpen(true)}
          style={styles.menuButton}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          accessibilityHint="Opens the navigation menu"
        >
          <Text style={{ fontWeight: "900", fontSize: 18 * textScale }}>Menu</Text>
        </Pressable>
      </View>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={[styles.modal, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.modalHeader, { borderColor: theme.colors.border }]}>
            <Text style={{ fontWeight: "900", fontSize: 20 * textScale }}>Menu</Text>
            <AppButton
              title="Collapse"
              variant="secondary"
              onPress={() => setOpen(false)}
              accessibilityLabel="Collapse menu"
            />
          </View>

          <FlatList
            data={data}
            key={cols}
            numColumns={cols}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={cols > 1 ? { gap: 12 } : undefined}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={(it) => it.label}
            renderItem={({ item }) => {
              const active = route.name === item.route;
              return (
                <Pressable
                  onPress={async () => {
                    if (item.action === "logout") {
                      await logout();
                      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
                      return;
                    }

                    navigation.navigate(item.route);
                    setOpen(false);
                  }}
                  style={[
                    styles.tile,
                    {
                      backgroundColor: active ? theme.colors.primary : theme.colors.surface,
                      borderColor: active ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: active }}
                >
                  <Text style={{ fontWeight: "900", color: active ? theme.colors.surface : theme.colors.text }}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
  bottomBar: {
    borderTopWidth: 2,
    paddingBottom: 10,
  },
  menuButton: { height: 64, alignItems: "center", justifyContent: "center" },
  modal: { flex: 1 },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  grid: { padding: 16, gap: 12 },
  tile: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
});
