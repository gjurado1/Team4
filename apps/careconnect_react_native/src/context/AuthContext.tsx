import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Role = "caregiver" | "patient";
type AuthState = {
  role: Role | null;
  username: string | null;
  isHydrated: boolean;
};

type AuthContextValue = AuthState & {
  hydrate: () => Promise<void>;
  login: (args: { username: string; role: Role }) => Promise<void>;
  logout: () => Promise<void>;
};

const STORAGE_ROLE = "careconnect-role";
const STORAGE_USER = "careconnect-username";

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({
    role: null,
    username: null,
    isHydrated: false,
  });

  const hydrate = React.useCallback(async () => {
    const [role, username] = await Promise.all([
      AsyncStorage.getItem(STORAGE_ROLE),
      AsyncStorage.getItem(STORAGE_USER),
    ]);

    setState({
      role: (role as Role) ?? null,
      username: username ?? null,
      isHydrated: true,
    });
  }, []);

  const login = React.useCallback(async ({ username, role }: { username: string; role: Role }) => {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_ROLE, role),
      AsyncStorage.setItem(STORAGE_USER, username),
    ]);

    setState({ role, username, isHydrated: true });
  }, []);

  const logout = React.useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_ROLE),
      AsyncStorage.removeItem(STORAGE_USER),
    ]);

    setState({ role: null, username: null, isHydrated: true });
  }, []);

  const value: AuthContextValue = {
    ...state,
    hydrate,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
