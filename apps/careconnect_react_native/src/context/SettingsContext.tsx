import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "system" | "light" | "dark";
export type VisionTheme = "normal" | "sepia" | "highContrast";

type SettingsState = {
  themeMode: ThemeMode;
  visionTheme: VisionTheme;
  textScale: number;
  enhancedFocus: boolean;
  largeTouchTargets: boolean;
  screenReaderSupport: boolean;
  isHydrated: boolean;
};

type SettingsContextValue = SettingsState & {
  hydrate: () => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setVisionTheme: (v: VisionTheme) => Promise<void>;
  setTextScale: (n: number) => Promise<void>;
  setEnhancedFocus: (enabled: boolean) => Promise<void>;
  setLargeTouchTargets: (enabled: boolean) => Promise<void>;
  setScreenReaderSupport: (enabled: boolean) => Promise<void>;
};

const STORAGE_THEME_MODE = "careconnect-themeMode";
const STORAGE_VISION = "careconnect-visionTheme";
const STORAGE_TEXT_SCALE = "careconnect-textScale";
const STORAGE_ENHANCED_FOCUS = "careconnect-enhanced-focus";
const STORAGE_LARGE_TOUCH = "careconnect-large-touch";
const STORAGE_SCREEN_READER = "careconnect-screen-reader";

const ThemeModes: readonly ThemeMode[] = ["system", "light", "dark"] as const;
const VisionThemes: readonly VisionTheme[] = ["normal", "sepia", "highContrast"] as const;

function isThemeMode(v: string | null): v is ThemeMode {
  return v !== null && (ThemeModes as readonly string[]).includes(v);
}

function isVisionTheme(v: string | null): v is VisionTheme {
  return v !== null && (VisionThemes as readonly string[]).includes(v);
}

function parseTextScale(v: string | null): number {
  if (!v) return 1;
  const n = Number(v);
  if (!Number.isFinite(n)) return 1;
  return Math.max(0.85, Math.min(2.0, n));
}

function parseBool(v: string | null, fallback: boolean): boolean {
  if (v === null) return fallback;
  return v === "true";
}

const SettingsContext = React.createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SettingsState>({
    themeMode: "system",
    visionTheme: "normal",
    textScale: 1,
    enhancedFocus: true,
    largeTouchTargets: true,
    screenReaderSupport: false,
    isHydrated: false,
  });

  const hydrate = React.useCallback(async () => {
    const [themeModeRaw, visionThemeRaw, textScaleRaw, enhancedFocusRaw, largeTouchRaw, screenReaderRaw] = await Promise.all([
      AsyncStorage.getItem(STORAGE_THEME_MODE),
      AsyncStorage.getItem(STORAGE_VISION),
      AsyncStorage.getItem(STORAGE_TEXT_SCALE),
      AsyncStorage.getItem(STORAGE_ENHANCED_FOCUS),
      AsyncStorage.getItem(STORAGE_LARGE_TOUCH),
      AsyncStorage.getItem(STORAGE_SCREEN_READER),
    ]);

    setState({
      themeMode: isThemeMode(themeModeRaw) ? themeModeRaw : "system",
      visionTheme: isVisionTheme(visionThemeRaw) ? visionThemeRaw : "normal",
      textScale: parseTextScale(textScaleRaw),
      enhancedFocus: parseBool(enhancedFocusRaw, true),
      largeTouchTargets: parseBool(largeTouchRaw, true),
      screenReaderSupport: parseBool(screenReaderRaw, false),
      isHydrated: true,
    });
  }, []);

  const setThemeMode = React.useCallback(async (mode: ThemeMode) => {
    await AsyncStorage.setItem(STORAGE_THEME_MODE, mode);
    setState((s) => ({ ...s, themeMode: mode }));
  }, []);

  const setVisionTheme = React.useCallback(async (v: VisionTheme) => {
    await AsyncStorage.setItem(STORAGE_VISION, v);
    setState((s) => ({ ...s, visionTheme: v }));
  }, []);

  const setTextScale = React.useCallback(async (n: number) => {
    const clamped = Math.max(0.85, Math.min(2.0, n));
    await AsyncStorage.setItem(STORAGE_TEXT_SCALE, String(clamped));
    setState((s) => ({ ...s, textScale: clamped }));
  }, []);

  const setEnhancedFocus = React.useCallback(async (enabled: boolean) => {
    await AsyncStorage.setItem(STORAGE_ENHANCED_FOCUS, String(enabled));
    setState((s) => ({ ...s, enhancedFocus: enabled }));
  }, []);

  const setLargeTouchTargets = React.useCallback(async (enabled: boolean) => {
    await AsyncStorage.setItem(STORAGE_LARGE_TOUCH, String(enabled));
    setState((s) => ({ ...s, largeTouchTargets: enabled }));
  }, []);

  const setScreenReaderSupport = React.useCallback(async (enabled: boolean) => {
    await AsyncStorage.setItem(STORAGE_SCREEN_READER, String(enabled));
    setState((s) => ({ ...s, screenReaderSupport: enabled }));
  }, []);

  const value: SettingsContextValue = {
    ...state,
    hydrate,
    setThemeMode,
    setVisionTheme,
    setTextScale,
    setEnhancedFocus,
    setLargeTouchTargets,
    setScreenReaderSupport,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
